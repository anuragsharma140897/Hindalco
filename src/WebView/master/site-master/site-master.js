import React, { useEffect, useMemo, useState } from 'react'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import PageHeader from '../../../shared/page-header'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { userData } from '../../../dummyData/user-data';
import { getSiteMasterColumns } from './site-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddSiteMaster from '../../../Form/master/site-master/add-site-master';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { getSite } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../../../Storage/Storage';
import { useDismiss } from '@floating-ui/react';
import { setSiteMasterData } from '../../../Store/Action/master/site-master/site-master-action';

export default function SiteMaster() {
  const { openModal, closeModal } = useModal();
  const reduxPagination = useSelector(state => state.PaginationReducer)
  const SiteMasterReducer = useSelector(state => state.SiteMasterReducer)

  const dispatch = useDispatch()

  const columns = useMemo(() => getSiteMasterColumns({ userData, openModal, closeModal }))

  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    loadData()

  }, [])
  const loadData = () => {
    var json = {
      page: reduxPagination?.doc?.current || 1,
      limit:  10,
      search: {
      }
    }
    HitApi(json, getSite, getAuthToken()).then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        dispatch(setSiteMasterData(res))
      }
      else {
        alert(res.message)
      }


    })
  }

  console.log("SiteMasterReducer",SiteMasterReducer);

  return (
    <div>
      <PageHeader btnText={'Add Site'} children={<AddSiteMaster closeModal={closeModal} />} title={'Add Site'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={SiteMasterReducer?.doc?.doc?.[0]}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
