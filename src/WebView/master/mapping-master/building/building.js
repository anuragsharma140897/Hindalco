import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBuildingMasterData } from '../../../../Store/Action/master/building-master/building-master-action'
import { CompileBuildingMaster } from '../../buildings-master/promiss/building-master.promiss'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { searchBuilding } from '../../../../Constant/Api/Api'
import { FaAngleRight, FaPlus } from 'react-icons/fa'
import { setMappingMasterZoneData, setSelectedMappingMasterBuildingData, setSelectedMappingMasterJson } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { setZoneMasterData } from '../../../../Store/Action/master/zone-master/zone-master-action'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'

export default function Building() {
    const dispatch = useDispatch()
    const reduxBuilding = useSelector(state => state.BuildingMasterReducer)
    const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)

    useEffect(() => {
        if (reduxBuilding?.doc === null) {
            loadData()
        }

    }, [reduxBuilding])

    const loadData = () => {
        var json = reduxBuilding?.searchJson
        console.log('json builgin', json);
        HitApi(json, searchBuilding).then((result) => {
            console.log('result', result);
            if (result?.success !== false) {
                CompileBuildingMaster(result).then((CompiledData) => {
                    dispatch(setBuildingMasterData(CompiledData))
                })
            }
        })
    }

    const handleClick = (ele) => {
        console.log('building ele : ', ele);
        var json = reduxMappingMaster?.mappingJson
        Object.assign(json, { selectedBuildingID: ele?.id })
        dispatch(setZoneMasterData(null))
        dispatch(setSelectedMappingMasterJson(json))
        dispatch(setSelectedMappingMasterBuildingData(ele))

        delete json?.selectedZoneID;
        delete json?.selectedLocationID;
        delete json?.selectedReaderID;


    }

    let item;
    if (reduxBuilding?.doc !== null) {
        item = reduxBuilding?.doc?.content?.map((ele, index) => {
            return <div key={index} className='group' onClick={() => handleClick(ele)}>
                <div className={cn('py-3 px-2 my-1.5 shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer', ele?.id === reduxMappingMaster?.mappingJson?.selectedBuildingID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
                    <label className='group-hover:cursor-pointer'>{ele?.buildingName}</label>
                    <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
                </div>
            </div>
        })
    }

    return (
        <div>
            <div className='h-[4.3rem]'><Title as='h5'>Buildings</Title></div>
            <div>
                {item || 'No Data Found'}
            </div>
        </div>
    )
}
