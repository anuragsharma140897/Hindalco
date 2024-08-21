import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { mapping, searchZone } from '../../../../Constant/Api/Api'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaAngleRight, FaPlus } from 'react-icons/fa'
import { useModal } from '../../../../shared/modal-views/use-modal'
import { setZoneMasterData } from '../../../../Store/Action/master/zone-master/zone-master-action'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { setMappingMasterZoneData, setSelectedMappingMasterJson, setSelectedMappingMasterZoneData } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import useAlertController from '../../../../Hooks/use-alert-controller'
import { setLocationMasterData } from '../../../../Store/Action/master/location-master/location-master-action'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'


export default function Zone() {
  const dispatch = useDispatch()
  const reduxZone = useSelector(state => state.ZoneMasterReducer)
  const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(null)
  const { showCustomAlert } = useAlertController();

  useEffect(() => {
    if (reduxMappingMaster?.mappingJson?.selectedBuildingID !== null && reduxZone?.doc === null) {
      loadData()
    }
  }, [reduxZone, reduxMappingMaster])

  const loadData = () => {
    var json = { page: 1, limit: 50, search: { buildingIds: { $in: [reduxMappingMaster?.mappingJson?.selectedBuildingID] } } }
    console.log('laoding zone data', json);
    HitApi(json, searchZone).then((result) => {
      console.log('result', result);
      if (result?.success !== false) {
        dispatch(setZoneMasterData(result))
      }
    })
  }

  const handleOnChange = (e) => {
    var json = reduxMappingMaster?.mappingJson
    const { id, label, value } = e
    console.log(id);
    Object.assign(json, { selectedZoneIdFromDropdown: id })
    dispatch(setSelectedMappingMasterJson(json))

  }

  const handleAddZone = () => {
    var json = reduxMappingMaster?.mappingJson

    console.log('json', json);

    var finalJson = {
      sourceId: json?.selectedBuildingID,
      mappingId: json?.selectedZoneIdFromDropdown,
      "sourceCollection": "buildingCollection",
      "destinationCollection": "zoneCollection",
      "source": "buildingIds",
      "mapping": "zoneIds"
    }

    console.log('final hit json', finalJson);

    HitApi(finalJson, mapping).then((result) => {

      console.log('result', result);

      if (result?.success !== false) {
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Zone Mapping Added Successfully',
        });
      }
    })
  }

  const handleZoneClick = (ele) => {
    console.log('zone ele : ', ele);
    var json = reduxMappingMaster?.mappingJson
    Object.assign(json, { selectedZoneID: ele?.id })
    dispatch(setLocationMasterData(null))
    dispatch(setSelectedMappingMasterJson(json))
    dispatch(setSelectedMappingMasterZoneData(ele))

    delete json?.selectedLocationID;
    delete json?.selectedReaderID;
    console.log('handleZoneClick json', json);
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
      return <div key={index} className='group' onClick={() => handleZoneClick(ele)}>
        <div className={cn('py-3 px-2 my-1.5 shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer', ele?.id === reduxMappingMaster?.mappingJson?.selectedZoneID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
          <label className='group-hover:cursor-pointer'>{ele?.value}</label>
          <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
        </div>
      </div>
    })
  }

  return (
    <div>
      <Title as='h5'>Zone</Title>
      <div>
        <CustomButton title={'Add Zone'} LeftIcon={<FaPlus />} onClick={() => handleClick()} disabled={!reduxMappingMaster?.mappingJson?.selectedBuildingID} />
        <div>
          {item || 'No Data Found'}
        </div>
      </div>
    </div>
  )
}
