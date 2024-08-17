import React, { useEffect } from 'react';
import CustomInput from '../../../../Component/ui/form/input/custom-input';
import { productMasterSchema } from '../../../../Utils/validators/master/product-master/add-product.schema';
import { useDispatch, useSelector } from 'react-redux';
import { setProductMasterApiJson } from '../../../../Store/Action/master/product-master/product-master-action';
import useValidation from '../../../../Hooks/useValidation';
import CustomButton from '../../../../Component/ui/buttons/custom-button';
import CustomSwitch from '../../../../Component/ui/switch/custom-switch';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { addProduct, searchProduct, updateProduct } from '../../../../Constant/Api/Api';
import { CompileProductMaster } from '../../../../WebView/master/product-master/promiss/product-master.promiss';

export default function AddProduct() {

  const dispatch = useDispatch()
  const { errors, validate } = useValidation(productMasterSchema);
  const reduxProduct = useSelector(state => state.ProductMasterReducer)
  var url = window.location.pathname
  var ID = url.split('/')[4]

  useEffect(() => {
    if (ID && !reduxProduct?.apiJson?.id) {
      loadDefault(ID)
    }
  }, [])

  const loadDefault = () => {
    var json = reduxProduct?.searchJson
    json.search._id = ID
    HitApi(json, searchProduct).then((result) => {
      if (result) {
        CompileProductMaster(result).then((CompiledData) => {
          if (CompiledData?.content?.length === 1) {
            dispatch(setProductMasterApiJson(CompiledData?.content?.[0]))
          }
        })
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var json = reduxProduct?.apiJson
    if (!json.captureBatchNo) {
      json.captureBatchNo = false
    }
    if (!json.captureLotNo) {
      json.captureLotNo = false
    }
    const validationErrors = validate(json);
    if (Object.keys(validationErrors).length === 0) {
      if (ID) {
        Object.assign(json, { id: ID })
        HitApi(json, updateProduct).then((result) => {
          if (result.status === 200) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/master/product'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
          else if (result.status === 500) {
            window.alert(result.message)
          }
        })
      } else {
        Object.assign(json, { status: json?.status || 'active' })
        HitApi(json, addProduct).then((result) => {
          if (result.status === 201) {
            var alert = window.confirm(result.message)
            if (alert || !alert) {
              window.location.pathname = '/master/product'
            }
          }
          else if (result.status === 400) {
            window.alert(result.message)
          }
          else if (result.status === 500) {
            window.alert(result.message)
          }
        })
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className='p-10 bg-white rounded-xl'>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 lg:space-y-6">
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="productName" label="Product Name" value={reduxProduct?.apiJson?.productName} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="productCode" label="Product Code" value={reduxProduct?.apiJson?.productCode} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="productDescription" label="Product Description" value={reduxProduct?.apiJson?.productDescription} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="productGroup" label="Product Group" value={reduxProduct?.apiJson?.productGroup} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="height" label="Height" value={reduxProduct?.apiJson?.height} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="width" label="Width" value={reduxProduct?.apiJson?.width} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="length" label="Length" value={reduxProduct?.apiJson?.length} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="packedWeight" label="Packed Weight" value={reduxProduct?.apiJson?.packedWeight} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <CustomInput name="weight" label="Weight" value={reduxProduct?.apiJson?.weight} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="buyingCost" label="Buying Cost" value={reduxProduct?.apiJson?.buyingCost} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="sellingCost" label="Selling Cost" value={reduxProduct?.apiJson?.sellingCost} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
            <CustomInput name="grade" label="Grade" value={reduxProduct?.apiJson?.grade} error={errors} reduxState={reduxProduct?.apiJson} setAction={setProductMasterApiJson} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <CustomSwitch name="captureBatchNo" label={'Capture Batch No'} value={reduxProduct?.apiJson?.captureBatchNo} reduxState={reduxProduct?.apiJson} errors={errors} setAction={setProductMasterApiJson} />
            <CustomSwitch name="captureLotNo" label={'Capture Lot No'} value={reduxProduct?.apiJson?.captureLotNo} reduxState={reduxProduct?.apiJson} errors={errors} setAction={setProductMasterApiJson} />
          </div>
          <div className='flex items-center justify-center gap-x-2' >
            <CustomButton text={'Back'} variant='flat' className={''} onClick={() => window.location.pathname = '/master/product'} />
            <CustomButton type={'submit'} className={''} text={ID ? 'Update' : 'Submit'} />
          </div>
        </div>
      </form>
    </div>
  )
}