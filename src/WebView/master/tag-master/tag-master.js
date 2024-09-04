import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import {  searchTag } from '../../../Constant/Api/Api';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import AddTagMaster from '../../../Form/master/tag-master/add-tag-master';
import { getTagMasterColumns } from './tag-cloumn';
import { CompileTagMaster } from './promise/tag-master-promise';
import { setTagMasterData } from '../../../Store/Action/master/tag-master/tag-master-action';


function TagMaster() {
  const dispatch = useDispatch()
  const reduxTag = useSelector(state => state.TagMasterReducer)


  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getTagMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if (reduxTag?.doc === null) {
      loadData()
    }
  }, [])
  const loadData = () => {
    var json = reduxTag?.searchJson
    HitApi(json, searchTag).then((result) => {
      if (result) {
        CompileTagMaster(result).then((CompiledData) => {
          dispatch(setTagMasterData(CompiledData))
        })
      }
    })
  }




  return (
    <div>
      <PageHeader btnText={'Add Tag'} children={<AddTagMaster closeModal={closeModal} />} title={'Add Tag'} customSize={800} />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxTag?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}

export default TagMaster