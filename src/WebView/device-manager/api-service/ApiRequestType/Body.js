import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setServiceRequestData } from '../store/Action/ServiceMasterAction';
import CustomJsonEditor from '../../../../Component/ui/editor/json-editor';

function Body() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('raw');

    const tabs = ['raw', 'form-data', 'x-www-form-urlencoded', 'binary'];

    const onChange = (value) => {

        console.log("value", value);

        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.raw = JSON.stringify(value)
        dispatch(setServiceRequestData(oldJson))
    }

    const onChangeMode = (tab) => {
        setActiveTab(tab)
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.body.mode = tab
        dispatch(setServiceRequestData(oldJson))
    }

    function isValidJSON(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    }

    console.log('ServiceMasterReducer?.requestDoc?.request?.body?.raw', ServiceMasterReducer?.requestDoc);

    console.log('JSON.parse(ServiceMasterReducer?.requestDoc?.request?.body)', ServiceMasterReducer?.requestDoc?.request?.body);

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