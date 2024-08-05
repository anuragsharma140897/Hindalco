import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { inboundOrderData } from '../../../dummyData/inbound-order-data';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getInboundOrderColumn } from './inbound-order-column';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import { routes } from '../../../config/routes';


function InboundOrder() {
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getInboundOrderColumn({ inboundOrderData, openModal }))
  const { visibleColumns } = useColumn(columns);


  return (
    <div>
      <PageHeader metaTitle={'Inbound'} btnText={'Create'} href={routes.panel?.inbond?.inboundCreate} disbleExport />
      <ControlledTable
          variant="modern"
          isLoading={false}
          showLoadingText={true}
          data={inboundOrderData}
          columns={visibleColumns}
          className={TableClass}
        />

    </div>
  )
}

export default InboundOrder