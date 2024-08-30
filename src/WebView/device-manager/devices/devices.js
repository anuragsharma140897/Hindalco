import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header';
import ControlledTable from '../../../Component/ui/table/custom-table';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../shared/modal-views/use-modal';
import useAlertController from '../../../Hooks/use-alert-controller';
import { GetDeviceMasterColumns } from './devices-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import { useColumn } from '../../../Hooks/use-column';

export default function Devices() {
  const dispatch = useDispatch()
  const reduxSite = useSelector(state => state.DevicesReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);
  const { openModal, closeModal } = useModal();
  const { showCustomAlert } = useAlertController();
  const [loading, setLoading] = useState(false)

  const loadData = (type) => {
    var json = reduxSite?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }

    // HitApi(json, searchSite).then((result) => {
    //   // if (result?.success !== false) {
    //   //   CompileSiteMaster(result).then((compiledData) => {
    //   //     dispatch(setSiteMasterData(compiledData));
    //   //     dispatch(setPagination({
    //   //       limit: json?.limit,
    //   //       totalPages: compiledData?.totalPages,
    //   //       number: compiledData?.number,
    //   //       totalElements: compiledData?.totalElements,
    //   //     }));
    //   //   });
    //   // } else {
    //   //   dispatch(setSiteMasterData([]));
    //   // }
    // });
  }

  const columns = useMemo(() => GetDeviceMasterColumns(openModal, closeModal, loadData, showCustomAlert))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxSite?.doc === null) {
      loadData('init')
    }

    console.log('reduxPagination', reduxPagination);
  }, [])

  return (
    <div>
      <PageHeader metaTitle={'Site Master'} btnText={'Add Site'} children={<h1>Hi</h1>} title={'Add Site'} customSize={400} />
      
      <ControlledTable
        
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={reduxSite?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        json={reduxSite?.searchJson}
        // setAction={setSiteMasterApiJson}
        ApiHit={loadData}
      />
    </div>
  )
}
