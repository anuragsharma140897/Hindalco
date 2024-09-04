import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { mapping, removeMapping, searchZone } from '../../../../Constant/Api/Api'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaAngleRight, FaPlus, FaTimes } from 'react-icons/fa'
import { useModal } from '../../../../shared/modal-views/use-modal'
import { setZoneMasterData } from '../../../../Store/Action/master/zone-master/zone-master-action'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { setMappingMasterZoneData, setSelectedMappingMasterJson, setSelectedMappingMasterZoneData } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import useAlertController from '../../../../Hooks/use-alert-controller'
import { setLocationMasterData } from '../../../../Store/Action/master/location-master/location-master-action'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'
import { setLoading } from '../../../../Store/Action/loading/loading-action'
import useDynamicLoading from '../../../../Hooks/use-dynamic-loading'


export default function Zone() {
  const dispatch = useDispatch()
  const reduxZone = useSelector(state => state.ZoneMasterReducer)
  const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(null)
  const { showCustomAlert } = useAlertController();
  const { loadingState, setDynamicLoading } = useDynamicLoading();

  useEffect(() => {
    if (reduxMappingMaster?.mappingJson?.selectedBuildingID !== null && reduxZone?.doc === null) {
      loadData()
    }
  }, [reduxZone, reduxMappingMaster])

  const loadData = () => {
    var json = { page: 1, limit: 5000, search: { buildingIds: { $in: [reduxMappingMaster?.mappingJson?.selectedBuildingID] } } }
    HitApi(json, searchZone).then((result) => {

      if (result?.success !== false) {
        dispatch(setZoneMasterData(result))
      }
    })
  }

  const handleOnChange = (e) => {
    var json = reduxMappingMaster?.mappingJson
    const { id, label, value } = e

    Object.assign(json, { selectedZoneIdFromDropdown: id })
    dispatch(setSelectedMappingMasterJson(json))

  }

  const handleAddZone = () => {
    var json = reduxMappingMaster?.mappingJson
    setDynamicLoading({ 'zone': true })
    var finalJson = {
      sourceId: json?.selectedBuildingID,
      mappingId: json?.selectedZoneIdFromDropdown,
      "sourceCollection": "buildingCollection",
      "destinationCollection": "zoneCollection",
      "source": "buildingIds",
      "mapping": "zoneIds"
    }


    HitApi(finalJson, mapping).then((result) => {
      if (result?.success !== false) {
        setDynamicLoading({ 'zone': false })
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Zone to Building Mapping Successfully',
        });
        // laoding and closing modal
        loadData()
        closeModal()
      }
    })
  }

  const handleRemove = (ele) => {
    var json = reduxMappingMaster?.mappingJson
    setDynamicLoading({ 'zone': true })
    var finalJson = {
      sourceId: json?.selectedBuildingID,
      mappingId: ele?.id,
      "sourceCollection": "buildingCollection",
      "destinationCollection": "zoneCollection",
      "source": "buildingIds",
      "mapping": "zoneIds"
    }


    HitApi(finalJson, removeMapping).then((result) => {
      if (result?.success !== false) {
        setDynamicLoading({ 'zone': false })
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Zone to Building Demapping Successfully',
        });
        // laoding and closing modal
        loadData()
        closeModal()
      }
    })
  }


  const handleZoneClick = (ele) => {

    var json = reduxMappingMaster?.mappingJson
    Object.assign(json, { selectedZoneID: ele?.id })
    dispatch(setLocationMasterData(null))
    dispatch(setSelectedMappingMasterJson(json))
    dispatch(setSelectedMappingMasterZoneData(ele))

    delete json?.selectedLocationID;
    delete json?.selectedReaderID;

  }

  const handleClick = () => {
    // dynamicSearch={{"buildingIds.1":{$exists:true}}}
    openModal({
      view: <div className='p-10 h-96 flex flex-col justify-between'>
        <SearchableSelect name="zoneId" label="Zone" api={searchZone} getFieldName={'value'} onChange={handleOnChange} />
        <CustomButton title={'Add Zone'} onClick={() => handleAddZone()} />
      </div>
    })
  }
  let item;
  if (reduxZone?.doc !== null) {
    item = reduxZone?.doc?.content?.map((ele, index) => {
      return <div key={index} className='group my-1.5'>
        <div className={cn('shadow-sm rounded-lg group-hover:cursor-pointer', ele?.id === reduxMappingMaster?.mappingJson?.selectedZoneID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
          <div className='flex justify-between'>
            <div className='flex items-center p-3 w-full' onClick={() => handleZoneClick(ele)}>
              <div><label className='group-hover:cursor-pointer'>{ele?.value}</label></div>
            </div>
            {ele?.locationIds?.length === 0 ? <div className='bg-red-main text-white flex items-center p-2 rounded-r-lg' onClick={() => handleRemove(ele)}>
              <label className='group-hover:cursor-pointer'><FaTimes /></label>
            </div> : null}
          </div>
        </div>
        <label className='group-hover:cursor-pointer'>{ele?.id}</label>
      </div>
    })
  }

  return (
    <div>
      <Title as='h5'>Zone</Title>
      <div>
        {loadingState?.doc?.zone ? <CustomButton title={'Loading...'} /> : <CustomButton title={'Add Zone'} LeftIcon={<FaPlus />} onClick={() => handleClick()} disabled={!reduxMappingMaster?.mappingJson?.selectedBuildingID} />}
        <div>
          {item || 'No Data Found'}
        </div>
      </div>
    </div>
  )
}
