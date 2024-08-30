import React from 'react'
import CustomInput from './component/custom-input'
import { Search, Trash2 } from 'lucide-react'

function ApiRequest() {

    const onClickSend = () => {

    }

    return (
        <div>
            <div className="p-4 bg-white rounded-lg shadow-md grid grid-cols-12 gap-3">
                <select className="col-span-1 block w-max rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                </select>
                <div className='col-span-10'>
                    <CustomInput name='url' />
                </div>
                <button className="text-white font-bold col-span-1 bg-blue-400 items-center text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onClick={() => onClickSend()}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default ApiRequest