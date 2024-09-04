import React, { useState, useEffect } from 'react'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { FaAngleRight, FaPlus, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../shared/modal-views/use-modal'
import useAlertController from '../../../../Hooks/use-alert-controller'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect'
import { mapping, removeMapping, searchReader } from '../../../../Constant/Api/Api'
import { setSelectedMappingMasterJson, setSelectedMappingMasterReaderData } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import { setDeviceReaderData } from '../../../../Store/Action/device/device-reader/device-reader-action'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'
import useDynamicLoading from '../../../../Hooks/use-dynamic-loading'



export default function Reader() {
  const dispatch = useDispatch()
  const reduxReader = useSelector(state => state.DeviceReaderReducer)
  const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)
  const { openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(null)
  const { showCustomAlert } = useAlertController();
  const { loadingState, setDynamicLoading } = useDynamicLoading();

  useEffect(() => {
    if (reduxMappingMaster?.mappingJson?.selectedLocationID !== null && reduxReader?.doc === null) {
      loadData()
    }

  }, [reduxMappingMaster])

  const loadData = () => {
    var json = {
      page: 1, limit: 50, search: {
        locationIds: { $in: [reduxMappingMaster?.mappingJson?.selectedLocationID] },
        zoneIds: { $in: [reduxMappingMaster?.mappingJson?.selectedZoneID] },
        buildingIds: { $in: [reduxMappingMaster?.mappingJson?.selectedBuildingID] }
      },

    }

    HitApi(json, searchReader).then((result) => {

      if (result?.success !== false) {
        dispatch(setDeviceReaderData(result))
      } else {
        dispatch(setDeviceReaderData([]))
      }
    })
  }

  const handleOnChange = (e) => {
    var json = reduxMappingMaster?.mappingJson
    const { _id, label, value } = e

    Object.assign(json, { selectedReaderIdFromDropdown: _id })
    dispatch(setSelectedMappingMasterJson(json))
  }

  const handleClick = () => {
    openModal({
      view: <div className='p-10 h-96 flex flex-col justify-between'>
        <SearchableSelect name="readerId" label="Reader" api={searchReader} getFieldName={'placementName'} onChange={handleOnChange} dynamicSearch={{}} />
        <CustomButton title={'Add Reader'} onClick={() => handleAddReader()} />
      </div>
    })
  }

  const handleAddReader = () => {
    var json = reduxMappingMaster?.mappingJson
    var readerToLocationMappingJson = {
      sourceId: json?.selectedLocationID,
      mappingId: json?.selectedReaderIdFromDropdown,
      "sourceCollection": "locationCollection",
      "destinationCollection": "readerCollection",
      "source": "locationIds",
      "mapping": "readerIds"
    }
    setDynamicLoading({ 'zone': true, 'location': true, 'reader': true })

    HitApi(readerToLocationMappingJson, mapping).then((readerToLocationMappingResult) => {

      if (readerToLocationMappingResult?.success !== false) {
        var readerToZoneMappingJson = {
          sourceId: json?.selectedZoneID,
          mappingId: json?.selectedReaderIdFromDropdown,
          "sourceCollection": "zoneCollection",
          "destinationCollection": "readerCollection",
          "source": "zoneIds",
          "mapping": "readerIds"
        }
        showCustomAlert({
          type: 'success',
          title: 'Success!',
          message: 'Reader to Location Mapping Successfully',
        });

        HitApi(readerToZoneMappingJson, mapping).then((readerToZoneMappingREsult) => {


          if (readerToZoneMappingREsult?.success !== false) {
            var readerToBuildingMappingJson = {
              sourceId: json?.selectedBuildingID,
              mappingId: json?.selectedReaderIdFromDropdown,
              "sourceCollection": "buildingCollection",
              "destinationCollection": "readerCollection",
              "source": "buildingIds",
              "mapping": "readerIds"
            }
            showCustomAlert({
              type: 'success',
              title: 'Success!',
              message: 'Reader to Zone Mapping Successfully',
            });

            HitApi(readerToBuildingMappingJson, mapping).then((readerToBuildingMappingResult) => {

              if (readerToBuildingMappingResult?.success !== false) {
                showCustomAlert({
                  type: 'success',
                  title: 'Success!',
                  message: 'Reader to Building Mapping Successfully',
                });
                // laoding and closing modal
                setDynamicLoading({ 'zone': false, 'location': false, 'reader': false })
                closeModal()
                loadData()
              } else {

              }
            })
          } else {

          }
        })
      } else {

      }
    })
  }

  const handleRemove = (ele) => {
    var r = window.confirm('Are you sure to demap?')
    if (r) {
      var json = reduxMappingMaster?.mappingJson
      var readerToLocationMappingJson = {
        sourceId: json?.selectedLocationID,
        mappingId: ele?._id,
        "sourceCollection": "locationCollection",
        "destinationCollection": "readerCollection",
        "source": "locationIds",
        "mapping": "readerIds"
      }

      setDynamicLoading({ 'zone': true, 'location': true, 'reader': true })
      HitApi(readerToLocationMappingJson, removeMapping).then((readerToLocationMappingResult) => {

        if (readerToLocationMappingResult?.success !== false) {
          var readerToZoneMappingJson = {
            sourceId: json?.selectedZoneID,
            mappingId: ele?._id,
            "sourceCollection": "zoneCollection",
            "destinationCollection": "readerCollection",
            "source": "zoneIds",
            "mapping": "readerIds"
          }
          showCustomAlert({
            type: 'success',
            title: 'Success!',
            message: 'Reader to Location Demapping Successfully',
          });

          HitApi(readerToZoneMappingJson, removeMapping).then((readerToZoneMappingREsult) => {

            if (readerToZoneMappingREsult?.success !== false) {
              var readerToBuildingMappingJson = {
                sourceId: json?.selectedBuildingID,
                mappingId: ele?._id,
                "sourceCollection": "buildingCollection",
                "destinationCollection": "readerCollection",
                "source": "buildingIds",
                "mapping": "readerIds"
              }
              showCustomAlert({
                type: 'success',
                title: 'Success!',
                message: 'Reader to Zone Demapping Successfully',
              });

              HitApi(readerToBuildingMappingJson, removeMapping).then((readerToBuildingMappingResult) => {

                if (readerToBuildingMappingResult?.success !== false) {
                  showCustomAlert({
                    type: 'success',
                    title: 'Success!',
                    message: 'Reader to Building Demapping Successfully',
                  });
                  // laoding and closing modal
                  setDynamicLoading({ 'zone': false, 'location': false, 'reader': false })
                  // closeModal()
                  loadData()
                } else {

                }
              })
            } else {

            }
          })
        } else {

        }
      })

    }
  }

  const handleReaderClick = (ele) => {

    var json = reduxMappingMaster?.mappingJson
    Object.assign(json, { selectedReaderID: ele?._id })
    dispatch(setSelectedMappingMasterJson(json))
    dispatch(setSelectedMappingMasterReaderData(ele))
  }

  let item;
  if (reduxReader?.doc !== null) {
    item = reduxReader?.doc?.content?.map((ele, index) => {
      return <div key={index} className='group mt-1.5' >
        <div className={cn('shadow-sm rounded-lg group-hover:cursor-pointer', ele?._id === reduxMappingMaster?.mappingJson?.selectedReaderID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
          <div className='flex justify-between'>
            <div className='flex items-center p-3 w-full' onClick={() => handleReaderClick(ele)}>
              <div><label className='group-hover:cursor-pointer'>Reader : {ele?.placementName}</label></div>
            </div>
            <div className='bg-red-main text-white flex items-center p-2 rounded-r-lg' onClick={() => handleRemove(ele)}>
              <label className='group-hover:cursor-pointer'><FaTimes /></label>
            </div>
          </div>
        </div>
      </div>
    })
  }


  return (
    <div>
      <Title as='h5'>Reader</Title>
      <div>
        {loadingState?.doc?.reader ? <CustomButton title={'Loading...'} /> : <CustomButton title={'Add Reader'} LeftIcon={<FaPlus />} onClick={handleClick} disabled={!reduxMappingMaster?.mappingJson?.selectedBuildingID} />}
        <div>
          {item || 'No Data Found'}
        </div>
      </div>
    </div>
  )
}
