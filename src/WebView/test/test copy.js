import React, { useState } from 'react'
import JsonEditor from '../../Component/ui/editor/json-editor'

export default function Test() {
  const [json, setJson] = useState({"page":1})

  const onChange = (value) =>{
    console.log('value', value);
  }

  return (
    <div><JsonEditor json={json} onChange={onChange}/></div>
  )
}
