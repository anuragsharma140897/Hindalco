import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomJsonEditor from '../../../Component/ui/editor/json-editor';
import CustomConfiguration from '../../../Component/configuration/custom-configuration';
import CustomMapper from '../../../Component/mapper/custom-mapper';
import { File } from 'lucide-react';
import { AllApiCallHere } from './store/AllApiCallHere';
import { updateApiService } from './constants/constant';
import { setGlobalResponse } from './store/Action/ServiceMasterAction';

function ApiMapper() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch()

    const [input, setInput] = useState({})
    const [mapping, setMapping] = useState({})
    const [output, setOutput] = useState()

    useEffect(() => {
        if (ServiceMasterReducer?.globalVariables !== null && Object.keys(mapping).length === 0) {
            console.log('call----');
            setMapping(ServiceMasterReducer?.globalVariables)
        }
        if (Object.keys(input).length === 0) {
            setInput(ServiceMasterReducer?.requestDoc?.response?.[0])
        }
    }, [mapping])

    const SaveConfiguration = () => {
        console.log('SaveConfiguration', mapping);
        console.log('ServiceMasterReducer', ServiceMasterReducer);
        var oldData = ServiceMasterReducer?.doc[0]
        oldData.globalVariables = mapping

        console.log('oldData', oldData);

        AllApiCallHere(oldData, updateApiService).then(res => {
            console.log(res);
        })
    }

    const onMyClick = (data) => {

        var oldData = ServiceMasterReducer?.globalResponse
        var newArr = [...oldData, ...data]
        dispatch(setGlobalResponse(newArr))
    }

    console.log('ServiceMasterReducer--', ServiceMasterReducer);

    return (
        <div>
            <CustomMapper onMyClick={onMyClick} input={input} setInput={setInput} mapping={mapping} setMapping={setMapping} setOutput={setOutput} output={output} />
            <button
                className="mt-5 flex items-center px-4 py-2 text-sm w-max rounded-xl text-left bg-blue-400 text-white"
                onClick={() => SaveConfiguration()}
            >
                <File className="mr-2" size={16} />
                Save Configuration
            </button>
        </div>
    )
}

export default ApiMapper;