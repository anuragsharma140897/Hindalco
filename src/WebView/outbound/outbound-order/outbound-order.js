import React, { useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'
import { useModal } from '../../../shared/modal-views/use-modal';
import { getOutboundOrderColumn } from './outbound-order-column';
import { TableClass } from '../../../Constant/Classes/Classes'
import { useColumn } from '../../../Hooks/use-column';
import { inboundOrderData } from '../../../dummyData/inbound-order-data';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useSelector } from 'react-redux';

function OutboundOrder() {
  const reduxOutbound = useSelector((state) => state.OutboundReducer);

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getOutboundOrderColumn({ inboundOrderData, openModal }))
  const { visibleColumns } = useColumn(columns)


  return (
    <div>
      <PageHeader metaTitle={'Outbound'} btnText={'Create'} href={routes?.panel.outbond.outboundCreate} disbleExport />
      <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxOutbound?.vehicleAdded} columns={visibleColumns} className={TableClass}  />
    </div>
  )
}
export default OutboundOrder