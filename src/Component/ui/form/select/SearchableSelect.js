import React, { useEffect, useState } from 'react'
import Select, { components } from 'react-select';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';
import { CompileSelectData } from './select-promiss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchableSelectData } from '../../../../Store/Action/common/searcheable-select/searcheable-select-action';
import Skeleton from 'react-loading-skeleton';
import cn from '../../../../Utils/class-names';
import { STATUS_CLASSES } from '../../../../Constant/Colors/Color';
import { Badge, Text } from 'rizzui';

// Custom components for react-select
const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      {renderOptionDisplayValue(props.data.label)}
    </components.Option>
  );
};

const CustomSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      {renderDefaultDisplay(props.data.label)}
    </components.SingleValue>
  );
};

export default function SearchableSelect({ type, label, important, api, name, error, disabled, getFieldName, onChange, limit, dynamicSearch, defaultValue, className, hide}) {
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
      HitApi(json, api).then((result) => {
        CompileSelectData(result?.content, getFieldName, type).then((CompiledData) => {
          if (CompiledData) {
            setOptions(CompiledData);
            dispatch(setSearchableSelectData(CompiledData))
          }
        });
      });
    }
  };

  return (
    <>
      {
        !hide && <div className='mb-2'>
          <label className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</label>
          {options ? <Select
            name={name}
            className={cn(className, `w-full text-lg capitalize 
              disabled:bg-gray-200
              ${error?.[name] ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'}`)}
            disabled={disabled}
            options={options || []}
            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
            {...(defaultValue && { defaultValue })}
            onChange={onChange}
            // styles={{
            //   control: (base, state) => ({
            //     ...base,
            //     backgroundColor: disabled ? 'bg-gray-200' : 'white',
            //     borderColor: error?.[name] ? 'red' : base.borderColor,
            //     '&:hover': { borderColor: error?.[name] ? 'red' : base.borderColor },
            //   }),
            //   option: (base) => ({
            //     ...base,
            //     display: 'flex',
            //     alignItems: 'center',
            //   }),
            // }}
          /> : <Skeleton height={40} />}
          {disabled && <span className='text-red-500 text-xs tracking-wide'>This field cannot be edited</span>}
          {error?.[name] && <span className="text-red-500 text-sm mt-2 block">{error?.[name]}</span>}
        </div >
      }
    </>
  )
}

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
