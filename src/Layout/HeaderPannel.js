import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { Colors } from '../Constant/Colors/Color';
import { getHeadingFromPathname } from '../Utils/Utils';

function HeaderPannel() {
  const [heading, setHeading] = useState("");



  useEffect(() => {
    setHeading(getHeadingFromPathname());
  }, [window.location.pathname]);

  return (
    <div className='px-5 py-3 bg-[#f1f1f1] border border-l-0 mb-3'>
      <div className='flex justify-between items-center font-bold text-lg'>
        <div>{heading}</div>
        <div>
          <div className='flex gap-x-5 items-center'>
            <div>
              <div className='p-2.5 bg-white rounded-full'> 
                <FaBell color={Colors.LOGINRED} />
              </div>
            </div>
            <div className='bg-white px-3 py-1 rounded-xl shadow'>
              <div className='flex gap-x-3 items-center justify-center'>
                <img className='size-8 rounded-full' src='https://lineone.piniastudio.com/images/avatar/avatar-8.jpg' />
                <div>
                  <div className='text-sm font-bold'>Warner</div>
                  <div className='text-xs font-normal'>David Warner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPannel;
