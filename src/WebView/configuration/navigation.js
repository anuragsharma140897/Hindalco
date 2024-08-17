import React, { useState } from 'react'
import cn from '../../Utils/class-names';
import { Button, Text } from 'rizzui';
import { menuItems } from './menu-item';


export default function Navigation() {
    const pathname = window.location.pathname
    const [selected, setSelected] = useState(0)



    const handleClick = (index) => {

        setSelected(index)
    }

    return (
        <div>
            <div className={cn( 'sticky z-20 -mx-4 -mt-4 border-b border-muted  px-4 py-0 font-medium text-gray-500 sm:-mt-2 md:-mx-5 md:px-5 lg:-mx-8 lg:mt-0 lg:px-8 xl:-mx-6 xl:px-6 2xl:top-20 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10 dark:bg-gray-50', 'xl:-ms-1 xl:px-0 3xl:-ms-2 3xl:ps-0 4xl:-ms-2' )}>
                <div className="relative flex items-center overflow-hidden">
                    
                    <div className="flex h-[52px] items-start overflow-hidden">
                        <div className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8" >
                            {menuItems.map((menu, index) => (
                                <label
                                    onClick={() => handleClick(index)}
                                    key={`menu-${index}`}
                                    className={cn(
                                        'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all hover:text-gray-900',
                                    )}>
                                    <Text
                                        as="span"
                                        className={cn("inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-red-main group-hover:text-white ", index === selected ? 'bg-red-main text-white' : '')}>
                                        {menu.label}
                                    </Text>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>{menuItems?.[selected]?.Screen}</div>
        </div>
    )
}
