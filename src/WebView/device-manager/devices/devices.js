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
import { searchDevice } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import AddDevice from './add-device/add-device';
import { routes } from '../../../config/routes';

export default function Devices() {
  const dispatch = useDispatch()
  const reduxDevices = useSelector(state => state.DevicesReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);
  const { openModal, closeModal } = useModal();
  const { showCustomAlert } = useAlertController();
  const [loading, setLoading] = useState(false)

  const loadData = (type) => {
    var json = reduxDevices?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }

    console.log('json', json);

    HitApi(json, searchDevice).then((result) => {
      console.log(';result', result);
      // if (result?.success !== false) {
      //   CompileSiteMaster(result).then((compiledData) => {
      //     dispatch(setSiteMasterData(compiledData));
      //     dispatch(setPagination({
      //       limit: json?.limit,
      //       totalPages: compiledData?.totalPages,
      //       number: compiledData?.number,
      //       totalElements: compiledData?.totalElements,
      //     }));
      //   });
      // } else {
      //   dispatch(setSiteMasterData([]));
      // }
    });
  }

  const columns = useMemo(() => GetDeviceMasterColumns(openModal, closeModal, loadData, showCustomAlert))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxDevices?.doc === null) {
      loadData('init')
    }
  }, [])
  

  return (
    <div>
      <PageHeader btnText={'Add Device'}  href={routes?.panel?.deviceManager?.addDevice} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={reduxDevices?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        json={reduxDevices?.searchJson}
        // setAction={setSiteMasterApiJson}
        ApiHit={loadData}
      />
    </div>
  )
}
