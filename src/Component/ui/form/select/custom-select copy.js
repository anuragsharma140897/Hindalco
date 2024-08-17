import React, { useState } from 'react'
import { Select, Text, Title } from 'rizzui'
import cn from '../../../../Utils/class-names';
import { Controller } from 'react-hook-form';

function renderOptionDisplayValue(option) {
    return (
        <div className="flex items-center gap-3">
            <Text fontWeight="medium">{option.label}</Text>
        </div>
    );
}

export default function CustomSelect({ options, dropdownClassName, className, suffixClassName, title, fieldName, placeholder, register, errors, selectClassName, control, ...props }) {
    const [value, setValue] = useState(null);



    return (
        <div>
            {title ? <span className="rizzui-input-label block text-base mb-1.5 font-medium">{title}</span> : null}
            {/* <Select
                options={options}
                value={value}
                onChange={setValue}
                placeholder={placeholder || 'Select ' + title}
                getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
                selectClassName={cn('h-12 min-w-[150px]', selectClassName)}
                className={cn(className)}
                dropdownClassName={cn('z-[9999] p-1.5', dropdownClassName)}
                suffixClassName={suffixClassName}
                optionClassName={cn('dark:hover:bg-gray-300')}
                error={error}
                {...register(fieldName || 'dummyData')}
                {...props}
                disabled={!options}
            /> */}

            <Controller
                name={fieldName}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        dropdownClassName={cn('z-[9999] p-1.5', dropdownClassName)}
                        value={value}
                        options={options}
                        className={cn(className)}
                        selectClassName={cn('h-12 min-w-[150px]', selectClassName)}
                        suffixClassName={suffixClassName}
                        optionClassName={cn('dark:hover:bg-gray-300')}
                        onChange={onChange}
                        error={errors?.[fieldName]?.message}
                        getOptionValue={(option) => option.value}
                        disabled={!options}
                    />
                )}
            />
        </div>
    )
}
