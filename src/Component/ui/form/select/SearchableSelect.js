import React, { useEffect, useState } from 'react'
import { Badge, Select, Text } from 'rizzui'
import cn from '../../../../Utils/class-names'
import { CompileSelectData } from './select-promiss';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { STATUS_CLASSES } from '../../../../Constant/Colors/Color';
import { setSearchableSelectData, setSearchableSelectSelectedData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

function renderOptionDisplayValue(value) {
  // Check if value is neither null nor undefined and convert to lowercase, otherwise keep as is
  const lowerCaseValue = value != null ? value.toString().toLowerCase() : value;
  
  // Get the corresponding status class or fallback to the default class
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

export default function SearchableSelect({ api, name, className, dynamicSearch, limit, getFieldName, type, placeholder, disabled, error, onChange, useCustomDisplay, label, reduxState, defaultOptions }) {
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
          console.log('CompiledData', CompiledData);
          if (CompiledData) {
            setOptions(CompiledData);
            dispatch(setSearchableSelectData(result?.content));
          }
        });
      });
    }
  };

  const handleChange = (e) => {
    const { value, _id, label } = e;

    console.log('e', e);

    const updatedSelected = reduxSelect?.selected.map(item =>
      item.name === name ? { ...item, value, label } : item
    );

    if (!updatedSelected.some(item => item.name === name)) {
      updatedSelected.push({ name, value, label });
    }

    dispatch(setSearchableSelectSelectedData(updatedSelected));

    if (onChange) onChange(e);
    setSelected(value);
  };

  const onClear = () => {
    var json = reduxSelect?.selected
    const existingIndex = reduxSelect?.selected?.findIndex(item => item.name === name);
    if (existingIndex !== -1) {
      const updatedSelected = reduxSelect?.selected.filter(item => item.name !== name);
      dispatch(setSearchableSelectSelectedData(updatedSelected));
      delete json?.search?.[name]
      if (reduxState) { delete reduxState?.[name] }
    }

  }


  return (
    <div>
      {label && <div className='block font-bold mb-1'>{label}</div>}
      {
        options?.length > 0 ? (<Select name={name} searchable clearable onClear={onClear}
          options={options || []}
          placeholder={placeholder ? placeholder : `Select ${label || '...'} `}
          className={cn(className, 'bg-white h-10 z-[99999] rounded-md mb-4')}
          dropdownClassName="p-2 gap-1 grid z-[99999] capitalize"
          getOptionDisplayValue={(option) =>
            useCustomDisplay ? renderOptionDisplayValue(option.label) : renderDefaultDisplay(option.label)
          }
          error={error?.[name]}

          value={reduxSelect?.selected?.find((Obj) => Obj.name === name)?.['label']}
          onChange={handleChange}
        />) : <Skeleton height={40} />
      }
      {disabled && (
        <span className='text-red-500 text-xs tracking-wide'>
          This field cannot be edited
        </span>
      )}
    </div>
  )
}
