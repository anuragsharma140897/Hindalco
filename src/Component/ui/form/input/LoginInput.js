import React, { useState } from 'react';
import { Colors } from '../../../../Constant/Colors/Color';
import { FiEye, FiEyeOff } from "react-icons/fi";

function LoginInput({ icon, placeholder, ispassword }) {
    const [changeType, setType] = useState(ispassword ? 'password' : 'text');

    return (
        <div>
            <div className='bg-white rounded-2xl px-5 py-3'>
                <div className='flex items-center gap-x-1'>
                    {icon}
                    <input 
                        className="w-full outline-none border-0 rounded-xl text-black" 
                        placeholder={placeholder} 
                        type={changeType} 
                    />
                    {ispassword && (
                        changeType === "password" 
                            ? <FiEye size={25} color={Colors.LOGINRED} onClick={() => setType("text")} />
                            : <FiEyeOff size={25} color={Colors.LOGINRED} onClick={() => setType("password")} />
                    )}
                </div>
            </div>
            <div className='text-xs mt-1.5 font-medium' style={{ color: Colors.LOGINYELLOW }}>
                Username is invalid *
            </div>
        </div>
    );
}

export default LoginInput;
