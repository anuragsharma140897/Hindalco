import Image from 'next/image';
import { metaObject } from '@/config/site.config';
import AuthWrapperFive from '@/shared/auth-layout/auth-wrapper-five';
import WaveShape from '@/components/shape/wave';

import BgImage from '@/assets/bg-login.png'
import SignInForm from '@/forms/signin/singnin-form';

export const metadata = {
  ...metaObject('Sign In 5'),
};

export default function SignInPage() {
  return (
    <div className='h-[100vh]'>
      <div className='grid grid-cols-2'>
        <div className='bg-login-image h-[100vh]'></div>
        <div className='bg-primary-main p-14'>
          <SignInForm/>
        </div>
      </div>
    </div>
  );
}
