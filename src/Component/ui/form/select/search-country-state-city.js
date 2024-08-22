import React, { useState } from 'react';
import Select from 'react-select';



function SearchCountryStateCity({ important, label, error, name ,options,onChange,value}) {
    const [selectedOption, setSelectedOption] = useState(null);



    return (
        <div>
            <label className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</label>
            <Select
                defaultInputValue={value}
                onChange={onChange}
                options={options || []}
                isClearable={false}
                className={`w-full text-lg 
        disabled:bg-gray-200
        ${error?.[name] ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}

                placeholder="Select ..."
            />

        </div>
    );
}

export default SearchCountryStateCity;
