// import React from 'react'

// function AddUserMaster() {
//   return (
//     <div>AddUserMaster</div>
//   )
// }

// export default AddUserMaster

import React from 'react'
import { Form } from '../../../Component/ui/form'
import { buildingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema'
import { useDispatch } from 'react-redux';
import { useMedia } from 'react-use';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
import { Button } from 'rizzui';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
const initialValues = {
    siteName: '',
    building: '',
    area: ''
};

function AddUserMaster({closeModal}) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);
    const onSubmit = (data) => {
        // console.log('Sign in data ->', data);
        // HitApi(initialValues, LoginApi).then((res) => {
        //     console.log('res', res);
        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };

  return (
    <div className='p-10'>
    <Form validationSchema={buildingMasterSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
        {({ register, formState: { errors } }) => (
            <div className="space-y-5 lg:space-y-6">
                <div className='grid grid-cols-2 gap-4'>
                    <CustomInput type={'text'} label={'Frist Name'} register={register} fieldName={'firstName'} errors={errors} />
                    <CustomInput type={'text'} label={'Last Name'} register={register} fieldName={'lastName'} errors={errors} />
                    <CustomInput type={'text'} label={'User Name'} register={register} fieldName={'userName'} errors={errors} />
                    <CustomInput type={'text'} label={'Password'} register={register} fieldName={'password'} errors={errors} />
                    <CustomSelect options={[]} title={'Gender'} register={register} fieldName={'gender'} errors={errors} />
                    <CustomSelect options={[]} title={'Role'} register={register} fieldName={'role'} errors={errors} />
                    <CustomInput type={'text'} label={'Contact no'} register={register} fieldName={'contactNumber'} errors={errors} />
                    <CustomInput type={'text'} label={'Address'} register={register} fieldName={'address'} errors={errors} />
                    <CustomInput type={'text'} label={'Email ID'} register={register} fieldName={'email'} errors={errors} />
                    <CustomInput type={'text'} label={'Emplyee ID'} register={register} fieldName={'employee'} errors={errors} />
                </div>
                <div className='flex gap-3 justify-end'>
                    <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}> Cancel </Button>
                    <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'md'} > Submit </Button>
                </div>
            </div>
        )}
    </Form>
</div>
  )
}

export default AddUserMaster