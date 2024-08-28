import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { userData } from '../../../dummyData/user-data';
import { GetSiteMasterColumns } from './site-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchSite } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { CompileSiteMaster } from './promiss/site-master.promiss';
import { setSiteMasterApiJson, setSiteMasterData } from '../../../Store/Action/master/site-master/site-master-action';
import useAlertController from '../../../Hooks/use-alert-controller';
import { ScreenName } from '../../../Constant/Screen/Screen';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import ControlledTable from '../../../Component/ui/table/custom-table';

export default function SiteMaster() {
  const dispatch = useDispatch()
  const reduxSite = useSelector(state => state.SiteMasterReducer)
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

    HitApi(json, searchSite).then((result) => {
      if (result?.success !== false) {
        CompileSiteMaster(result).then((compiledData) => {
          dispatch(setSiteMasterData(compiledData));
          dispatch(setPagination({
            limit: json?.limit,
            totalPages: compiledData?.totalPages,
            number: compiledData?.number,
            totalElements: compiledData?.totalElements,
          }));
        });
      } else {
        dispatch(setSiteMasterData([]));
      }
    });
  }

  const columns = useMemo(() => GetSiteMasterColumns(openModal, closeModal, loadData, showCustomAlert))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxSite?.doc === null) {
      loadData('init')
    }

    console.log('reduxPagination', reduxPagination);
  }, [])

  return (
    <div>
      <PageHeader screen={ScreenName?.siteMaster} metaTitle={'Site Master'} btnText={'Add Site'} children={<AddSiteMaster closeModal={closeModal} ApiHit={loadData} />} title={'Add Site'} customSize={400} />
      
      <ControlledTable
        screen={ScreenName?.siteMaster}
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={reduxSite?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
        json={reduxSite?.searchJson}
        setAction={setSiteMasterApiJson}
        ApiHit={loadData}
      />
    </div>
  )
}
