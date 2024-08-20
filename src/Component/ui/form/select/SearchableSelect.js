import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import cn from '../../../../Utils/class-names';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { CompileSelectData } from './select-promiss';
import { useDispatch } from 'react-redux';

export default function SearchableSelect({
  api,
  serverKey ,
  serverValue = null,
  getFieldName = 'id',
  label,
  name,
  limit,
  onChange,
  reduxState,
  setAction,
  validate,
  disabled,
  important,
  error
}) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (api && options === null) {
      loadData();
    }
  }, [options]);

  const loadData = () => {
    if (api) {
      const json = { page: 1, limit: limit || 30, search: {} };
      HitApi(json, api).then((result) => {
        CompileSelectData(result?.content, serverKey, serverValue, getFieldName).then((CompiledData) => {
          if (CompiledData) {
            setOptions(CompiledData);
          }
        });
      });
    }
  };

  const handleChange = (selectedOption) => {
    const { value } = selectedOption || {};
    // Automatically insert the selected value (e.g., ID) into the Redux state
    let updatedJson = { ...reduxState };
    updatedJson[name] = value; // This assumes 'value' is the ID or relevant data



    dispatch(setAction(updatedJson));
    // Validate the current field (if needed)
    if (validate) validate({ ...updatedJson });
    // If a custom onChange handler is provided, call it
    if (onChange) onChange(selectedOption, updatedJson);
  };

  return (
    <div className="mb-6">
      <label className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</label>
      <Select
        name={name}
        className={`w-full text-lg 
            disabled:bg-gray-200
            ${error?.[name] ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
        disabled={disabled}
        options={options || []}
        onChange={handleChange}
      />
      {disabled && <span className='text-red-500 text-xs tracking-wide'>This field cannot be edited</span>}
      {error?.[name] && <span className="text-red-500 text-sm mt-2 block">{error?.[name]}</span>}
    </div>
  );
}
