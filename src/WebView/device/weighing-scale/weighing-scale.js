import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import { routes } from '../../../config/routes'
import { useDispatch, useSelector } from 'react-redux'
import { searchWeighingScale } from '../../../Constant/Api/Api'
import { CompileWeighingScale } from './promiss/weighing-scale.promiss'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { setWeighingScaleData } from '../../../Store/Action/device/weighing-scale/weighing-scale-action'
import { getWeighinigScaleColoumn } from './weighing-scale-column'

export default function WeighingScale() {

  const dispatch = useDispatch()
  const reduxWeighingScale = useSelector(state=>state.WeighingScaleReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getWeighinigScaleColoumn())
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxWeighingScale?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxWeighingScale?.searchJson
    HitApi(json, searchWeighingScale).then((result) => {
      if(result){
        CompileWeighingScale(result).then((CompiledData)=>{
          dispatch(setWeighingScaleData(CompiledData))
        })
      }
    })
  }

  return (
    <div>
      <PageHeader btnText={'Add Weighing Scale'} href={routes?.panel?.device?.createWeighingScale} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxWeighingScale?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
