import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setServiceRequestData } from '../store/Action/ServiceMasterAction';
import CustomJsonEditor from '../../../../Component/ui/editor/json-editor';
import CustomXmlEditor from '../../../../Component/ui/editor/xml-editor';

function Body() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('XML');

    const tabs = ['raw', 'XML'];

    const onChange = (value) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.options.raw.language = 'xml'
        oldJson.request.body.raw = value.toString()

        console.log('oldJson',oldJson);

        // dispatch(setServiceRequestData(oldJson))
    }

    const onChangeMode = (tab) => {
        setActiveTab(tab)
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.mode = tab
        dispatch(setServiceRequestData(oldJson))
    }

    console.log('service',ServiceMasterReducer);

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
                        <CustomJsonEditor onChange={(value) => onChange(value, 'input')} json={ServiceMasterReducer?.requestDoc?.request?.body?.raw !== "" && Object.keys(ServiceMasterReducer?.requestDoc?.request?.body?.raw).length !== 0 ? JSON.parse(ServiceMasterReducer?.requestDoc?.request?.body?.raw) : {}} />
                        :
                        <CustomXmlEditor onChange={(value) => onChange(value, 'input')} xml={ServiceMasterReducer?.requestDoc?.request?.body?.raw}/>
                }
            </div>
        </div >
    )
}

export default Body