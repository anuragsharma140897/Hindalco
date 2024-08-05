import React, { useState } from 'react'
import { Form } from '../../../Component/ui/form'
import {  useSelector } from 'react-redux';
import { useMedia } from 'react-use';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import { getRoles } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addUserSchema } from '../../../Utils/validators/user/add-user-scheema';
import CommonButtton from '../../../Component/ui/buttons/common-button';
const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    gender:'',
    roleName:'',
    contactno: '',
    address: '',
    email: '',
    employeeID: '',
};

function AddUserMaster({ closeModal }) {
    const [data, setRoleData] = useState(null)
    const isMedium = useMedia('(max-width: 1200px)', false);
    const reduxPagination = useSelector(state => state.PaginationReducer)

    const onSubmit = (data) => {
        console.log('Sign in data ->', data);
        // HitApi(initialValues, LoginApi).then((res) => {
        //     console.log('res', res);
        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };

    if (data === null) {
        var json = {
            page: reduxPagination?.doc?.current || 1,
            limit: 2 || 10,
        }
        HitApi(json, getRoles).then((res) => {
            console.log("res", res);
            setRoleData(res.doc)
        })
    }

    const roleptions = data?.map(role => ({
        label: role.roleName,
        value: role.roleName,
    }));

    return (
        <div className='p-10'>
            <Form validationSchema={addUserSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput type={'text'} label={'First Name'} register={register} fieldName={'firstName'} errors={errors} />
                            <CustomInput type={'text'} label={'Last Name'} register={register} fieldName={'lastName'} errors={errors} />
                            <CustomInput type={'text'} label={'User Name'} register={register} fieldName={'userName'} errors={errors} />
                            <CustomInput type={'text'} label={'Password'} register={register} fieldName={'password'} errors={errors} />
                            <CustomSelect options={[{ label: 'Male', value: 'Male' }, { label: "Female", value: "Female" }]} title={'Gender'} register={register} fieldName={'gender'} error={errors.gender?.message} />
                            <CustomSelect options={roleptions} title={'Role'} register={register} fieldName={'roleName'}  error={errors.roleName?.message} />
                            <CustomInput type={'text'} label={'Contact no'} register={register} fieldName={'contactno'} errors={errors} />
                            <CustomInput type={'text'} label={'Address'} register={register} fieldName={'address'} errors={errors} />
                            <CustomInput type={'text'} label={'Email ID'} register={register} fieldName={'email'} errors={errors} />
                            <CustomInput type={'text'} label={'Employee ID'} register={register} fieldName={'employeeID'} errors={errors} />
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CommonButtton className="w-full"  variant="flat" text={"Cancel"} size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}/>
                            <CommonButtton className="w-full" text={"Submit"} type={"sbumit"} size={isMedium ? 'lg' : 'md'} />
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default AddUserMaster