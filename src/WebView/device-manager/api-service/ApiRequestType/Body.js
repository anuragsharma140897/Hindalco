import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setServiceRequestData } from '../Store/Action/ServiceMasterAction';

function Body() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('raw');

    const tabs = ['raw', 'form-data', 'x-www-form-urlencoded', 'binary'];

    const onChange = (value) =>{
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.raw = value
        dispatch(setServiceRequestData(oldJson))
    }

    const onChangeMode = (tab) =>{
        setActiveTab(tab)
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.mode = tab
        dispatch(setServiceRequestData(oldJson))
    }

    return (
        <div>
            <div className="flex gap-10 ml-5 mt-2">
                {tabs.map((tab) => (
                    <div className='flex items-center gap-2'>
                        <p>{tab}</p>
                        <input onClick={() => onChangeMode(tab)} type='radio' checked={activeTab === tab} />
                    </div>
                ))}
            </div>
            <div className='m-5'>
                {
                    activeTab === 'raw' ?
                    <textarea onChange={(e)=>onChange(e.target.value)} className='h-max w-full' value={ServiceMasterReducer?.requestDoc?.request?.body?.raw}/>    
                    :
                        activeTab === 'form-data' ?
                            <p>form-data</p> :
                            activeTab === 'x-www-form-urlencoded' ?
                                <p>x-www-form-urlencoded</p> :
                                'binary'
                }
            </div>
        </div >
    )
}

export default Body