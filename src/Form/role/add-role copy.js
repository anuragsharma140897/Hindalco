import React, { useEffect, useState } from 'react';
import { validationSchema } from '../../Utils/validators/validationSchema';
import useValidation from '../../Hooks/useValidation';
import CustomInput from '../../Component/ui/form/input/custom-input';
import { useDispatch, useSelector } from 'react-redux';
import { setRolesAndPermissionApiJson } from '../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import PermissionComponent from './PermissionComponent';
import CustomButton from '../../Component/ui/buttons/custom-button';
import { Text } from 'rizzui';
import { ConstructJson, ReCompileJsonForEdit } from './permission-promiss';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { addRole } from '../../Constant/Api/Api';
import { rolesAndPermissionVariable as variable  } from '../../Constant/variables/master/role-and-permission/role-and-permisson.variable';

const readerSchema = {
  roleName: validationSchema.string('Role Name Field will be number')
    .min(6, 'Role Name Field should be min 6 characters long'),

};

const AddRole = ({ closeModal, row }) => {
  var dispatch = useDispatch()
  const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
  const { errors, validate } = useValidation(readerSchema);

  useEffect(() => {

    if (row?.id) {
      loadDefault(row)
  }
    console.log('row', row);

  }, [])

  const loadDefault = (row) => {
    // var json = reduxRolesAndPermission?.apiJson
    // Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));

    // console.log('eidt json', json);
    // // setData(json)
    // dispatch(setRolesAndPermissionApiJson(json))
    ReCompileJsonForEdit(row).then((Result)=>{
      console.log('Result', Result);
      dispatch(setRolesAndPermissionApiJson(Result))
    })
}


  const handleChange = (e) => {
    const { name, value } = e.target;
    var json = reduxRolesAndPermission?.apiJson
    Object.assign(json, { [name]: value });
    dispatch(setRolesAndPermissionApiJson(json))
    validate({ ...reduxRolesAndPermission?.apiJson, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log('reduxRolesAndPermission', reduxRolesAndPermission?.apiJson);
    e.preventDefault();
    const validationErrors = validate(reduxRolesAndPermission?.apiJson);
    if (Object.keys(validationErrors).length === 0) {
      ConstructJson(reduxRolesAndPermission?.doc).then((FinalJson) => {
        if (FinalJson) {
          var json = {
            roleName: reduxRolesAndPermission?.apiJson?.roleName,
            allowedEndPoints : FinalJson?.allowedEndPoints,
            permission: FinalJson?.permission,
          }
          console.log('final sending json', json);
          HitApi(json, addRole).then((result)=>{
            console.log('result', result);
          })
        }
      })
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div>
      <div className='p-10'>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 lg:space-y-6">
            <div className='grid grid-cols-2 gap-4'>
              <CustomInput
                name="roleName"
                label="Role Name"
                value={reduxRolesAndPermission?.apiJson?.roleName}
                onChange={handleChange}
                error={errors}
                reduxState={reduxRolesAndPermission?.apiJson}
                setAction={setRolesAndPermissionApiJson}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Text as="h6" className='font-bold'>Access</Text>
            </div>
            <div>
              <PermissionComponent permissionsData={reduxRolesAndPermission?.doc} />
            </div>
            <div className='flex gap-3 justify-end'>
              <CustomButton text={'Cancel'} className={''} onClick={closeModal} />
              <CustomButton type={"submit"} className={'bg-primary-main'} text={'Submit'} />
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddRole;