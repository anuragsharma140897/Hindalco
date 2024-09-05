import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { setUserApiJson } from '../../../Store/Action/user-management/user-action';
import useDeleteKeys from '../../../Hooks/use-delete-keys';
import { addUser, searchGeneral, searchRole, updateUser } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addUserSchema } from '../../../Utils/validators/user/add-user-scheema';
import { userMasterVariable as variable } from '../../../Constant/variables/user-master/user-master.variable';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import useAlertController from '../../../Hooks/use-alert-controller';


export default function AddUserMaster({ row, closeModal, ApiHit }) {
    var dispatch = useDispatch()
    const reduxUser = useSelector(state => state.UserReducer)
    const { errors, validate } = useValidation(addUserSchema);
    const { showCustomAlert } = useAlertController();
    

    useEffect(() => {
        if (row?._id && Object.keys(reduxUser?.apiJson).length === 0) {
            loadDefault(row)
        }
    }, [reduxUser])

    const loadDefault = (row) => {
        var json = reduxUser?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setUserApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxUser?.apiJson
        const validationErrors = validate(json);

        console.log('json', json);

        if (Object.keys(validationErrors).length === 0) {
            if (row?._id) {
                Object.assign(json, { _id: row?._id })
                HitApi(json, updateUser).then((result) => {
                    if (result) {
                        showCustomAlert({
                            type: 'success',
                            title: 'Success!',
                            message: 'User Details Updated Successfully',
                        });
                        if (ApiHit) { ApiHit() }
                        handleClose()
                    }
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addUser).then((result) => {
                    if (result) {
                        showCustomAlert({
                            type: 'success',
                            title: 'Success!',
                            message: 'User Details Updated Successfully',
                        });
                        if (ApiHit) { ApiHit() }
                        handleClose()
                    }
                })
            }

        } else {

        }
    };

    const handleClose = () => {
        closeModal();
        dispatch(setUserApiJson({}))
    }

    const handleCustomChange = (e) => {
        var json = reduxUser?.apiJson
        const { _id, value } = e
        Object.assign(json, { roleId: _id, roleName: value })
        dispatch(setUserApiJson(json))
    }

    const handleGenderChange = (e) => {
        var json = reduxUser?.apiJson
        const { _id, value } = e
        Object.assign(json, { gender : value })
        dispatch(setUserApiJson(json))
    }

    const handleStatusChange = (e) => {
        var json = reduxUser?.apiJson
        const { _id, value } = e
        Object.assign(json, { status : value })
        dispatch(setUserApiJson(json))
    }

    console.log('row', row);

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <div className='grid grid-cols-2 gap-4'>
                        <CustomInput validate={validate} name="firstName" label="First Name" value={reduxUser?.apiJson?.firstName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} name="lastName" label="Last Name" value={reduxUser?.apiJson?.lastName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} name="username" label="Username" value={reduxUser?.apiJson?.username} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} type={'text'} name="password" label="Password" value={reduxUser?.apiJson?.password} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} disabled={row?._id ? true : false} />
                        <SearchableSelect validate={validate} name="gender" label="Gender" api={searchGeneral} dynamicSearch={{'usedBy':'gender'}} getFieldName={'value'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} onChange={handleGenderChange} />
                        <SearchableSelect validate={validate} name="roleName" label="Role" api={searchRole}  getFieldName={'roleName'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} onChange={handleCustomChange} />
                        <CustomInput validate={validate} name="contact" label="Contact No" value={reduxUser?.apiJson?.contact} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} name="address" label="Address" value={reduxUser?.apiJson?.address} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} name="email" label="Email Id" value={reduxUser?.apiJson?.email} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <CustomInput validate={validate} name="employeeId" label="Employee Id" value={reduxUser?.apiJson?.employeeId} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} />
                        <SearchableSelect validate={validate} name="status" label="Status" api={searchGeneral} dynamicSearch={{'usedBy':'status'}}  getFieldName={'value'} value={reduxUser?.apiJson?.status} error={errors} reduxState={reduxUser?.apiJson} setAction={setUserApiJson} onChange={handleStatusChange}  hide={!row?._id} />
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={() => handleClose()} />
                        <CustomButton type={'submit'} className={''} text={row?._id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>

        </div>
    )
}
