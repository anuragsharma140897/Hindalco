import React, { useEffect, useState } from 'react'
import { Badge, Select, Text } from 'rizzui'
import cn from '../../../../Utils/class-names'
import { CompileSelectData } from './select-promiss';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { STATUS_CLASSES } from '../../../../Constant/Colors/Color';
import { setSearchableSelectData, setSearchableSelectSelectedData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';
import { useDispatch, useSelector } from 'react-redux';


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




export default function SearchableSelect({ api, name, className, dynamicSearch, limit, getFieldName, type, placeholder, disabled, error, onChange, useCustomDisplay ,label, defaultOptions}) {
  const dispatch = useDispatch()
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const [options, setOptions] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (api && options === null && !defaultOptions) {
      loadData();
    }else{
      if(defaultOptions!==null){
        setOptions(defaultOptions)
      }
    }


  }, [options, reduxSelect]);

  const loadData = () => {
    if (api) {
      const json = { page: 1, limit: limit || 30, search: dynamicSearch || {} };
      HitApi(json, api).then((result) => {
        CompileSelectData(result?.content, getFieldName, type).then((CompiledData) => {
          console.log('CompiledData', CompiledData);
          if (CompiledData) {
            setOptions(CompiledData);
            dispatch(setSearchableSelectData(CompiledData));
          }
        });
      });
    }
  };

  const handleChange = (e) => {
    const { value, id } = e;
    const updatedSelected = reduxSelect?.selected.map(item =>
      item.name === name ? { ...item, value } : item
    );
    
    if (!updatedSelected.some(item => item.name === name)) {
      updatedSelected.push({ name, value });
    }

    dispatch(setSearchableSelectSelectedData(updatedSelected));

    if (onChange) onChange(e);
    setSelected(value);
  };

  const onClear = () =>{
    var json = reduxSelect?.selected
    const existingIndex = reduxSelect?.selected?.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
        const updatedSelected = reduxSelect?.selected.filter(item => item.name !== name);
        dispatch(setSearchableSelectSelectedData(updatedSelected));
        delete json?.search?.[name]
    }

  }

  console.log('reduxSelect?.selected', reduxSelect?.selected);
 
  return (
    <div>
      { label && <div className='block font-bold mt-2'>{label}</div> }
      {
        options?.length > 0 && (<Select
          name={name}
          searchable
          clearable
          onClear={onClear}
          options={options || []}
          placeholder={placeholder ? placeholder : `Select ${name || '...'} `}
          className={cn(className, 'bg-white z-[99999]')}
          dropdownClassName="p-2 gap-1 grid !z-0 capitalize"
          getOptionDisplayValue={(option) =>
            useCustomDisplay?renderOptionDisplayValue(option.label) : renderDefaultDisplay(option.label)
          }
          value={reduxSelect?.selected?.find((Obj) => Obj.name === name)?.['name']}
          onChange={handleChange}
        />)
      }
      {disabled && (
        <span className='text-red-500 text-xs tracking-wide'>
          This field cannot be edited
        </span>
      )}
      {error?.[name] && (
        <span className="text-red-500 text-sm mt-2 block">
          {error?.[name]}
        </span>
      )}
    </div>
  )
}
