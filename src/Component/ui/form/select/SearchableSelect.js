import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { CompileSelectData } from './select-promiss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchableSelectData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';
import Skeleton from 'react-loading-skeleton';

export default function SearchableSelect({ label, important, api, name, error, disabled, getFieldName, onChange, limit, checkServerKey, checkServerValue, dynamicSearch, defaultValue }) {
  const [options, setOptions] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    if (api && options === null) {
      loadData();
    }
  }, [options]);

  const loadData = () => {
    if (api) {
      const json = { page: 1, limit: limit || 30, search: dynamicSearch || {} };
      console.log('json', json);
      HitApi(json, api).then((result) => {
        console.log('result', result);

        CompileSelectData(result?.content, getFieldName, checkServerKey, checkServerValue).then((CompiledData) => {
          console.log('CompiledData', CompiledData);
          if (CompiledData) {
            setOptions(CompiledData);
            dispatch(setSearchableSelectData(CompiledData))
          }
        });
      });
    }
  };


  return (
    <div className='mb-6'>
      <label className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</label>
      {options ? <Select
        name={name}
        className={`w-full text-lg 
            disabled:bg-gray-200
            ${error?.[name] ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
        disabled={disabled}
        options={options || []}
        {...(defaultValue && { defaultValue })}
        onChange={onChange}
      /> : <Skeleton height={40}/>}
      {disabled && <span className='text-red-500 text-xs tracking-wide'>This field cannot be edited</span>}
      {error?.[name] && <span className="text-red-500 text-sm mt-2 block">{error?.[name]}</span>}
    </div >
  )
}
