import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import { readerData } from '../../../dummyData/reader-data'
import { getCustomerMasterColumns } from './customer-column'
import { productData } from '../../../dummyData/product-data'
import { routes } from '../../../config/routes'
import { customerData } from '../../../dummyData/customer-data'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { getAuthToken } from '../../../Storage/Storage'
import { searchCustomer } from '../../../Constant/Api/Api'

export default function CustomerMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getCustomerMasterColumns({ readerData, openModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(()=>{
    laodData()
  },[])

  const laodData = () =>{
    // HitApi({page:1, limit : 2, }, searchCustomer, getAuthToken()).then((result)=>{
    //   console.log('result', result);
    // })
  }

  return (
    <div>
      <PageHeader metaTitle={'Customer Master'} btnText={'Create'} href={routes?.panel?.master?.createCustomer} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={customerData}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}