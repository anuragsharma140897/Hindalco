import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { mapping, searchGeneral, searchZone } from '../../../../Constant/Api/Api'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaAngleRight, FaPlus } from 'react-icons/fa'
import AddScreen from '../AddScreen'
import { useModal } from '../../../../shared/modal-views/use-modal'
import { setZoneMasterData } from '../../../../Store/Action/master/zone-master/zone-master-action'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { setMappingMasterZoneData, setSelectedMappingMasterJson } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import useAlertController from '../../../../Hooks/use-alert-controller'


export default function Zone() {
  const dispatch = useDispatch()
  const reduxZone = useSelector(state => state.ZoneMasterReducer)
  const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(null)
  const { showCustomAlert } = useAlertController();

  useEffect(() => {
    if (reduxMappingMaster?.building !== null && reduxMappingMaster?.zoneData === null) {
      loadData()
    }

  }, [reduxZone, reduxMappingMaster])

  const loadData = () => {
    var json = { page: 1, limit: 50, search: { buildingIds: { $in: [reduxMappingMaster?.building?.id] } } }
    console.log('laoding zone data', json);
    HitApi(json, searchZone).then((result) => {
      console.log('result', result);
      if (result?.success !== false) {
        dispatch(setMappingMasterZoneData(result))
      }
    })
  }

  const handleOnChange = (e) => {
    var json = reduxMappingMaster?.mappingJson
    const { id, label, value } = e
    Object.assign(json, { mappingId: id })
    dispatch(setSelectedMappingMasterJson(json))
  }

  const handleAddZone = () => {
    var json = reduxMappingMaster?.mappingJson
    Object.assign(json, {
      "sourceCollection": "buildingMaster",
      "destinationCollection": "zoneMaster",
      "source": "buildingIds",
      "mapping": "zoneIds"
    })

    HitApi(json, mapping).then((result) => {

      console.log('result', result);

      if (result?.success !== false) {
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Zone Mapping Added Successfully', 
        });
      }
    })

    console.log('json', json);
  }

  const handleClick = () => {
    openModal({
      view: <div className='p-10 h-96 flex flex-col justify-between'>
        <SearchableSelect name="zoneId" label="Zone" api={searchZone} getFieldName={'value'} onChange={handleOnChange} />
        <CustomButton title={'Add Zone'} onClick={() => handleAddZone()} />
      </div>
    })
  }
  let item;
  if (reduxMappingMaster?.zoneData !== null) {
    item = reduxMappingMaster?.zoneData?.content?.map((ele, index) => {
      return <div key={index} className='group' onClick={() => handleClick(ele)}>
        <div className='py-3 px-2 bg-white my-1.5 shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer'>
          <label className='group-hover:cursor-pointer'>Zone : {ele?.value}</label>
          <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
        </div>
      </div>
    })
  }


  return (
    <div>
      <CustomButton title={'Add Zone'} LeftIcon={<FaPlus />} onClick={() => handleClick()} disabled={!reduxMappingMaster?.building?.id} />
      {item}
    </div>
  )
}
