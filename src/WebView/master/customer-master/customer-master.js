import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getGeneralMasterColumns } from '../general-master/general-column';
import { useColumn } from '../../../Hooks/use-column';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchCustomer, searchGeneral } from '../../../Constant/Api/Api';
import { CompileGeneralMaster } from '../general-master/promise/general-master-promise';
import { setGeneralMasterData } from '../../../Store/Action/master/general-master/general-master-action';
import AddGeneralMaster from '../../../Form/master/general-master/add-general-master';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import PageHeader from '../../../shared/page-header'
import { setCustomerMasterData } from '../../../Store/Action/master/customer-master/customer-master-action';
import { CompileCustomerMaster } from './promise/customer-master-promise';
import { getCustomerMasterColumns } from './customer-column';
import AddCustomeMaster from '../../../Form/master/customer-master/add-customer-master';

export default function CustomerMaster() {
  const dispatch = useDispatch()
  const reduxCustomer = useSelector(state=>state.CustomerMasterReducer)



  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getCustomerMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxCustomer?.doc === null){
      loadData()
    }
  }, [])
  const loadData = () => {
    var json = reduxCustomer?.searchJson
    HitApi(json, searchCustomer).then((result) => {
      if(result){
        CompileCustomerMaster(result).then((CompiledData)=>{
          dispatch(setCustomerMasterData(CompiledData))
        })
      }
    })
  }



  return (
    <div>
    <PageHeader  btnText={'Add Customer Master'} children={<AddCustomeMaster closeModal={closeModal} />} title={'Add Custoomer Master'} customSize={1200} />
    <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxCustomer?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
  </div>
  )
}
