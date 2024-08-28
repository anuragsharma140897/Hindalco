import React, { useState } from 'react'
import { Radio, RadioGroup } from 'rizzui';
import OutboundBatch from '../outbound-batch/outbound-batch';
import OutboundIgoneBatch from '../outbound-ignore-batch/outbound-igone-batch';

function BatchWithout() {
    const [value, setValue] = useState("")
    const [selectedDetails, setSelectedDetails] = useState(null);


    return (
        <div>
            <div>
                <div className='mt-5'>
                    <div className='text-base text-black font-semibold mb-5'>Batch / Without batch</div>
                    <RadioGroup
                        value={value}
                        setValue={(newValue) => {
                            setValue(newValue);
                            setSelectedDetails(null);
                        }}
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