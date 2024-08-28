import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'
import { useModal } from '../../../shared/modal-views/use-modal';
import { getOutboundOrderColumn } from './outbound-order-column';
import { TableClass } from '../../../Constant/Classes/Classes'
import { useColumn } from '../../../Hooks/use-column';
import { inboundOrderData } from '../../../dummyData/inbound-order-data';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useDispatch, useSelector } from 'react-redux';
import { searchGeneral, searchOrder } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { CompileOutbound } from './promise/outbound-promise';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import { setOutboundApiJson, setOutboundData } from '../../../Store/Action/outbound/outbound-action';

function OutboundOrder() {
  const reduxOutbound = useSelector((state) => state.OutboundReducer);
  const reduxPagination = useSelector(state => state.PaginationReducer)

  const dispatch = useDispatch()


  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getOutboundOrderColumn({ inboundOrderData, openModal }))
  const { visibleColumns } = useColumn(columns)

  useEffect(() => {

      loadData('init')

  }, [])
  const loadData = (type) => {
    var json = reduxOutbound?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit })
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit })
    }


    HitApi(json, searchOrder).then((result) => {
      console.log("result",result);
      if (result) {
        CompileOutbound(result).then((CompiledData) => {
          dispatch(setOutboundData(CompiledData));
          var tp = { limit: json?.limit, totalPages: CompiledData?.totalPages, number: CompiledData?.number, totalElements: CompiledData?.totalElements }
          dispatch(setPagination(tp))
        })
      }
    })
  }

  console.log("reduxOutboundss",reduxOutbound);


  return (
    <div>
      <PageHeader metaTitle={'Outbound'} btnText={'Create'} href={routes?.panel.outbond.outboundCreate} disbleExport />
      <ControlledTable variant="modern" isLoading={false} showLoadingText={true} data={reduxOutbound?.doc?.content} columns={visibleColumns} className={TableClass}  />
    </div>
  )
}
export default OutboundOrder