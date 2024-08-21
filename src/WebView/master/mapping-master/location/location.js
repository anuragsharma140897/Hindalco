import React, { useEffect, useState } from 'react'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaAngleRight, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../shared/modal-views/use-modal'
import useAlertController from '../../../../Hooks/use-alert-controller'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { mapping, searchLocation } from '../../../../Constant/Api/Api'
import { setSelectedMappingMasterJson, setSelectedMappingMasterLocationData } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import { setLocationMasterData } from '../../../../Store/Action/master/location-master/location-master-action'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'
import useDynamicLoading from '../../../../Hooks/use-dynamic-loading'
import { setDeviceReaderData } from '../../../../Store/Action/device/device-reader/device-reader-action'

export default function Location() {
  const dispatch = useDispatch()
  const reduxLocation = useSelector(state => state.LocationMasterReducer)
  const reduxLoading = useSelector(state => state.LoadingReducer)
  const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(null)
  const { showCustomAlert } = useAlertController();
  const { loadingState, setDynamicLoading } = useDynamicLoading();

  useEffect(() => {
    if (reduxMappingMaster?.mappingJson?.selectedZoneID !== null && reduxLocation?.doc === null) {
      loadData()
    }

    console.log('reduxLoading********', reduxLoading?.doc);

  }, [reduxMappingMaster])

  const loadData = () => {
    var json = {
      page: 1, limit: 50, search: {
        zoneIds: { $in: [reduxMappingMaster?.mappingJson?.selectedZoneID] },
        buildingIds: { $in: [reduxMappingMaster?.mappingJson?.selectedBuildingID] }
      }
    }
    console.log('laoding location data', json);
    HitApi(json, searchLocation).then((result) => {
      console.log('result location : ', result);
      if (result?.success !== false) {
        dispatch(setLocationMasterData(result))
      } else {
        dispatch(setLocationMasterData([]))
      }
    })
  }

  // dynamicSearch={{"buildingIds.1":{$exists:true}}}

  const handleClick = () => {
    openModal({
      view: <div className='p-10 h-96 flex flex-col justify-between'>
        <SearchableSelect name="zoneId" label="Zone" api={searchLocation} getFieldName={'value'} onChange={handleOnChange} dynamicSearch={{}} />
        <CustomButton title={'Add Location'} onClick={() => handleAddLocation()} />
      </div>
    })
  }

  const handleOnChange = (e) => {
    var json = reduxMappingMaster?.mappingJson
    const { id, label, value } = e
    console.log(id);
    Object.assign(json, { selectedLocationIdFromDropdown: id })
    dispatch(setSelectedMappingMasterJson(json))

  }

  const handleAddLocation = () => {
    var json = reduxMappingMaster?.mappingJson
    var locationToZoneMappingJson = {
      sourceId: json?.selectedZoneID,
      mappingId: json?.selectedLocationIdFromDropdown,
      "sourceCollection": "zoneCollection",
      "destinationCollection": "locationCollection",
      "source": "zoneIds",
      "mapping": "locationIds"
    }
    setDynamicLoading({ 'zone': true, 'location': true })
    HitApi(locationToZoneMappingJson, mapping).then((result) => {
      if (result?.success !== false) {
        closeModal()
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Location to Zone Mapping Successfully',
        });
        var locationToBuilginMappingJson = {
          sourceId: json?.selectedBuildingID,
          mappingId: json?.selectedLocationIdFromDropdown,
          "sourceCollection": "buildingCollection",
          "destinationCollection": "locationCollection",
          "source": "buildingIds",
          "mapping": "locationIds"
        }
        HitApi(locationToBuilginMappingJson, mapping).then((result) => {
          if (result?.success !== false) {
            showCustomAlert({
              type: 'success',
              title: 'Success!',
              message: 'Location to Building Mapping Successfully',
            });
            // laoding and closing modal
            setDynamicLoading({ 'zone': false, 'location': false })
            loadData()
          }
        })
      }
    })
  }

  const handleLocationClick = (ele) => {
    console.log('location ele : ', ele);
    var json = reduxMappingMaster?.mappingJson
    Object.assign(json, { selectedLocationID: ele?.id })
    dispatch(setDeviceReaderData(null))
    dispatch(setSelectedMappingMasterJson(json))
    dispatch(setSelectedMappingMasterLocationData(ele))
    console.log('handleZoneClick json', json);

    delete json?.selectedReaderID;
  }

  let item;
  if (reduxLocation?.doc !== null) {
    item = reduxLocation?.doc?.content?.map((ele, index) => {
      return <div key={index} className='group' onClick={() => handleLocationClick(ele)}>
        <div className={cn('py-3 px-2 my-1.5 shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer', ele?.id === reduxMappingMaster?.mappingJson?.selectedLocationID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
          <label className='group-hover:cursor-pointer'>{ele?.value}</label>
          <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
        </div>
      </div>
    })
  }


  return (
    <div>
      <Title as='h5'>Location</Title>
      <div>
        {loadingState?.doc?.location ? <CustomButton title={'Loading...'} /> : <CustomButton title={'Add Location'} LeftIcon={<FaPlus />} onClick={() => handleClick()} disabled={!reduxMappingMaster?.mappingJson?.selectedZoneID} />}
        <div>
          {item || 'No Data Found'}
        </div>
      </div>
    </div>
  )
}
