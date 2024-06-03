import { Password, Button, Input, Select, Text } from 'rizzui';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from '../../Hooks/use-media';
import { Form } from '../../Component/ui/form';
import { loginSchema } from '../../Utils/validators/login.schema';
import { useEffect } from 'react';
import { setRolesAndPermission } from '../../Store/Action/RolesAndPermission/RolesAndPermissionAction';


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
export default function UserForm() {
    var dispatch = useDispatch()
    const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
    const isMedium = useMedia('(max-width: 1200px)', false);

    useEffect(() => {

    }, [])

    const onSubmit = (data) => {
        console.log('Sign in data ->', data);
    };

    const handleChange = (e) => {
        console.log('e', e);
    }
    const handleAccessChnage = (itemKey, perm) => {
        var t_access = reduxRolesAndPermission?.doc;
        var element = t_access?.find(ele => Object.keys(ele)[0] === itemKey);
        
        if (element) {
            element[itemKey][perm] = !element[itemKey][perm];
            dispatch(setRolesAndPermission(t_access));
        }
        
        
        console.log('t_perm', t_access);

    }

    let access;

    if (reduxRolesAndPermission?.doc) {
        access = reduxRolesAndPermission?.doc?.map((item, index) => {
            const itemKey = Object.keys(item)[0];
            const permissions = item[itemKey];
            const colors = { read: "bg-yellow-500", write: "bg-green-500", delete: "bg-red-500" };
            return (
                <div key={index} className='flex justify-between'>
                    <Text className="capitalize">{itemKey}</Text>
                    <div className="flex gap-2">
                        {Object.entries(permissions).map(([perm, value]) => (
                            <div key={`${itemKey}-${perm}`} className="flex items-center gap-1">
                                <Text className={`font-semibold border py-2 px-5 rounded-lg ${value ? 'bg-white' : 'bg-gray-200'} cursor-pointer ${value?colors?.[perm]:null}`} onClick={() => handleAccessChnage(itemKey, perm)}>
                                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    }

    return (
        <div className='p-10'>
            <Form validationSchema={loginSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <Input type="text" size={isMedium ? 'lg' : 'xl'} label="Role Name" placeholder="eg. Admin" className="[&>label>span]:font-medium " {...register('firstName')} error={errors?.firstName?.message} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Text as="h6" className='font-bold'>Access</Text>
                        </div>
                        {access}

                        <div className='flex gap-3 justify-end'>
                            <Button className="" type="submit" size={isMedium ? 'lg' : 'md'}>
                                Cancel
                            </Button>
                            <Button className="" type="submit" size={isMedium ? 'lg' : 'md'}>
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </Form>

        </div>
    );
}
