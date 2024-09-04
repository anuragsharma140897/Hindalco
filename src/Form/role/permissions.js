import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Badge, Checkbox, CheckboxGroup } from "rizzui";

function Permissions() {
    const reduxRolesAndPermission = useSelector(state => state.RolesAndPermissionReducer)
    const [values, setValues] = useState(["apple"]);




    return (
        <div className='flex flex-col gap-y-3'>
            {
                reduxRolesAndPermission?.doc?.map((permission, index) => {

                    return (
                        <div className='flex items-center justify-between'>
                            <div className={`${permission?.child?.length > 0 ? "border px-4 py-1" : ""}`}>
                                {permission?.value}
                            </div>
                           <div className='border border-green-300 px-3 py-1 rounded-full '>Read</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Permissions