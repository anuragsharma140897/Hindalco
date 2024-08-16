import React, { useEffect, useMemo } from 'react'
import PageHeader from '../../../shared/page-header'
import ControlledTable from '../../../Component/ControlledTable/ControlledTable'
import { useModal } from '../../../shared/modal-views/use-modal'
import { useColumn } from '../../../Hooks/use-column'
import { TableClass } from '../../../Constant/Classes/Classes'
import { getProductMasterColumns } from './product-column'
import { routes } from '../../../config/routes'
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../../../Constant/Api/Api'
import { CompileProductMaster } from './promiss/product-master.promiss'
import { setProductMasterData } from '../../../Store/Action/master/product-master/product-master-action'
import { HitApi } from '../../../Store/Action/Api/ApiAction'

export default function ProductMaster() {

  const dispatch = useDispatch()
  const reduxProduct = useSelector(state=>state.ProductMasterReducer)
  const { openModal, closeModal } = useModal();
  const columns = useMemo(() => getProductMasterColumns())
  const { visibleColumns } = useColumn(columns);

  useEffect(() => {
    if(reduxProduct?.doc === null){
      loadData()
    }
  }, [])

  const loadData = () => {
    var json = reduxProduct?.searchJson
    HitApi(json, searchProduct).then((result) => {
      if(result){
        CompileProductMaster(result).then((CompiledData)=>{
          dispatch(setProductMasterData(CompiledData))
        })
      }
    })
  }

  return (
    <div>
      <PageHeader btnText={'Create'} href={routes?.panel?.master?.createProduct} disbleExport />
      <ControlledTable
        variant="modern"
        isLoading={false}
        showLoadingText={true}
        data={reduxProduct?.doc?.content}
        columns={visibleColumns}
        className={TableClass}
      />
    </div>
  )
}
