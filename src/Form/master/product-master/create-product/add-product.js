import React from 'react'
import CustomInput from '../../../../Component/ui/form/input/custom-input'
import { Form } from '../../../../Component/ui/form'
import { addProduct } from '../../../../Utils/validators/master/product-master/add-product.schema'
import { useDispatch } from 'react-redux'
import { useMedia } from '../../../../Hooks/use-media';
import CustomSwitch from '../../../../Component/ui/form/switch/custom-switch'
import CommonButtton from '../../../../Component/ui/buttons/common-button'
import { ProductMasterVariable } from '../../../../Constant/variables/master/product-master/product-master.variable'

const initialValues = {
  productName: '',
  productCode: '',
};

export default function AddProduct({ closeModal }) {

  const dispatch = useDispatch()
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit = (data) => {

  };


  return (
    <div className='p-10 bg-white rounded-xl'>
      <Form validationSchema={addProduct} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Product Name'} register={register} fieldName={ProductMasterVariable?.productName} errors={errors} />
              <CustomInput type={'text'} label={'Product Code'} register={register} fieldName={ProductMasterVariable?.productCode} errors={errors} />
              <CustomInput type={'text'} label={'Product Description'} register={register} fieldName={ProductMasterVariable?.productDescription} errors={errors} />
              <CustomInput type={'text'} label={'Product Group'} register={register} fieldName={ProductMasterVariable?.productGroup} errors={errors} />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Height'} register={register} fieldName={ProductMasterVariable?.height} errors={errors} />
              <CustomInput type={'text'} label={'Width'} register={register} fieldName={ProductMasterVariable?.width} errors={errors} />
              <CustomInput type={'text'} label={'Length'} register={register} fieldName={ProductMasterVariable?.length} errors={errors} />
              <CustomInput type={'text'} label={'Packed Weight'} register={register} fieldName={ProductMasterVariable?.packedWeight} errors={errors} />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Weight'} register={register} fieldName={ProductMasterVariable?.weight} errors={errors} />
              <CustomInput type={'text'} label={'Buying Cost'} register={register} fieldName={ProductMasterVariable?.buyingCost} errors={errors} />
              <CustomInput type={'text'} label={'Selling Cost'} register={register} fieldName={ProductMasterVariable?.sellingCost} errors={errors} />
              <CustomInput type={'text'} label={'Grade'} register={register} fieldName={ProductMasterVariable?.grade} errors={errors} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <CustomSwitch label={'Capture Batch No'} register={register} fieldName={ProductMasterVariable?.captureBatchNo} errors={errors} />
              <CustomSwitch label={'Capture Lot No'} register={register} fieldName={ProductMasterVariable?.captureLotNo} errors={errors} />
            </div>
            <div className='flex items-center justify-center gap-x-2' >
              <CommonButtton type="submit" text={"Back"} className={"w-40"} variant={"flat"} onClick={() => { window.location.pathname = 'master/product' }} />
              <CommonButtton type="submit" text={"Submit"} className={"w-40"} />
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
