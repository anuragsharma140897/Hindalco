import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchGeneral } from '../../../Constant/Api/Api'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getGeneralMasterColumns } from './general-column'
import { CompileGeneralMaster } from './promise/general-master-promise'
import { setGeneralMasterData } from '../../../Store/Action/master/general-master/general-master-action'
import AddGeneralMaster from '../../../Form/master/general-master/add-general-master'


export default function GeneralMaster() {
  const dispatch = useDispatch()
  const reduxGeneral = useSelector(state=>state.GeneralMasterReducer)


  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getGeneralMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxGeneral?.doc === null){
      loadData()
    }
  }, [])
  const loadData = () => {
    var json = reduxGeneral?.searchJson
    HitApi(json, searchGeneral).then((result) => {
      if(result){
        CompileGeneralMaster(result).then((CompiledData)=>{
          dispatch(setGeneralMasterData(CompiledData))
        })
      }
    })
  }
  console.log("reduxGeneral",reduxGeneral);


  return (
    <div>
    <PageHeader  btnText={'Add General Master'} children={<AddGeneralMaster closeModal={closeModal} />} title={'Add General Master'} customSize={400} />
    <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxGeneral?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
  </div>
  )
}
