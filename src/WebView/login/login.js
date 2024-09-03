import React, { useState } from 'react'
import banner from '../../Images/loginimage.png'
import { Colors } from '../../Constant/Colors/Color'
import LoginInput from '../../Component/ui/form/input/LoginInput'
import LoginPasswordIcon from '../../Constant/Icons/login-password-icon'
import LoginUserIcon from '../../Constant/Icons/login-user-icon'
import { useDispatch, useSelector } from 'react-redux'
import { LoginValidation } from './login-validation'
import { SET_AUTH_ERROR, setAuthError } from '../../Store/Action/Auth/Sample/AuthAction'
import { HitApi } from '../../Store/Action/Api/ApiAction'
import { LoginApi } from '../../Constant/Api/Api'
import { setAuthenticatedUser } from '../../Storage/Storage'
import { Button } from 'rizzui'

function Login() {

  const [loading ,setLoading] = useState(false)
  const AuthReducer = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()


  const handlelogin = () => {
    LoginValidation(AuthReducer?.doc).then((error) => {
      dispatch(setAuthError(error, SET_AUTH_ERROR))
      if (Object.keys(error).length === 0) {
        setLoading(true)
        HitApi(AuthReducer?.doc, LoginApi).then((res) => {


          setLoading(false)
          if (res.statusCode === 200) {
            setAuthenticatedUser(res?.jwtToken)
            window.location.reload()
          }
          if (res.status === 404) {
            dispatch(setAuthError({ "password": res.error.message }, SET_AUTH_ERROR))
          }
        })
      }
    })
  }

  return (
    <div style={{ backgroundImage: `url(${banner})`, backgroundSize: "100%  100% " }}>
      <div className='h-screen' style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div></div>

          <div style={{ background: Colors.LOGINRED, height: "97vh", marginTop: "1.5vh", marginRight: '1.5vh', marginLeft: "1.5vh" }} className='text-white rounded-2xl px-10  '>
            <div className='flex items-center h-full'>
              <div className='w-full' >
                <div>
                  <div style={{ color: Colors.LOGINYELLOW }} className='text-4xl'>Hi There!</div>
                  <div style={{ color: Colors.LOGINTEXT }} className='mt-3 text-base'>Welcome to Track and Trace System Using RFID</div>
                </div>
                <div className='mt-10 flex flex-col gap-y-5'>
                  <LoginInput icon={<LoginUserIcon />} placeholder="Username" name={'username'} error={!AuthReducer?.doc?.username} />
                  <LoginInput icon={<LoginPasswordIcon />} placeholder="Password" ispassword name={"password"} error={!AuthReducer?.doc?.password || AuthReducer?.error?.password} />
                </div>
                <div>
                  <Button className=' text-xl w-full mt-10  py-6 rounded-2xl bg-white font-extrabold text-theme ' onClick={handlelogin} isLoading={loading}>
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Login
