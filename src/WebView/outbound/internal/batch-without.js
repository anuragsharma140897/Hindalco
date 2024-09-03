import React, { useState } from 'react'
import { Radio, RadioGroup } from 'rizzui';
import OutboundBatch from '../outbound-batch/outbound-batch';
import OutboundIgoneBatch from '../outbound-ignore-batch/outbound-igone-batch';
import { useDispatch, useSelector } from 'react-redux';
import { setOutboundApiJson } from '../../../Store/Action/outbound/outbound-action';

function BatchWithout() {
    const reduxOutbound = useSelector((state) => state.OutboundReducer);

    const [value, setValue] = useState(reduxOutbound?.apiJson?.pickBy || '')
    const [selectedDetails, setSelectedDetails] = useState(null)
    const dispatch = useDispatch()


    const handleRadioChange = (newValue) => {
        setValue(newValue)
        let updatedJson = {
            ...reduxOutbound?.apiJson,
            pickBy: newValue,
        };
        dispatch(setOutboundApiJson(updatedJson));
    };



    return (
        <div>
            <div>
                <div className='mt-5'>
                    <div className='text-base text-black font-semibold mb-5'>Batch / Without batch</div>
                    <RadioGroup
                        value={value}
                        setValue={handleRadioChange}
                        className="flex gap-4"
                    >
                        <Radio label="Batch" value="Batch" />
                        <Radio label="Ignore batch" value="Ignorebatch" />
                    </RadioGroup>
                </div>
                <div >
                    <div className='mt-5 '>
                        {value === "Batch" && <OutboundBatch />}
                        {value === "Ignorebatch" && <OutboundIgoneBatch />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchWithout