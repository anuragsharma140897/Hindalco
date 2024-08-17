import React from 'react'
import { Form } from '../../Component/ui/form'
import { loginSchema } from '../../Utils/validators/login.schema'
import { useMedia } from '../../Hooks/use-media';
import { Button, Input, Password, Switch } from 'rizzui';
import { HitApi } from '../../Store/Action/Api/ApiAction';
import { LoginApi } from '../../Constant/Api/Api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../Store/Action/Auth/Sample/AuthAction';

const initialValues = {
    username: 'admin@',
    password: 'admin'
};

export default function LoginForm() {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);
    const onSubmit = (data) => {

        HitApi(initialValues, LoginApi).then((res) => {

            // if (res) {
            //     dispatch(setAuth(res))
            // }
        })
    };

    return (
        <div className='p-10'>
            <Form validationSchema={loginSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <Input
                            type="email"
                            size={isMedium ? 'lg' : 'xl'}
                            label="Username"
                            placeholder="Enter your email"
                            className="[&>label>span]:font-medium "
                            {...register('username')}
                            error={errors.username?.message}
                        />
                        <Password
                            label="Password"
                            placeholder="Enter your password"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <div className="flex items-center justify-between">
                            <Switch
                                label="Remember Me"
                                className="[&>label>span]:font-medium [&>label]:my-1"
                                {...register('rememberMe')}
                            />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            size={isMedium ? 'lg' : 'xl'}
                        >
                            Sign In
                        </Button>
                    </div>
                )}
            </Form>

        </div>
    )
}
