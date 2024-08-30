import React, { useState } from 'react'
import useValidation from '../../../Hooks/useValidation';
import CustomMapper from '../../../Component/mapper/custom-mapper';

const usedBy = [
  { id: 0, label: 'device', value: 'device' },
  { id: 0, label: 'gps', value: 'gps' },
  { id: 0, label: 'reader', value: 'reader' },
]
export default function Mapper() {
  const [input, setInput] = useState({"page":1})
  const [mapping, setMapping] = useState({"page":"page"})
  const [output, setOutput] = useState()

  console.log('output', output);

  return (
    <div>
      <div><CustomMapper input={input} mapping={mapping} setOutput={setOutput} output={output} /></div>
    </div>
  )
}
