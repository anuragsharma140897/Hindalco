import React, { useState } from 'react'
// import cn from '../../Utils/class-names';
import { Text } from 'rizzui';
import cn from '../../../Utils/class-names';
import { menuItems } from '../../configuration/menu-item';
import { ConfigmenuItems } from './config-menu-tems';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import CustomSelect from '../../../Component/ui/form/select/custom-select';


export default function ConfigTabs() {
    const pathname = window.location.pathname
    const [selected, setSelected] = useState(0)



    const handleClick = (index) => {

        setSelected(index)
    }
    const GenderOption = [
        { id: 'male', label: 'Male', value: 'male' },
        { id: 'female', label: 'Female', value: 'female' },
        { id: 'other', label: 'Other', value: 'other' },
    ]

    return (
        <div>
            <div className='bg-white p-5 mb-5 rounded-xl'>
                <div className='grid grid-cols-3 gap-x-4'>
                    <CustomSelect name="gender" label="End point type" options={GenderOption} />
                    <CustomInput important={true} name="value" label="End point name" />
                    <CustomInput important={true} name="value" label="End point Description" />
                </div>
            </div>
            <div className='bg-white p-5 rounded-xl'>
                <div className='bg-white border-b'>
                    <div className="relative flex items-center overflow-hidden">
                        <div className="flex h-[52px] items-start overflow-hidden">
                            <div className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8" >
                                {ConfigmenuItems.map((menu, index) => (
                                    <label
                                        onClick={() => handleClick(index)}
                                        key={`menu-${index}`}
                                        className={cn(
                                            'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-gray-1000 before:transition-all before:duration-300 hover:text-gray-900',
                                            index === selected
                                                ? 'before:visible before:w-full before:opacity-100 font-bold'
                                                : 'before:invisible before:w-0 before:opacity-0 hover:before:visible hover:before:w-full hover:before:opacity-100'
                                        )}
                                    >
                                        <Text
                                            as="span"
                                            className={cn('inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200', index === selected ? ' font-bold' : '')}
                                        >
                                            {menu.label}
                                        </Text>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>{ConfigmenuItems?.[selected]?.Screen}</div>
            </div>
        </div>
    )
}
