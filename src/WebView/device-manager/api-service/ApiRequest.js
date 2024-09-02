import React, { useEffect, useState } from 'react';
import Header from '../api-service/ApiRequestType/Header'
import Auth from '../api-service/ApiRequestType/Auth'
import Body from '../api-service/ApiRequestType/Body'
import { useDispatch, useSelector } from 'react-redux';
import { AllApiCallHere } from './store/AllApiCallHere';
import { setServiceRequestData } from './store/Action/ServiceMasterAction';
import { searchRequest, updateRequest } from './constants/constant';
import { dynamicFetch } from './FullJson';
import { File } from 'lucide-react';

function ApiRequest({ dataForRequest }) {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);

    const [activeTab, setActiveTab] = useState('Params');
    const [accuatalResult, setAccuatalResult] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (ServiceMasterReducer?.requestDoc === null) {
            getApiRequest()
            setAccuatalResult("")
        }
    }, [ServiceMasterReducer])

    const getApiRequest = () => {
        var json = {
            page: 1,
            limit: 1,
            search: {
                _id: ServiceMasterReducer?.doc?.[dataForRequest?.serviceIndex].requests?.[dataForRequest?.requestIndex]?.requestId
            }
        }
        console.log('json', json);
        AllApiCallHere(json, searchRequest).then(res => {
            if (res?.content?.length > 0) {
                dispatch(setServiceRequestData(res?.content?.[0]))
            };
        })
    }

    const onClickSend = async () => {
        const resultString = await dynamicFetch(ServiceMasterReducer?.requestDoc);
        setAccuatalResult(resultString)
    };

    const onChnageMethod = (value) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.method = value
        dispatch(setServiceRequestData(oldJson))
    }

    const onChnageUrl = (value) => {
        var oldJson = ServiceMasterReducer?.requestDoc
        oldJson.request.url.raw = value
        dispatch(setServiceRequestData(oldJson))
    }

    const onClickSaveRequest = () => {
        console.log('ServiceMasterReducer?.requestDoc', ServiceMasterReducer?.requestDoc);
        AllApiCallHere(ServiceMasterReducer?.requestDoc, updateRequest).then(result => {
            setAccuatalResult(result)
        })
    }

    const tabs = ['Params', 'Authorization', 'Headers', 'Body'];

    return (
        <div>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-12 gap-3 mb-4">
                    <select onChange={(e) => onChnageMethod(e.target.value)} className="col-span-1 block w-max rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option selected={ServiceMasterReducer?.requestDoc?.request?.method === 'GET'}>GET</option>
                        <option selected={ServiceMasterReducer?.requestDoc?.request?.method === 'POST'}>POST</option>
                        <option selected={ServiceMasterReducer?.requestDoc?.request?.method === 'PUT'}>PUT</option>
                        <option selected={ServiceMasterReducer?.requestDoc?.request?.method === 'DELETE'}>DELETE</option>
                    </select>
                    <div className='col-span-10'>
                        <input value={ServiceMasterReducer?.requestDoc?.request.url.raw} onChange={(e) => onChnageUrl(e.target.value)} className='w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
                    </div>
                    <button className="text-white font-bold col-span-1 bg-blue-400 items-center text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onClick={onClickSend}>
                        Send
                    </button>
                </div>
                <div className="flex border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {
                    activeTab === 'Params' ?
                        <h1>Params</h1> :
                        activeTab === 'Authorization' ?
                            <Auth /> :
                            activeTab === 'Headers' ?
                                <Header />
                                :
                                <Body />
                }
            </div>
            <div className='flex justify-end mt-5'>
                <button className="flex gap-1 p-2 text-white font-bold col-span-1 bg-blue-400 items-center text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onClick={() => onClickSaveRequest()}>
                    <File /> Save
                </button>
            </div>
            <div className='mt-5'>
                <textarea className='w-full h-96' value={accuatalResult}/>
            </div>
        </div>
    );
}

export default ApiRequest;