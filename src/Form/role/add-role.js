import { Input, Text } from 'rizzui';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from '../../Hooks/use-media';
import { Form } from '../../Component/ui/form';
import React, { useEffect, useState } from 'react';
import { setRolesAndPermission } from '../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import { rolesAndPermissionSchema } from '../../Utils/validators/user/role-and-permission.schema';
import DropDownIcon from '../../Constant/Icons/dropdown-icon';
import DropUpIcon from '../../Constant/Icons/dropup-icon';
import {  getEnpointsToPermissons } from '../../Utils/Utils';
import CommonButtton from '../../Component/ui/buttons/common-button';
import { addRole } from '../../Constant/Api/Api';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { getAuthToken } from '../../Storage/Storage';
import Permissions from './permissions';


// const initialValues = {
//     email: 'admin@admin.com',
//     password: 'admin',
//     rememberMe: true,
// };

// export const genderOption = [
//     { value: 'male', label: 'male' },
//     { value: 'female', label: 'female' },
//     { value: 'other', label: 'other' },
// ];
// export default function UserForm({ closeModal }) {
//     var dispatch = useDispatch()
//     const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
//     const colors = { read: "bg-yellow-500 text-white", write: "bg-green-500 text-white", delete: "bg-red-500 text-white" };
//     console.log("reduxRolesAndPermission", reduxRolesAndPermission);
//     const isMedium = useMedia('(max-width: 1200px)', false);
//     const [expandedIndex, setExpandedIndex] = useState(null);

//     useEffect(() => {

//     }, [])

//     const onSubmit = (data) => {

//         var t_access = reduxRolesAndPermission?.doc;
//         var json = {
//             roleName: data?.roleName,
//             allowedEndPoints:getEnpointsToPermissons(t_access),
//             permission: t_access,
//         }
//         console.log("Json", json);
//         HitApi(json, addRole,getAuthToken()).then((res) => {
//             console.log("res",res);
//             if ( res.status === 200) {
//                 alert(res.message)
//             }
//         })
//     };

//     const handleAccessChnage = (item, permissionKey ,permissionType, child = {}) => {

//         const permission_access = reduxRolesAndPermission?.doc;
//         const { isChild, childElementIndex } = child
//         if (!isChild) {
//             const permissionObject = permission_access.find((access, index) => {
//                 if (access.value === permissionType) {
//                     access["index"] = index;
//                     return access
//                 }
//                 return null
//             } );
//             const newItem = { ...item, [permissionKey]: !item[permissionKey] }
//             const { index, ...access } = permissionObject;
//             permission_access[index] = { ...access, permission: [newItem] }
//             dispatch(setRolesAndPermission(permission_access));
//         } else {
//             const childElements = permission_access[expandedIndex].child;
//             const newItem = { ...item, [permissionKey]: !item[permissionKey] }
//             childElements[childElementIndex] = { ...childElements[childElementIndex], permission: [newItem] }
//             permission_access[expandedIndex] = {
//                 ...permission_access[expandedIndex],
//                 child: childElements
//             }
//             dispatch(setRolesAndPermission(permission_access));
//            console.log(item, "item_+_+_+", permission_access, childElementIndex, permissionKey, permissionType, expandedIndex, childElements) 
//         }

//     }

//     let access;
//     const handleChildToggle = (index) => {
//         setExpandedIndex(index === expandedIndex ? null : index);
//     };

//     const getPermissionSection = (item, permissionType, child = {}) => {
//         const permissionKeys = Object.keys(item);
//         return permissionKeys.map((permissionKey, keyIndex) => {
//             return (<React.Fragment>
//                 {
//                     <div key={`${keyIndex}`} className="flex items-center gap-1">
//                         <Text className={`font-semibold border py-2 px-5 rounded-lg ${item[permissionKey] ? 'bg-white' : 'bg-gray-200'} cursor-pointer ${item[permissionKey] ? colors?.[permissionKey] : null}`} onClick={() => handleAccessChnage(item, permissionKey, permissionType, child)} >
//                             {permissionKey.charAt(0).toUpperCase() + permissionKey.slice(1)}
//                         </Text>
//                     </div>
//                 }
//             </React.Fragment>
//             )
//         })
//     };

//     const getChildPermissions = (item) => {
//         if (item.child && item.child.length === 0) return null;
//         return item?.child?.map((ele, childIndex) => {
//             console.log(item, ele, "child:")
//             const childPermissions = ele.permission;
//             return (
//                 <div key={childIndex} className='flex items-center justify-between '>
//                     <div className='my-5 w-40 ' >{ele.value}</div>
//                     <div className="flex gap-x-2">
//                         {childPermissions.map((childPerm) => getPermissionSection(childPerm, ele.value, { childElementIndex: childIndex, isChild: true }))}
//                     </div>

//                 </div>
//             )
//         })
//     }

//     if (reduxRolesAndPermission?.doc) {

//         access = reduxRolesAndPermission?.doc?.map((item, index) => {
//             console.log("item__", item);

//             const itemKey = Object.keys(item)[0];

//             const permissions = item?.permission;

//             console.log("permissions", item[itemKey]);

//             return (
//                 <div>
//                     <div key={index} className='flex justify-between'>
//                         <div className={`flex items-center justify-center  rounded-md gap-x-5 ${item?.child?.length && "px-5 border cursor-pointer"}`} onClick={() => handleChildToggle(index)}>
//                             <Text className="capitalize">{item?.value}</Text>
//                             {item?.child?.length ?
//                               <div>
//                               {expandedIndex === index ? <DropUpIcon /> : <DropDownIcon />}
//                           </div> : null
//                             }
//                         </div>

//                         <div>
//                             {

//                                 <div className="flex gap-x-2">
//                                     {permissions.map((perm) => getPermissionSection(perm, item[itemKey], {}))}
//                                 </div>
//                             }
//                         </div>
//                     </div>
//                     <div>
//                     </div>
//                     {expandedIndex === index ? getChildPermissions(item) : null}
//                 </div>
//             );
//         });
//     }



//     return (
//         <div className='p-10'>
//             <Form validationSchema={rolesAndPermissionSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
//                 {({ register, formState: { errors } }) => (
//                     <div className="space-y-5 lg:space-y-6">
//                         <div className='grid grid-cols-2 gap-4'>
//                             <Input type="text" size={isMedium ? 'lg' : 'xl'} label="Role Name" placeholder="eg. Admin" className="[&>label>span]:font-medium " {...register('roleName')} error={errors?.roleName?.message} />
//                         </div>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <Text as="h6" className='font-bold'>Access</Text>
//                         </div>
//                         {access}
//                         <div className='flex gap-3 justify-end'>
//                             <CommonButtton text={"Cancel"} size={isMedium ? 'lg' : 'md'} onClick={closeModal} />
//                             <CommonButtton type={"submit"} text={"Submit"} size={isMedium ? 'lg' : 'md'} />
//                         </div>
//                     </div>
//                 )}
//             </Form>

//         </div>
//     );
// }



const initialValues = {
    email: 'admin@admin.com',
    password: 'admin',
    rememberMe: true,
};

function AddRole({ closeModal }) {
    var dispatch = useDispatch()
        const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
        const colors = { read: "bg-yellow-500 text-white", write: "bg-green-500 text-white", delete: "bg-red-500 text-white" };
        console.log("reduxRolesAndPermission", reduxRolesAndPermission);
        const isMedium = useMedia('(max-width: 1200px)', false);
        const [expandedIndex, setExpandedIndex] = useState(null);


    const onSubmit = (data) => {

        var t_access = reduxRolesAndPermission?.doc;
        // var json = {
        //     roleName: data?.roleName,
        //     allowedEndPoints:getEnpointsToPermissons(t_access),
        //     permission: t_access,
        // }
        // console.log("Json", json);
        // HitApi(json, addRole,getAuthToken()).then((res) => {
        //     console.log("res",res);
        //     if ( res.status === 200) {
        //         alert(res.message)
        //     }
        // })
    };

    return (
        <div className='p-10'>
            <Form validationSchema={rolesAndPermissionSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <Input type="text" size={isMedium ? 'lg' : 'xl'} label="Role Name" placeholder="eg. Admin" className="[&>label>span]:font-medium " {...register('roleName')} error={errors?.roleName?.message} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Text as="h6" className='font-bold'>Access</Text>
                        </div>
                        <div>
                           <Permissions/>
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CommonButtton text={"Cancel"} size={isMedium ? 'lg' : 'md'} onClick={closeModal} />
                            <CommonButtton type={"submit"} text={"Submit"} size={isMedium ? 'lg' : 'md'} />
                        </div>
                        
                        
                    </div>
                )}
            </Form>
        </div>
    )
}

export default AddRole