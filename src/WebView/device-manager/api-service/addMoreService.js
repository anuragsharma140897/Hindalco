import React from 'react'
import CustomInput from './component/custom-input'
import { AllApiCallHere } from './store/AllApiCallHere'
import { addApiService, updateApiService } from './constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setApiJson, setServiceMasterJson } from './store/Action/ServiceMasterAction';

function AddMoreService({ setModal, type }) {

    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const dispatch = useDispatch()

    const addService = () => {
        var json = {
            serviceName: ServiceMasterReducer?.apiJson?.serviceName,
            protocol: ServiceMasterReducer?.apiJson?.protocol
        }
        if (type !== 'add') {
            Object.assign(json, { _id: type?.[1] })
        }
        AllApiCallHere(json, type === 'add' ? addApiService : updateApiService).then(res => {
            console.log('res', res);
            if(res){
                dispatch(setApiJson({}))
                dispatch(setServiceMasterJson(null))
                setModal(false)
            }
        })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Service Name</h2>
            <CustomInput name='serviceName' />
            <CustomInput name='protocol' />
            <div className="flex justify-end">
                <button onClick={() => setModal(false)} className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
                <button onClick={() => addService()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddMoreService