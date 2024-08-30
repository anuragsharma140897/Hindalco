import React from 'react'
import { setApiJson } from '../Store/Action/ServiceMasterAction';
import { useDispatch, useSelector } from 'react-redux';

export default function CustomInput({ name }) {

  const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
  const dispatch = useDispatch()

  const onChange = (value) => {
    var oldJson = ServiceMasterReducer?.apiJson
    oldJson[name] = value
    dispatch(setApiJson(oldJson))
  }

  return (
    <input
      type="text"
      value={ServiceMasterReducer?.apiJson?.[name]}
      onChange={(e) => onChange(e.target.value)}
      className="w-full block rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder="Enter Protocol"
    />
  )
}
