import React from 'react'
import banner from '../../Images/loginimg.jpg'
import { Colors } from '../../Constant/Colors/Color'
import LoginInput from '../../Component/ui/form/input/LoginInput'
import { LoginValidation } from './login-validation'
import { useDispatch, useSelector } from 'react-redux'
import { useDismiss } from '@floating-ui/react'
import { setAuthError } from '../../Store/Action/Auth/Sample/AuthAction'
import { HitApi } from '../../Store/Action/Api/ApiAction'
import { LoginApi } from '../../Constant/Api/Api'

export default function Login() {

  const AuthReducer = useSelector(state => state.AuthReducer)

  console.log("AuthReducer",AuthReducer);
  const dispatch = useDispatch()


  const handleLogin = () => {
    dispatch(setAuthError({}))
    LoginValidation(AuthReducer.doc).then((error)=>{
      console.log("error",error);
      dispatch(setAuthError(error))
      if(Object.keys(error).length === 0){
        HitApi(AuthReducer.doc,LoginApi).then((response)=>{
          console.log("response",response);
        })
        
      }
    })

  }
  return (
    <div className='grid grid-cols-7  h-screen'>
      <div className='col-span-4' style={{ backgroundImage: `url(${banner})`, backgroundSize: "120%  100% " }}>
        <div className='px-16 py-32 h-screen' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <i className='text-xl font-medium' style={{ color: Colors.LOGINYELLOW }}>
            Welcome to
          </i>
          <div className='text-white text-3xl font-bold' >Track and Trace</div>
          <div className='text-white text-3xl font-bold' >System USing RFID</div>
        </div>
      </div>
      <div className='col-span-3 px-16 py-32' style={{ background: Colors.LOGINRED }}>
        <div className='text-white text-2xl'>Sign in</div>
        <div className='mt-10 flex flex-col gap-y-11'>
          <LoginInput placeholder={"Username or Email ID"} name={"username"} error={!AuthReducer?.doc?.userName } />
          <LoginInput placeholder={"Password"} type={"password"} name={"password"} error={!AuthReducer?.doc?.password }/>
        </div>
        <div className='mt-20 bg-white text-center py-2 text-lg text-black font-bold shadow cursor-pointer' onClick={handleLogin}>
          Sign In
        </div>

      </div>
    </div>
  )
}
