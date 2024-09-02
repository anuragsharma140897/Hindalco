import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CustomJsonEditor from '../../../Component/ui/editor/json-editor';
import CustomConfiguration from '../../../Component/configuration/custom-configuration';
import CustomMapper from '../../../Component/mapper/custom-mapper';

function Mapper() {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const reduxMapping = useSelector(state => state.MappingReducer)

    const [input, setInput] = useState({ "page": 1 })
    const [mapping, setMapping] = useState({ "page": "page" })
    const [output, setOutput] = useState()

    console.log('ServiceMasterReducer?.requestDoc?.response?',ServiceMasterReducer?.requestDoc);

    return (
        <CustomMapper input={ServiceMasterReducer?.requestDoc?.response?.[0]} mapping={ServiceMasterReducer?.globalVariables!==null?ServiceMasterReducer?.globalVariables:{}} setOutput={setOutput} output={output} />
        // <CustomJsonEditor readOnly={true} json={ServiceMasterReducer?.requestDoc?.response?.[0]} />
    )
}

export default Mapper