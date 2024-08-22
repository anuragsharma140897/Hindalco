import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBuildingMasterData } from '../../../../Store/Action/master/building-master/building-master-action'
import { CompileBuildingMaster } from '../../buildings-master/promiss/building-master.promiss'
import { HitApi } from '../../../../Store/Action/Api/ApiAction'
import { searchBuilding, searchSite } from '../../../../Constant/Api/Api'
import { FaAngleRight, FaPlus } from 'react-icons/fa'
import { setMappingMasterZoneData, setSelectedMappingMasterBuildingData, setSelectedMappingMasterJson } from '../../../../Store/Action/master/mapping-master/mapping-master-action'
import CustomButton from '../../../../Component/ui/form/button/custom-button'
import { setZoneMasterData } from '../../../../Store/Action/master/zone-master/zone-master-action'
import cn from '../../../../Utils/class-names'
import { Title } from 'rizzui'
import { setSiteMasterData } from '../../../../Store/Action/master/site-master/site-master-action'

export default function Site() {
    const dispatch = useDispatch()
    const reduxSite = useSelector(state => state.SiteMasterReducer)
    const reduxMappingMaster = useSelector(state => state.MappingMasterReducer)

    useEffect(() => {
        if (reduxSite?.doc === null) {
            loadData()
        }

    }, [reduxSite])

    const loadData = () => {
        var json = reduxSite?.searchJson
        console.log('json builgin', json);
        HitApi(json, searchSite).then((result) => {
            console.log('result', result);
            if (result?.success !== false) {
                CompileBuildingMaster(result).then((CompiledData) => {
                    dispatch(setSiteMasterData(CompiledData))
                })
            }
        })
    }

    let item;
    if (reduxSite?.doc !== null) {
        item = reduxSite?.doc?.content?.map((ele, index) => {
            return <div key={index} className='group'>
                <div className={cn('py-3 px-2 my-1.5 shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer', true ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
                    <label className='group-hover:cursor-pointer'>{ele?.siteName}</label>
                    <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
                </div>
            </div>
        })
    }

    return (
        <div>
            <div className='h-[4.3rem]'><Title as='h5'>Site</Title></div>
            <div>
                {item || 'No Data Found'}
            </div>
        </div>
    )
}
