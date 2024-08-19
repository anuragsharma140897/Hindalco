import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'
import CustomCheckBox from '../../../../../Component/ui/form/checkbox/custom-checkbox'
import CustomSelect from '../../../../../Component/ui/form/select/custom-select'

function Connection() {

    const GenderOption = [
        { id: 'male', label: 'Male', value: 'male' },
        { id: 'female', label: 'Female', value: 'female' },
        { id: 'other', label: 'Other', value: 'other' },
    ]
    return (
        <div className=' py-5 bg-white'>
            <div className='grid grid-cols-4 gap-x-4'>
                <CustomInput important={true} name="value" label="Server" />
                <CustomInput important={true} name="value" label="Port" />
                <CustomInput important={true} name="value" label="Protocol" />
                <CustomInput important={true} name="value" label="Keep Alive" />
                <CustomSelect name="gender" label="Gender" options={GenderOption} />
                <CustomCheckBox name="addEmptyBag" label="Clean Session" />
                <CustomCheckBox name="addEmptyBag" label="Debug" />
                <CustomCheckBox name="addEmptyBag" label="Basic Authentication" />
            </div>

        </div>
    )
}

export default Connection