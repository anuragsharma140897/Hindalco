import React, { useEffect, useMemo } from 'react'
import ControlledTable from '../../../Component/ui/table/custom-table'
import PageHeader from '../../../shared/page-header'
import { useDispatch, useSelector } from 'react-redux'
import { searchConfig } from '../../../Constant/Api/Api'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { routes } from '../../../config/routes'
import { CompileConfigurationMaster } from './promiss/configuration-master.promiss'
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction'
import { setConfigurationData } from '../../../Store/Action/device-master/configuration/configuration-action'
import { GetConfigurationColumns } from './configuration-column'
import { useColumn } from '../../../Hooks/use-column'

export default function Configuration() {
  const dispatch = useDispatch()
  const reduxConfiguration = useSelector(state => state.ConfigurationReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);

  useEffect(()=>{

    if(reduxConfiguration?.doc === null){
      loadData('init')
    }

  },[reduxConfiguration])


  const loadData = (type) => {
    var json = reduxConfiguration?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }

    HitApi(json, searchConfig).then((result) => {
      console.log('result', result);
      if (result?.success !== false) {
        CompileConfigurationMaster(result).then((CompiledData) => {
          dispatch(setConfigurationData(CompiledData));
          dispatch(setPagination({
            limit: json?.limit,
            totalPages: CompiledData?.totalPages,
            number: CompiledData?.number,
            totalElements: CompiledData?.totalElements,
          }));
        });
      } else {
        
      }
    });
  }

  const columns = useMemo(() => GetConfigurationColumns())
  const { visibleColumns } = useColumn(columns);


  return (
    <div>
      <PageHeader btnText={'Add Configuration'} href={routes?.panel?.deviceManager?.addConfiguration} />

      <ControlledTable
      // screen={ScreenName?.siteMaster}
      // variant="modern"
      // isLoading={loading}
      // showLoadingText={true}
      data={reduxConfiguration?.doc?.content}
      columns={visibleColumns}
      // className={TableClass}
      // json={reduxSite?.searchJson}
      // setAction={setSiteMasterApiJson}
      // ApiHit={loadData}
      />
    </div>
  )
}
