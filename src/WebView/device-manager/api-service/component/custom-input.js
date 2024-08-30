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
      className="w-full p-2 border rounded mb-4 placeholder-black"
      placeholder="Enter Protocol"
    />
  )
}
