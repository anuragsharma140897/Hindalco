
import React, { useState } from 'react'
import banner from '../../Images/loginimage.png'
import { Colors } from '../../Constant/Colors/Color'
import LoginInput from '../../Component/ui/form/input/LoginInput'
import LoginPasswordIcon from '../../Constant/Icons/login-password-icon'
import LoginUserIcon from '../../Constant/Icons/login-user-icon'

function login() {
  
  return (
    <div style={{ backgroundImage: `url(${banner})`, backgroundSize: "100%  100% " }}>
      <div className='h-screen' style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className='grid grid-cols-2  '>
          <div></div>
          <div style={{ background: Colors.LOGINRED }} className='text-white rounded-2xl px-10 h-screen'>
            <div className='flex items-center h-full'>
              <div className='w-full' >
                <div>
                  <div style={{ color: Colors.LOGINYELLOW }} className='text-4xl'>Hi There!</div>
                  <div style={{ color: Colors.LOGINTEXT }} className='mt-3 text-base'>Welcome to Track and Trace System Using RFID</div>
                </div>
                <div className='mt-10 flex flex-col gap-y-5'>
                  <LoginInput icon={<LoginUserIcon/>} placeholder="Username" name={"username"} />
                  <LoginInput icon={<LoginPasswordIcon/>} placeholder="Password" ispassword  name={"password"}/>
                </div>
                <div>
                  <button className=' text-xl w-full mt-10 text-red-900 py-4 rounded-2xl bg-white font-extrabold '>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default login
