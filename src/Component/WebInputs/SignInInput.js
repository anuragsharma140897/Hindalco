import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

function SignInInput({ placeholder, type }) {
    return (
        <div>
            <div class="relative h-11 w-full min-w-[200px]">
                <input placeholder={placeholder} type={type ? type : "text"}
                    className="peer  onfoucsnone text-white h-full w-full border-t-0 border-r-0 border-l-0 border-b-1 border-white bg-transparent pt-4 pb-1.5 font-sans text-base font-normal placeholder:opacity-0 p-0 " />
                <label
                    class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight  transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-400 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-white peer-disabled:peer-placeholder-shown:text-white text-white ">
                    {placeholder}
                </label>
            </div>

        </div>
    )
}

export default SignInInput