import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import { readerData } from '../../../dummyData/reader-data'
import { getProductMasterColumns } from './product-column'
import { productData } from '../../../dummyData/product-data'
import { routes } from '../../../config/routes'

export default function ProductMaster() {

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getProductMasterColumns({ readerData, openModal }))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader btnText={'Create'} href={routes?.panel?.master?.createProduct} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={productData}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
