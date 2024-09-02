import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApiJson } from '../store/Action/ServiceMasterAction';
import { AllApiCallHere } from '../store/AllApiCallHere';
import { updateApiService } from '../constants/constant';
import CustomInput from '../component/custom-input';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

const GlobalVariableForm = ({ selectedService }) => {
    const dispatch = useDispatch();
    const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
    const [showAlert, setShowAlert] = useState(false);
    const [globalVariables, setGlobalVariables] = useState([]);

    useEffect(() => {

        if (selectedService !== null) {
            dispatch(setApiJson({ valueName: '', data: '', dataType: 'String' }));
            setGlobalVariables(selectedService.globalVariables || []);
        }


    }, [selectedService, dispatch]);

    const handleDataTypeChange = (e) => {
        const oldJson = ServiceMasterReducer?.apiJson || {};
        dispatch(setApiJson({ ...oldJson, dataType: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVariable = {
            valueName: ServiceMasterReducer?.apiJson?.valueName || '',
            data: ServiceMasterReducer?.apiJson?.data || '',
            dataType: ServiceMasterReducer?.apiJson?.dataType || 'String'
        };

        const updatedVariables = [...globalVariables, newVariable];
        setGlobalVariables(updatedVariables);

        const updatedService = {
            _id: selectedService._id,
            globalVariables: updatedVariables
        };

        AllApiCallHere(updatedService, updateApiService).then(res => {
            setShowAlert(true);
            resetForm();
        }).catch(error => {
            console.error("API Error:", error);
        });
    };

    const resetForm = () => {
        dispatch(setApiJson({ valueName: '', data: '', dataType: 'String' }));
    };

    const handleDelete = (index) => {
        const updatedVariables = globalVariables.filter((_, i) => i !== index);
        setGlobalVariables(updatedVariables);

        const updatedService = {
            _id: selectedService._id,
            globalVariables: updatedVariables
        };

        AllApiCallHere(updatedService, updateApiService).then(res => {
            setShowAlert(true);
        }).catch(error => {
            console.error("API Error:", error);
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Global Variables</h2>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Add New Variable</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="valueName" className="block text-sm font-medium text-gray-700 mb-1">Value Name</label>
                        <CustomInput name="valueName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <CustomInput name="data" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
                        <select
                            id="dataType"
                            name="dataType"
                            value={ServiceMasterReducer?.apiJson?.dataType || 'String'}
                            onChange={handleDataTypeChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="String">String</option>
                            <option value="Integer">Integer</option>
                            <option value="Boolean">Boolean</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Add Variable
                    </button>
                </form>
            </div>
            {globalVariables.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Existing Variables</h3>
                    <div className="space-y-3">
                        {globalVariables.map((variable, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <span className="font-medium">{variable.valueName}:</span>
                                    <span className="ml-2">{variable.data}</span>
                                    <span className="ml-2 text-sm text-gray-500">({variable.dataType})</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}



            {showAlert && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p>The global variables have been successfully updated.</p>
                    <button
                        onClick={() => setShowAlert(false)}
                        className="ml-auto bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        OK
                    </button>
                </div>
            )}
        </div>
    );
};

export default GlobalVariableForm;