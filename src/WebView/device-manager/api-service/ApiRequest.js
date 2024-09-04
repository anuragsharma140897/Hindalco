import React, { useEffect, useState } from 'react';
import Header from '../api-service/ApiRequestType/Header'
import Auth from '../api-service/ApiRequestType/Auth'
import Body from '../api-service/ApiRequestType/Body'
import { useDispatch, useSelector } from 'react-redux';
import { AllApiCallHere } from './store/AllApiCallHere';
import { setServiceGlobalVariabls, setServiceRequestData } from './store/Action/ServiceMasterAction';
import { searchRequest, updateRequest } from './constants/constant';
import { dynamicFetch } from './FullJson';
import { File } from 'lucide-react';
import CustomJsonEditor from '../../../Component/ui/editor/json-editor';
import { CompileConfiguration, checkJSONFormat, convertJsonToXml, convertNodeToJson, extractHashValues, replaceValues, xmlToJson } from './utils';
import { proxy } from '../../../Constant/Api/Api';

function ApiRequest({ dataForRequest }) {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);

    const [activeTab, setActiveTab] = useState('Params');
    const [accuatalResult, setAccuatalResult] = useState(null)
    const [render, setRender] = useState(Date.now())

    const dispatch = useDispatch()

    useEffect(() => {
        if (ServiceMasterReducer?.requestDoc === null) {
            getApiRequest()
            setAccuatalResult("")
            setRender(Date.now())
        }
    }, [ServiceMasterReducer, render])

    const getApiRequest = () => {
        var json = {
            page: 1,
            limit: 1,
            search: {
                _id: ServiceMasterReducer?.doc?.[dataForRequest?.serviceIndex]?.requests?.[dataForRequest?.requestIndex]?.requestId
            }
        }
        AllApiCallHere(json, searchRequest).then(res => {
            if (res?.content?.length > 0) {
                dispatch(setServiceRequestData(res?.content?.[0]))
                setRender(Date.now())
            };
        })
    }

    const onClickSend = async () => {

        var oldData = ServiceMasterReducer?.requestDoc

        console.log(oldData);

        var oldData = ServiceMasterReducer?.requestDoc
        const hashValues = extractHashValues(oldData?.request);
        console.log('hashValues', hashValues);
        if (hashValues?.length !== 0) {
            hashValues.map((ele) => {
                const tokenObject = ServiceMasterReducer?.globalVariables.find(item => item.valueName === ele?.split("#")[1]);
                const token = tokenObject ? tokenObject.data : null;
                oldData.request = replaceValues(oldData?.request, { [ele?.split("#")[1]]: token })
            })
        }

        console.log('oldData--->>>>',oldData);


        const exists = oldData?.request?.header?.some(item => item.value === "application/xml");

        let header;
        var body = oldData?.request?.body
        body.raw = exists ? body.raw : JSON.parse(body.raw)

        if (oldBeaer = oldData?.request?.auth?.bearer?.length !== 0) {
            var oldBeaer = oldData?.request?.auth?.bearer
            oldBeaer[0].Authorization = 'Bearer ' + oldBeaer[0].value
            delete oldBeaer[0].value
            header = [...oldData?.request?.header, ...oldBeaer]
          }
          let json = {
            "request": {
              "host": oldData?.request?.url?.raw,
              "type": oldData?.request?.method,
              "body": body.raw, // We'll set this below
            },
            "header": header !== null ? header : oldData?.request?.header
          };

        console.log('json---', json);


        AllApiCallHere(json, proxy, exists).then(async res => {


            let jsonResult
            console.log('res', res);
            if (exists) {
                jsonResult = xmlToJson(res);
            }

            console.log('jsonResult',jsonResult);
            console.log('ServiceMasterReducer?.globalVariables', ServiceMasterReducer?.globalVariables);


            var tempGlobalArr = await CompileConfiguration(ServiceMasterReducer?.globalVariables,jsonResult===undefined?res:jsonResult);

            console.log('tempGlobalArr',tempGlobalArr);

            dispatch(setServiceGlobalVariabls(tempGlobalArr))
            setAccuatalResult(jsonResult===undefined?res:jsonResult)
            setRender(Date.now())
            dispatch(setServiceRequestData(oldData))


        })







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
        setRender(Date.now())
    }

    const onClickSaveRequest = () => {
        var oldData = ServiceMasterReducer.requestDoc
        if (accuatalResult !== null && accuatalResult !== "") {
            oldData.response[0] = accuatalResult
        }

        console.log('ServiceMasterReducer?.requestDoc', oldData);

        AllApiCallHere(oldData, updateRequest).then(result => {
            console.log('result', result);
            // setAccuatalResult(result)
            setRender(Date.now())
        })
    }

    console.log(ServiceMasterReducer);

    const tabs = ['Params', 'Authorization', 'Headers', 'Body'];

    console.log('accuatalResult', accuatalResult);

    return (
        ServiceMasterReducer?.requestDoc !== null ?
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
                    {/* accuatalResult === null || accuatalResult === "" ? JSON.stringify(ServiceMasterReducer?.requestDoc?.response?.[0]) : accuatalResult */}
                    <CustomJsonEditor readOnly={true} detectRender={render} json={accuatalResult === null || accuatalResult === "" ? ServiceMasterReducer?.requestDoc?.response?.[0] : accuatalResult} />
                    {/* <textarea className='w-full h-96' value={accuatalResult === null || accuatalResult === "" ? JSON.stringify(ServiceMasterReducer?.requestDoc?.response?.[0]) : accuatalResult} /> */}
                </div>
            </div>
            :
            'Loading'

    );
}

export default ApiRequest;