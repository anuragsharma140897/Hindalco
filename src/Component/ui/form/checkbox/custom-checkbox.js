// import React from 'react'
// import { Checkbox, Title } from 'rizzui'

// export default function CustomCheckBox({register, fieldName, errors}) {

//   return (
//     <div>
//       <div><label className='rizzui-input-label block text-base mb-2 font-medium'>Empty Bag Status</label></div>
//       <div className='mt-2 flex items-center'>
//         <Checkbox label="Add Empty Bag" {...register(fieldName || 'dummyData')} error={errors?.[fieldName]?.message} />
//       </div>
//     </div>
//   )
// }


import React from 'react';
import { useMedia } from '../../../../Hooks/use-media';
import cn from '../../../../Utils/class-names';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'rizzui';

export default function CustomCheckBox({ name, label, onChange, error, placeholder, reduxState, setAction, important, disabled }) {
  const dispatch = useDispatch()
  const isMedium = useMedia('(max-width: 1200px)', false);

  // Fetch the value from reduxState using the name prop
  const value = reduxState?.[name] || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the Redux state dynamically
    let updatedJson = { ...reduxState };
    updatedJson[name] = value;
    dispatch(setAction(updatedJson));
    // Validate the current field (if needed)
    if (onChange) onChange(e); // Calls the parent onChange handler if provided
  };

  return (
    <div className="mb-6">
      <label className="block font-bold mb-2">{label}{important === false ? '(Optional)' : ''}</label>
      <div className='mt-2 flex items-center'>
        <Checkbox label="Add Empty Bag" name={name} value={value} onChange={handleChange}  />
      </div>

      {/* <input 
                type="text" 
                name={name} 
                value={value} 
                onChange={handleChange} 
                placeholder={placeholder || `Enter ${label} ${important === false?'(Optional)':''}`} 
                style={{ border: error?.[name] ? '2px solid red' : '1px solid #ccc', outline: 'none' }}
                className={`w-full p-3 text-lg rounded-lg border 
                disabled:bg-gray-200
                ${error?.[name] ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                disabled={disabled}
            /> */}
      {disabled ? <span className='text-red-500 text-xs tracking-wide'>This field cannot be edited</span> : null}
      {error?.[name] && <span className="text-red-500 text-sm mt-2 block">{error?.[name]}</span>}
    </div>
  );
}
