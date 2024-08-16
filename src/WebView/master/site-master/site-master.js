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
import { searchSite } from '../../../Constant/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { CompileSiteMaster } from './promiss/site-master.promiss';
import { setSiteMasterData } from '../../../Store/Action/master/site-master/site-master-action';

export default function SiteMaster() {
  const dispatch = useDispatch()
  const reduxSite = useSelector(state=>state.SiteMasterReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getSiteMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxSite?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxSite?.searchJson
    HitApi(json, searchSite).then((result) => {
      if(result){
        CompileSiteMaster(result).then((CompiledData)=>{
          dispatch(setSiteMasterData(CompiledData))
        })
      }
    })
  }

  return (
    <div>
      <PageHeader metaTitle={'Site Master'} btnText={'Add Site'} children={<AddSiteMaster closeModal={closeModal} />} title={'Add Site'} customSize={400} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxSite?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
