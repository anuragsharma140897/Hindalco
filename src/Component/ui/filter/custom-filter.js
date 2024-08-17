import React, { useEffect } from 'react'
import { FilterCondition } from '../../../Constant/filters/Filter'
import { Badge, Select, Text } from 'rizzui'; // Import the status classes
import { STATUS_CLASSES } from '../../../Constant/Colors/Color';


export default function CustomFilter({ screen }) {

    let FilterItem = FilterCondition?.find(Obj => Obj?.screen === screen);
    
    useEffect(() => {
        console.log('FilterItem', FilterItem);
    }, []);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                FilterItem?.condition?.map((ele, index) => (
                    <div key={index}>
                        <Select
                            options={ele?.Options}
                            placeholder={ele?.placeholder || 'Select ...'}
                            optionClassName='hover:bg-red-lighter'
                            getOptionDisplayValue={
                                ele?.useCustomDisplay 
                                ? (option) => renderOptionDisplayValue(option.value) 
                                : (option) => renderDefaultDisplay(option.value) 
                            }
                        />
                    </div>
                ))
            }
        </div>
    );
}

function renderOptionDisplayValue(value) {
    const lowerCaseValue = value.toLowerCase();
    const statusClass = STATUS_CLASSES[lowerCaseValue] || STATUS_CLASSES.default;

    return (
        <div className="flex items-center">
            <Badge color={statusClass.badgeColor} renderAsDot />
            <Text className={`ms-2 font-medium capitalize ${statusClass.textColor}`}>
                {value}
            </Text>
        </div>
    );
}

function renderDefaultDisplay(value) {
    return (
        <div className="flex items-center">
            <Text className="ms-2 capitalize text-gray-800 transition-colors duration-200 ">
                {value}
            </Text>
        </div>
    );
}