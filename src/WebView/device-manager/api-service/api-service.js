import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronRight, Folder, File, PlusCircle, EllipsisVertical, Plus, Edit, Trash2 } from 'lucide-react';
import { setApiJson, setServiceMasterJson } from './Store/Action/ServiceMasterAction';
import { AllApiCallHere } from './Store/AllApiCallHere';
import { deleteApiService, searchApiService } from './constants/constant';
import AddMoreService from './addMoreService';
import ApiRequest from './ApiRequest';

export default function ApiService() {
  const ServiceMasterReducer = useSelector(state => state.ServiceMasterReducer);
  const [openServices, setOpenServices] = useState({});
  const dispatch = useDispatch()
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [addMoreServiceModal, setAddMoreServiceModal] = useState(false);
  const [dataForRequest, setDataForRequest] = useState(false);
  

  useEffect(() => {
    if (ServiceMasterReducer?.doc === null) {
      getApiService()
    }
  }, [ServiceMasterReducer])

  const getApiService = () => {
    var json = {
      page: 1,
      limit: 10,
      search: {

      }
    }
    AllApiCallHere(json, searchApiService).then(res => {
      if (res?.content?.length > 0) {
        dispatch(setServiceMasterJson(res?.content))
      }
    })
  }

  const toggleService = (index) => {
    setOpenServices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const togglePopup = (index) => {
    setOpenPopupIndex(openPopupIndex === index ? null : index);
  };

  const handleAddNewRequest = (i,index) => {
    setDataForRequest([i,index])
    setOpenPopupIndex(null);
  };

  const handleDeleteService = (id) => {
    var confirm = window.confirm('Are you sure to delete this service')
    if (confirm) {
      var json = {
        _id: id
      }
      AllApiCallHere(json, deleteApiService).then(res => {
        dispatch(setServiceMasterJson(null))
      })
    }
    setOpenPopupIndex(null);
  };

  const editServiceClick = (object) => {
    var oldJson = ServiceMasterReducer?.apiJson
    oldJson.protocol = object.protocol
    oldJson.serviceName = object.serviceName
    dispatch(setApiJson(oldJson))
    setAddMoreServiceModal(object?.type)
  }

  return (
    <div className="grid grid-cols-12 gap-2 h-screen">
      <div className="col-span-3 bg-gray-100 p-4 overflow-y-auto">
        <div className='flex justify-between bg-white shadow-md items-center p-2 rounded-xl mb-5'>
          <h2 className="text-xl font-semibold text-gray-700">
            Services
          </h2>
          <PlusCircle onClick={() => setAddMoreServiceModal('add')} />
        </div>
        {ServiceMasterReducer?.doc?.map((ele, i) => (
          <div key={i} className="mb-2">
            <div
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded justify-between"
              onClick={() => toggleService(i)}
            >
              <div className='flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded'>
                {openServices[i] ? (
                  <ChevronDown className="w-4 h-4 mr-2 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-600" />
                )}
                <Folder className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="text-gray-700 font-medium">{ele?.serviceName}</span>
              </div>
              <div className="relative">
                <EllipsisVertical
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePopup(i);
                  }}
                />
                {openPopupIndex === i && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleAddNewRequest(i)}
                      >
                        <Plus className="mr-2" size={16} />
                        Add New Request
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => editServiceClick({ type: ['edit', ele?._id], serviceName: ele?.serviceName, protocol: ele?.protocol })}
                      >
                        <Edit className="mr-2" size={16} />
                        Edit Service Name
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleDeleteService(ele?._id)}
                      >
                        <Trash2 className="mr-2" size={16} />
                        Delete Service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {openServices[i] && (
              <div className="ml-6 mt-1">
                {ele?.requests?.map((item, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-gray-200 rounded" onClick={()=>handleAddNewRequest(i,index)}>
                    <File className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 text-sm">{item?.requestName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="col-span-9 bg-white p-4 shadow-md rounded-xl">
        <ApiRequest dataForRequest={dataForRequest}/>
      </div>

      {
        addMoreServiceModal === 'add' || addMoreServiceModal?.[0] === 'edit' ?
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <AddMoreService setModal={setAddMoreServiceModal} type={addMoreServiceModal === 'add' ? 'add' : addMoreServiceModal} />
          </div>
          :
          ''
      }

    </div>
  );
}