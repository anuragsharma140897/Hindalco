import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header';
import { routes } from '../../../config/routes';
import { useDispatch, useSelector } from 'react-redux';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { TableClass } from '../../../Constant/Classes/Classes';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getBrokersColumns } from '../brokers/add-broker/borker-column';
import { getCertificatesColumns } from './add-certificate/certificates-column';
import { useColumn } from '../../../Hooks/use-column';
import { searchCertificate } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { CompileBrokers } from '../brokers/promiss/broker-promise';
import { CompileCertificates } from './promise/certificate-promise';
import { setCertificatesData } from './store/Action/certificate-action';




function Certificates() {
  const reduxCertificates = useSelector((state) => state.CertificatesReducer);
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => getCertificatesColumns({ openModal, closeModal, loading, setLoading }), []);
  const { visibleColumns } = useColumn(columns);
  const dispatch = useDispatch()




  useEffect(() => {
    if (reduxCertificates?.doc === null) {
      loadData();
    }
  }, [reduxCertificates]);



  const loadData = () => {
    const json = reduxCertificates?.searchJson;
    HitApi(json, searchCertificate).then((result) => {
      if (result) {
        console.log("result", result);

        CompileCertificates(result).then((CompiledData) => {
          dispatch(setCertificatesData(CompiledData))
        });
      }
    });
  };

  return (
    <div>
      <PageHeader btnText={'Add Certificate'} href={routes?.panel?.deviceManager?.addCertificates} title={'Add Certificate'} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxCertificates?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}

export default Certificates