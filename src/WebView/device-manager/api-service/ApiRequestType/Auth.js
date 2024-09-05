import React from 'react'
import { setServiceRequestData } from '../store/Action/ServiceMasterAction'
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircle, Trash } from 'lucide-react';

function Auth() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);

    const dispatch = useDispatch()

    const onChnageAuthType = (value) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.auth.type = value
        dispatch(setServiceRequestData(oldJson))
    }

    const removeAuthBearer = (i) =>{
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.auth.bearer.splice(i, 1)
        dispatch(setServiceRequestData(oldJson))
    }

    const onClickAddMoreAuthBearer = () =>{
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.auth.bearer.push({ key: '', value: '' })
        dispatch(setServiceRequestData(oldJson))
    }

    const onChange = (value,name,index) =>{
        var oldJson = ServiceMasterReducer?.requestDoc

        console.log('oldJson',oldJson);

        oldJson.request.auth.bearer[index][name] = value
        dispatch(setServiceRequestData(oldJson))
    }

    return (
        <div className='m-5'>
            <div>
                <p>Type</p>
                <select onChange={(e) => onChnageAuthType(e.target.value)} className="col-span-1 block w-max rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option selected={ServiceMasterReducer?.requestDoc?.request?.method === 'bearer'}>bearer</option>
                </select>
            </div>
            <div className='mt-5'>
                <div className='flex gap-5'>
                    <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value='Key' />
                    <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value='Value' />
                    <Trash size={40} />
                </div>
                {
                    ServiceMasterReducer?.requestDoc?.request?.auth?.bearer?.map((ele, i) => {
                        return (
                            <div className='flex gap-5'>
                                <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={(e) => onChange(e.target.value, 'key', i)} value={ele?.key} placeholder='Key' />
                                <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={(e) => onChange(e.target.value, 'value', i)} value={ele?.value} placeholder='Value' />
                                <Trash size={40} onClick={() => removeAuthBearer(i)} />
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-end'>
                <p className='p-2 underline w-max flex text-base text-blue-500' onClick={() => onClickAddMoreAuthBearer()}>Add More <PlusCircle /></p>
            </div>
        </div>
    )
}

export default Auth