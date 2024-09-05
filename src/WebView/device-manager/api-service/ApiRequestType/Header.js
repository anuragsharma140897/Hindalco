import React from 'react'
import { setServiceRequestData } from '../store/Action/ServiceMasterAction';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle, Trash } from 'lucide-react';

function Header() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch()

    const onClickAddMoreHeader = () => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.header.push({ key: '', value: '' })
        dispatch(setServiceRequestData(oldJson))
    }

    const onChange = (value, name, index) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.header[index][name] = value
        dispatch(setServiceRequestData(oldJson))
    }

    const removeHeader = (i) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.header.splice(i, 1)
        dispatch(setServiceRequestData(oldJson))
    }

    return (
        <div className='mt-5'>
            <div>
                <div className='flex mx-10 gap-5'>
                    <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value='Key' />
                    <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value='Value' />
                    <Trash size={40} />
                </div>
                {
                    ServiceMasterReducer?.requestDoc?.request?.header?.map((ele, i) => {

                        console.log('ele',ele);

                        return (
                            <div className='flex mx-10 gap-5'>
                                <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={(e) => onChange(e.target.value, 'key', i)} value={ele?.key} placeholder='Key' />
                                <input className='w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={(e) => onChange(e.target.value, 'value', i)} value={ele?.value} placeholder='Value' />
                                <Trash size={40} onClick={() => removeHeader(i)} />
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-end'>
                <p className='p-2 underline w-max flex text-base text-blue-500' onClick={() => onClickAddMoreHeader()}>Add More <PlusCircle /></p>
            </div>
        </div>
    )
}

export default Header