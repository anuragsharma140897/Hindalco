import React, { useMemo } from 'react'
import { getSupplierMasterColumns } from './supplier-column';
import { supplierData } from '../../../dummyData/supplier-data';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import PageHeader from '../../../shared/page-header';
import { routes } from '../../../config/routes';
import { TableClass } from '../../../Constant/Classes/Classes';


export default function SupplierMaster() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getSupplierMasterColumns({ supplierData, openModal }))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader btnText={'Create'} href={routes?.panel?.master?.createSupplier} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={supplierData}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}