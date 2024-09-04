import React, { useEffect, useState } from 'react'
import { Badge, Select, Text } from 'rizzui'
import { STATUS_CLASSES } from '../../../../../Constant/Colors/Color';
import { setSearchableSelectSelectedData } from '../../../../../Store/Action/common/searcheable-select/searcheable-select-action';
import { useDispatch, useSelector } from 'react-redux';
import cn from '../../../../../Utils/class-names';


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

export default function CustomSelect({ name, className, placeholder, disabled, error, onChange, onClear, useCustomDisplay, label, options, searchable, reduxState, validate, setAction }) {
  const dispatch = useDispatch()
  const reduxSelect = useSelector(state => state.SearchableSelectReducer)
  const [selected, setSelected] = useState(null)

  const handleChange = (e) => {
    const { value, _id } = e;
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

  return (
    <div>
      <label className="block font-bold ">{label}</label>
      {
        options?.length > 0 && (<Select
          name={name}
          searchable={searchable === false ? false : true}
          clearable
          onClear={onClear}
          options={options || []}
          placeholder={placeholder ? placeholder : `Select ${name || '...'} `}
          className={cn(className, 'bg-white z-[99999] mb-1')}
          dropdownClassName="p-2 gap-1 grid z-[99999] capitalize"
          getOptionDisplayValue={(option) =>
            useCustomDisplay ? renderOptionDisplayValue(option.value) : renderDefaultDisplay(option.value)
          }
          value={reduxSelect?.selected?.find((Obj) => Obj.name === name)?.['value']}
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
