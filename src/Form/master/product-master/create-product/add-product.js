import React from 'react'
import CustomInput from '../../../../Component/ui/form/input/custom-input'
import { Button } from 'rizzui'
import { Form } from '../../../../Component/ui/form'
import { addProduct } from '../../../../Utils/validators/master/product-master/add-product.schema'
import { useDispatch } from 'react-redux'
import { useMedia } from '../../../../Hooks/use-media';
import CustomSwitch from '../../../../Component/ui/form/switch/custom-switch'

const initialValues = {
  siteName: '',
  building: '',
  area: ''
};

export default function AddProduct({ closeModal }) {

  const dispatch = useDispatch()
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit = (data) => {

  };


  return (
    <div className='p-10 bg-white'>
      <Form validationSchema={addProduct} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Product Name'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Product Code'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Product Description'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Product Group'} register={register} fieldName={'unit'} errors={errors} />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Height'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Width'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Length'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Packed Weight'} register={register} fieldName={'unit'} errors={errors} />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <CustomInput type={'text'} label={'Weight'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Buying Cost'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Selling Cost'} register={register} fieldName={'unit'} errors={errors} />
              <CustomInput type={'text'} label={'Grade'} register={register} fieldName={'unit'} errors={errors} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <CustomSwitch label={'Capture Batch No'} register={register} fieldName={'captureBatchNo'} errors={errors} />
              <CustomSwitch label={'Capture Lot No'} register={register} fieldName={'captureLotNo'} errors={errors} />
            </div>
            <div className='grid grid-cols-5 gap-3 justify-end '>
              <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}> Cancel </Button>
              <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'md'} > Submit </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
