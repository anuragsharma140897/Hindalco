import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomJsonEditor from '../../../Component/ui/editor/json-editor';
import CustomConfiguration from '../../../Component/configuration/custom-configuration';
import CustomMapper from '../../../Component/mapper/custom-mapper';

function Mapper() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);

    const [input, setInput] = useState({})
    const [mapping, setMapping] = useState({})
    const [output, setOutput] = useState()

    useEffect(()=>{
        if(ServiceMasterReducer?.globalVariables!==null && Object.keys(mapping).length === 0){
            setMapping(ServiceMasterReducer?.globalVariables)
        }
        if(Object.keys(input).length === 0){
            setInput(ServiceMasterReducer?.requestDoc?.response?.[0])
        }
    },[])

    console.log('ServiceMasterReducer?.requestDoc?.response?',input);
    console.log('output',output);
    console.log('output',mapping);

    return (
        <CustomMapper input={input} setInput={setInput} mapping={ServiceMasterReducer?.globalVariables!==null?ServiceMasterReducer?.globalVariables:{}} setMapping={mapping} setOutput={setOutput} output={output} />
        // <CustomJsonEditor readOnly={true} json={ServiceMasterReducer?.requestDoc?.response?.[0]} />
    )
}

export default Mapper