import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import { routes } from '../../../config/routes'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useDispatch, useSelector } from 'react-redux'
import { setConfigurationMasterData } from '../../../Store/Action/master/configuration-master/configuration-master-action'
import { CompileConfigurationMaster } from './promise/configuration-master-promise'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { searchMqttConfig } from '../../../Constant/Api/Api'
import { getConfigurationMasterColumns } from './configuration-column'
import { useModal } from '../../../shared/modal-views/use-modal';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes'

function ConfigurationMaster() {

  const dispatch = useDispatch()
  const reduxConfiguration = useSelector(state=>state.ConfigurationMasterReducer)

  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getConfigurationMasterColumns({ openModal, closeModal }))
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxConfiguration?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxConfiguration?.searchJson
    HitApi(json, searchMqttConfig).then((result) => {
      if(result){
        CompileConfigurationMaster(result).then((CompiledData)=>{
          dispatch(setConfigurationMasterData(CompiledData))
        })
      }
    })
  }



  return (
    <div>
      <PageHeader btnText={'Add Configuration'} href={routes?.panel?.master?.createConfigurationMaster} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxConfiguration?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}

export default ConfigurationMaster