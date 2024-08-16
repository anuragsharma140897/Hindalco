// import React from 'react'
// import { Form } from '../../../Component/ui/form'
// import { siteMasterSchema } from '../../../Utils/validators/master/site-master/site-master.schema'
// import { useDispatch } from 'react-redux';
// import { useMedia } from '../../../Hooks/use-media';
// import { Button, Checkbox, Input, Password, Switch } from 'rizzui';
// import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
// import { buildingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema';
// import CustomInput from '../../../Component/ui/form/input/custom-input';
// import CustomSelect from '../../../Component/ui/form/select/custom-select';

// const initialValues = {
//     siteName: '',
//     building: '',
//     area: ''
// };

// export default function AddProductMaster({ closeModal }) {
//     const dispatch = useDispatch()
//     const isMedium = useMedia('(max-width: 1200px)', false);
//     const onSubmit = (data) => {

//     };

//     return (
//         <div className='p-10'>
//             <Form validationSchema={buildingMasterSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
//                 {({ register, formState: { errors } }) => (
//                     <div className="space-y-5 lg:space-y-6">
//                         <div className='grid grid-cols-2 gap-4'>
//                             <CustomInput type={'text'} label={'Product Name'} register={register} fieldName={'unit'} errors={errors} />
//                             <CustomInput type={'text'} label={'Mac Id'} register={register} fieldName={'unit'} errors={errors} />
//                         </div>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <CustomInput type={'text'} label={'Serial no'} register={register} fieldName={'unit'} errors={errors} />
//                             <CustomInput type={'text'} label={'Mac Id'} register={register} fieldName={'unit'} errors={errors} />
//                         </div>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <CustomInput type={'text'} label={'IP Address'} register={register} fieldName={'unit'} errors={errors} />
//                             <CustomInput type={'text'} label={'Port'} register={register} fieldName={'unit'} errors={errors} />
//                         </div>
//                         <div className='flex gap-3 justify-end'>
//                             <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}> Cancel </Button>
//                             <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'md'} > Submit </Button>
//                         </div>
//                     </div>
//                 )}
//             </Form>
//         </div>
//     )
// }



import React from 'react'

export default function AddProductMaster() {
  return (
    <div>add-reader-master</div>
  )
}
