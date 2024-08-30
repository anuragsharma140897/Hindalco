import React, { useState } from 'react'
import CustomConfiguration from '../../../Component/configuration/custom-configuration'
import CustomButton from '../../../Component/ui/buttons/custom-button'

export default function Configuration() {
  const [input, setInput] = useState({ "page": 1 })
  const [output, setOutput] = useState()

  const handleSave = () => {

    console.log('output', output);

  }

  return (
    <div>
      <CustomConfiguration input={input} output={output} setOutput={setOutput} />
      <div className='my-4'>
        <CustomButton text={'Save Configuration'} onClick={handleSave} />
      </div>
    </div>
  )
}
