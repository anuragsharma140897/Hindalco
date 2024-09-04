import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from "rizzui";
import cn from '../../../../Utils/class-names';
import Skeleton from 'react-loading-skeleton';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { CompileSelectData } from './select-promiss';
import { setSearchableMultiSelectSelectedData, setSearchableSelectData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';

export default function SearchableMultiSelect({ api, name, className, dynamicSearch, limit, getFieldName, type, placeholder, disabled, error, onChange, useCustomDisplay, label, reduxState, defaultOptions }) {
    const dispatch = useDispatch()
    const reduxSelect = useSelector(state => state.SearchableSelectReducer)
    const [options, setOptions] = useState(null)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (api && options === null && defaultOptions === undefined) {
            loadData();
        } else {
            if (defaultOptions !== null && defaultOptions !== undefined) {  // Checking for both null and undefined
                setOptions(defaultOptions);
            }
        }

    }, [options, reduxSelect]);

    const loadData = () => {
        if (api) {
            const json = { page: 1, limit: limit || 30, search: dynamicSearch || {} };
            HitApi(json, api).then((result) => {
                console.log('result', result);
                CompileSelectData(result?.content, getFieldName, type).then((CompiledData) => {
                    if (CompiledData) {
                        setOptions(CompiledData);
                    }
                });
            });
        }
    };

    const handleChange = (e) => {
        console.log('e', e);
        setSelected(e); 
        
    }

    return (
        <div>
            {label && <div className='block font-bold mb-1'>{label}</div>}
            {
                options?.length > 0 ? (<MultiSelect name={name} searchable clearable
                    options={options || []}
                    placeholder={placeholder ? placeholder : `Select ${label || '...'} `}
                    className={cn(className, 'bg-white h-10 z-[99999] rounded-md mb-4')}
                    dropdownClassName="p-2 gap-1 grid z-[99999] capitalize"
                    // getOptionDisplayValue={(option) =>
                    //     useCustomDisplay ? renderOptionDisplayValue(option.label) : renderDefaultDisplay(option.label)
                    // }
                    // error={error?.[name]}
                    value={reduxSelect?.multiSelected}
                    onChange={handleChange}
                />) : <Skeleton height={40} />
            }
            {/* {disabled && (
                <span className='text-red-500 text-xs tracking-wide'>
                    This field cannot be edited
                </span>
            )} */}
        </div>
    )
}
