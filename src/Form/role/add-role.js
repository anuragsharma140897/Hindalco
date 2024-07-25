import {  Button, Input,  Text } from 'rizzui';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from '../../Hooks/use-media';
import { Form } from '../../Component/ui/form';
import { useEffect, useState } from 'react';
import { setRolesAndPermission } from '../../Store/Action/RolesAndPermission/RolesAndPermissionAction';
import { rolesAndPermissionSchema } from '../../Utils/validators/user/role-and-permission.schema';
import DropDownIcon from '../../Constant/Icons/dropdown-icon';
import DropUpIcon from '../../Constant/Icons/dropup-icon';
import { AddChildRolePermission } from '../../Utils/Utils';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { addRole } from '../../Constant/Api/Api';


const initialValues = {
    email: 'admin@admin.com',
    password: 'admin',
    rememberMe: true,
};

export const genderOption = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'other', label: 'other' },
];
export default function UserForm({closeModal}) {
    var dispatch = useDispatch()
    const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
    const isMedium = useMedia('(max-width: 1200px)', false);

    const [showChild, setShowChild] = useState(false)

    useEffect(() => {

    }, [])

    const onSubmit = (data) => {

        var t_access = reduxRolesAndPermission?.doc;
        var json = {
            roleName: data?.roleName,
            permissions: t_access
        }

        HitApi(json,addRole).then((res)=>{
            console.log("res",res)
            if(res.message === "Role added successfully" && res.status ===200){
                alert(res.message)
             
            }
        })

        

    };

    const handleChange = (e) => {
        console.log('e', e);
    }
    const handleAccessChnage = (itemKey, perm, child) => {

        var t_access = reduxRolesAndPermission?.doc;

        if (!child) {
            var element = t_access?.find(ele => Object.keys(ele)[0] === itemKey);
            if (element) {
                element[itemKey][perm] = !element[itemKey][perm];
                dispatch(setRolesAndPermission(t_access));
            }
        }
        else {
            var element = AddChildRolePermission(t_access, itemKey)
            if (element) {
                element[perm] = !element[perm];
                dispatch(setRolesAndPermission(t_access));
            }
        }

    }

    let access;


    const handleChild = (onOff) => {
        setShowChild(onOff)
    }

    if (reduxRolesAndPermission?.doc) {
        access = reduxRolesAndPermission?.doc?.map((item, index) => {
            const itemKey = Object.keys(item)[0];
            const permissions = item[itemKey];
            const colors = { read: "bg-yellow-500 text-white", write: "bg-green-500 text-white", delete: "bg-red-500 text-white" };

            console.log("item", item);



            return (
                <div>
                  
                    <div key={index} className='flex justify-between'>
                        <div className={`flex items-center justify-center  rounded-md gap-x-5 ${item?.child && "px-5 border cursor-pointer"}`} onClick={() => handleChild(!showChild)}>
                            <Text className="capitalize">{itemKey}</Text>
                            {item?.child &&
                                <div >
                                    {showChild ? <DropUpIcon /> : <DropDownIcon />}
                                </div>
                            }

                            {console.log("itemchos", item.child)}
                        </div>

                        <div className="flex gap-2">
                            {Object.entries(permissions).map(([perm, value]) => (
                                <div key={`${itemKey}-${perm}`} className="flex items-center gap-1">
                                    <Text className={`font-semibold border py-2 px-5 rounded-lg ${value ? 'bg-white' : 'bg-gray-200'} cursor-pointer ${value ? colors?.[perm] : null}`} onClick={() => handleAccessChnage(itemKey, perm)}>
                                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                    </div>
                    {
                        showChild ?
                            item?.child?.map((ele, i) => {
                                console.log("ele", ele);
                                return (
                                    <div className='flex items-center gap-x-4 '>
                                        <div className='my-5 w-40 ' >{Object.keys(ele)}</div>
                                        <div className="flex gap-2">
                                            {
                                                Object.entries(ele[Object.keys(ele)]).map(([perm, value]) => {

                                                    {
                                                        console.log("perm", perm)
                                                        console.log("value", value)
                                                    }
                                                    return (
                                                        <div key={`${Object.keys(ele)}-${perm}-${i}`} className="flex items-center gap-1">
                                                            <Text className={`font-semibold border py-2 px-5 rounded-lg ${value ? "bg-white" : "bg-gray-200"} cursor-pointer ${value ? colors?.[perm] : null}`} onClick={() => handleAccessChnage(`${Object.keys(ele)}`, perm, true)}>
                                                                {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                                            </Text>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                )
                            })
                            :
                            ''
                    }
                </div>
            );
        });
    }

    console.log("reduxRolesAndPermission", reduxRolesAndPermission);

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
                        {access}
                        <div className='flex gap-3 justify-end'>
                            <Button  size={isMedium ? 'lg' : 'md'} onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button  type="submit" size={isMedium ? 'lg' : 'md'}>
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </Form>

        </div>
    );
}
