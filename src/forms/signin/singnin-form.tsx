'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password, Button, Switch, Input, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { Form } from '@/components/ui/form';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/action/auth/auth-action';

const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

export default function SignInForm() {
  var dispatch = useDispatch()

  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log('Sign in data ->', data);
    dispatch(setAuth(data))
  };

  return (
    <div className="xl:pe-12 2xl:pe-20 text-white">
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Username"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium "
              {...register('email')}
              error={errors.email?.message}
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
              {/* <Link
                href={routes.auth.forgotPassword5}
                className="h-auto p-0 text-sm font-medium text-gray-900 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forget Password?
              </Link> */}
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
  );
}
