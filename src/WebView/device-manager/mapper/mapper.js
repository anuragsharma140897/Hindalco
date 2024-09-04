import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAlertController from '../../../Hooks/use-alert-controller';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { searchMapper } from '../../../Constant/Api/Api';
import { setMappingData } from '../../../Store/Action/device-master/mapping/mapping-action';
import { CompileMapperData } from './promiss/mapper.promiss';
import { setPagination } from '../../../Store/Action/Pagination/PaginationAction';
import { useColumn } from '../../../Hooks/use-column';
import PageHeader from '../../../shared/page-header';
import ControlledTable from '../../../Component/ui/table/custom-table';
import { TableClass } from '../../../Constant/Classes/Classes';
import { routes } from '../../../config/routes';
import { GetMapperColumns } from './mapper-column';

export default function Mapper() {
  const dispatch = useDispatch()
  const reduxMapper = useSelector(state => state.MappingReducer)
  const reduxPagination = useSelector(state => state.PaginationReducer);
  const { showCustomAlert } = useAlertController();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(reduxMapper?.doc === null){
      loadData('init')
    }

    console.log('reduxMapper', reduxMapper);

  }, [])

  const loadData = (type) => {
    var json = reduxMapper?.searchJson
    if (type === 'init') {
      Object.assign(json, { page: 1, limit: reduxPagination?.doc?.limit });
    } else {
      Object.assign(json, { page: reduxPagination?.doc?.number, limit: reduxPagination?.doc?.limit });
    }
    console.log('json', json);

    HitApi(json, searchMapper).then((result) => {
      console.log('result', result);
      if (result?.success !== false) {
        CompileMapperData(result).then((compiledData) => {
          dispatch(setMappingData(compiledData));
          dispatch(setPagination({
            limit: json?.limit,
            totalPages: compiledData?.totalPages,
            number: compiledData?.number,
            totalElements: compiledData?.totalElements,
          }));
        });
      } else {
        dispatch(setMappingData([]));
      }
    });
  }

  const columns = useMemo(() => GetMapperColumns(loadData))
  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      <PageHeader metaTitle={'Mapper'} btnText={'Add Mapper'} href={routes?.panel?.deviceManager?.addMapper} />
      <ControlledTable
        variant="modern"
        isLoading={loading}
        showLoadingText={true}
        data={reduxMapper?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
