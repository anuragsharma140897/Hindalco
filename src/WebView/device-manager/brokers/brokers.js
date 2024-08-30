import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../../shared/page-header';
import { routes } from '../../../config/routes';
import { useColumn } from '../../../Hooks/use-column';
import { getBrokersColumns } from './add-broker/borker-column';
import { searchBroker } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { useSelector, useDispatch } from 'react-redux';
import { CompileBrokers } from './promiss/broker-promise';
import { setBrokesrData } from './store/action/brokers/brokers-action';
import { useModal } from '../../../shared/modal-views/use-modal'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { TableClass } from '../../../Constant/Classes/Classes';



const Brokers = () => {  
  const reduxBrokers = useSelector(state => state.BrokersReducer);
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => getBrokersColumns({ openModal, closeModal, loading, setLoading }), []);
  const { visibleColumns } = useColumn(columns);
  const dispatch = useDispatch()

  useEffect(() => {
    if (reduxBrokers?.doc === null) {
      loadData();
    }
  }, [reduxBrokers]);

  const loadData = () => {
    const json = reduxBrokers?.searchJson;
    HitApi(json, searchBroker).then((result) => {
      if (result) {
        console.log("result", result);

        CompileBrokers(result).then((CompiledData) => {
          dispatch(setBrokesrData(CompiledData))
        });
      }
    });
  };

  return (
    <div>
      <PageHeader btnText={'Add Broker'} href={routes?.panel?.deviceManager?.addbroker} title={'Add Broker'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxBrokers?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  );
};

export default Brokers;
