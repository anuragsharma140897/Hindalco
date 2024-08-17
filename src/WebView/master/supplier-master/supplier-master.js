import React, { useEffect, useMemo } from 'react'
import { getSupplierMasterColumns } from './supplier-column';
import { supplierData } from '../../../dummyData/supplier-data';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import PageHeader from '../../../shared/page-header';
import { routes } from '../../../config/routes';
import { TableClass } from '../../../Constant/Classes/Classes';
import { useDispatch, useSelector } from 'react-redux';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchSupplier } from '../../../Constant/Api/Api';
import { CompileSupplierMaster } from './promiss/supplier-master.promiss';
import { setSupplierData } from '../../../Store/Action/master/supplier-master/supplier-master-action';


export default function SupplierMaster() {
  const dispatch = useDispatch()
  const reduxSupplier = useSelector(state=>state.SupplierMasterReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getSupplierMasterColumns({ supplierData, openModal }))
  const { visibleColumns } = useColumn(columns);
  

  useEffect(() => {
    if(reduxSupplier?.doc === null){
      loadData()
    }



  }, [])

  const loadData = () => {
    var json = reduxSupplier?.searchJson
    HitApi(json, searchSupplier).then((result) => {
      if(result){

        CompileSupplierMaster(result).then((CompiledData)=>{
          dispatch(setSupplierData(CompiledData))
        })
      }
    })
  }

  return (
    <div>
      <PageHeader btnText={'Create'} href={routes?.panel?.master?.createSupplier} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxSupplier?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}