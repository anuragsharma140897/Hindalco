import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { setUserApiJson } from '../../../Store/Action/user-management/user-action';
import useDeleteKeys from '../../../Hooks/use-delete-keys';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import { addUser, searchGeneral, searchRole, updateUser } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { CompileRoleForSelect } from './promiss/add-user-master.promiss';
import { setRolesAndPermissionMainData } from '../../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import { addUserSchema } from '../../../Utils/validators/user/add-user-scheema';
import { userMasterVariable as variable } from '../../../Constant/variables/user-master/user-master.variable';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import useAlertController from '../../../Hooks/use-alert-controller';


export default function AddUserMaster({ row, closeModal, ApiHit }) {
    var dispatch = useDispatch()
    const reduxUser = useSelector(state => state.UserReducer)
    const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
    const { errors, validate } = useValidation(addUserSchema);
    const { showCustomAlert } = useAlertController();

    const deleteKeys = useDeleteKeys();

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
        if (reduxRolesAndPermission?.mainData === null) {
            handleLoadRole()
        }
    }, [])

    const loadDefault = (row) => {
        var json = reduxUser?.apiJson

        console.log('json before', json);

        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        console.log('json after', json);
        dispatch(setUserApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxUser?.apiJson
        const validationErrors = validate(json);
        console.log('validationErrors', validationErrors);
        console.log('json', json);
        // if (Object.keys(validationErrors).length === 0) {
        //     if (row?.id) {
        //         Object.assign(json, { id: row?.id })
        //         HitApi(json, updateUser).then((result) => {
                    // if (result) {
                    //     showCustomAlert({
                    //         type: 'success',
                    //         title: 'Success!',
                    //         message: 'User Details Updated Successfully',// Example Tailwind CSS classes
                    //     });
                    //     if (ApiHit) { ApiHit() }
                    //     handleClose()
                    // }
        //         })
        //     } else {
        //         Object.assign(json, { status: json?.status || 'active' })
        //         HitApi(json, addUser).then((result) => {
        //             if (result) {
        //                 showCustomAlert({
        //                     type: 'success',
        //                     title: 'Success!',
        //                     message: 'User Details Updated Successfully',// Example Tailwind CSS classes
        //                 });
        //                 if (ApiHit) { ApiHit() }
        //                 handleClose()
        //             }
        //         })
        //     }

        // } else {

        // }
    };

    const handleClose = () => {
        closeModal();
        // dispatch(setUserApiJson(deleteKeys(reduxUser?.apiJson)))
    }

    const handleLoadRole = () => {
        var json = reduxRolesAndPermission?.searchJson
        HitApi(json, searchRole).then((result) => {
            if (result) {
                CompileRoleForSelect(result).then((CompiledData) => {

                    dispatch(setRolesAndPermissionMainData(CompiledData))
                })
            }
        })
    }

    const handleCustomChange = (e) => {
        var json = reduxUser?.apiJson
        const { id, value } = e
        Object.assign(json, { roleId: id, roleName: value })
        dispatch(setUserApiJson(json))
    }

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <div className='grid grid-cols-2 gap-4'>
                        <CustomInput name="firstName" label="First Name" value={reduxUser?.apiJson?.firstName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput name="lastName" label="Last Name" value={reduxUser?.apiJson?.lastName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput name="username" label="Username" value={reduxUser?.apiJson?.username} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput type={'password'} name="password" label="Password" value={reduxUser?.apiJson?.password} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} disabled={row?.id ? true : false} />
                        <SearchableSelect name="gender" label="Gender" api={searchGeneral} getFieldName={'value'} dynamicSearch={{'fieldName':'gender'}} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        {/* <SearchableSelect name="roleName" label="Role" api={searchRole} getFieldName={'roleName'} getFieldLabel={'roleName'} getFieldValue={'roleName'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} onChange={handleCustomChange} /> */}
                        <CustomInput name="contact" label="Contact No" value={reduxUser?.apiJson?.contact} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput name="address" label="Address" value={reduxUser?.apiJson?.address} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput name="email" label="Email Id" value={reduxUser?.apiJson?.email} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput name="employeeId" label="Employee Id" value={reduxUser?.apiJson?.employeeId} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={() => handleClose()} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>

        </div>
    )
}
