import React from 'react'
import banner from '../../Images/loginimg.jpg'
import { Colors } from '../../Constant/Colors/Color'
import LoginInput from '../../Component/ui/form/input/LoginInput'

export default function login() {
  return (
    <div className='grid grid-cols-7  h-screen'>
    <div className='col-span-4' style={{ backgroundImage: `url(${banner})`, backgroundSize: "120%  100% " }}>
     <div className='px-16 py-32 h-screen' style={{background:'rgba(0,0,0,0.7)'}}>
     <i className='text-xl font-medium' style={{color:Colors.LOGINYELLOW,fontFamily:"Montserrat"}}>
        Welcome to
      </i>
      <div className='text-white text-3xl font-bold' style={{fontFamily:"Montserrat"}}>Track and Trace</div>
      <div className='text-white text-3xl font-bold' style={{fontFamily:"Montserrat"}}>System USing RFID</div>

     </div>
    </div>
    <div className='col-span-3 px-16 py-32' style={{ background: Colors.LOGINRED }}>
      <div className='text-white text-2xl'>Sign in</div>
      <div className='mt-10 flex flex-col gap-y-11'>
        <LoginInput placeholder={"Username or Email ID"}/>
        <LoginInput placeholder={"Password"} type={"password"}/> 
      </div>
      <div className='mt-20 bg-white text-center py-2 text-lg text-black font-bold shadow'>
        Sign In
      </div>

    </div>
  </div>
  )
}
