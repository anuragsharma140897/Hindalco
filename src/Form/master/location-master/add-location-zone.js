import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchSelect from '../../../Component/ui/form/select/search-select';
import useValidation from '../../../Hooks/useValidation';
import { zoneMasterSchema } from '../../../Utils/validators/master/zone-master/zone-master-scheema';
import { setZoneMasterApiJson, setZoneMasterData } from '../../../Store/Action/master/zone-master/zone-master-action';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import { getBuildingMasterColumns } from '../../../WebView/master/buildings-master/building-column';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getBuildingZoneMasterColumns } from '../../../WebView/master/zone-master/zone-building/zone-building-column';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addBuildingToZone, addZoneToLocation, searchBuilding, searchZone } from '../../../Constant/Api/Api';
import { CompileBuildingMaster } from '../../../WebView/master/buildings-master/promiss/building-master.promiss';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { CompileZoneMaster } from '../../../WebView/master/zone-master/promise/zone-master-promise';
import { getzoneLocationMasterColumns } from '../../../WebView/master/location-master/location-zone/location-zone-column';


function AddLocationZone({ row }) {

    console.log("row", row);
    let zoneid = row?.id

    console.log("zoneid", zoneid);

    const reduxZone = useSelector(state => state.ZoneMasterReducer);
    const reduxLocation = useSelector(state => state.LocationMasterReducer);
    const [error, setEror] = useState('')

    const [loading, setLoading] = useState(false);
    const { errors, validate } = useValidation(zoneMasterSchema);
    const dispatch = useDispatch();
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getzoneLocationMasterColumns({ openModal, closeModal, zoneid }))
    const { visibleColumns } = useColumn(columns);
    const [zoneOptions, setZoneOptions] = useState()


    useEffect(() => {

        loadData()

    }, [])

    const loadData = () => {
        var json = reduxLocation?.searchJson
        json.page = 1
        json.limit = 1000
        HitApi(json, searchZone).then((result) => {
            if (result) {
                CompileZoneMaster(result).then((CompiledData) => {
                    console.log("CompiledData", CompiledData)
                    const x = CompiledData.content?.map(building => ({
                        label: building.value,
                        value: building.id,
                    }));

                    setZoneOptions(x);
                })
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (reduxZone?.apiJson?.id) {
            setLoading(true)
            var json = {
                sourceId: row?.id,
                mapTo: reduxZone?.apiJson?.id,
            }

            console.log(json);

            HitApi(json, addZoneToLocation).then((result) => {
                setLoading(false)
                console.log("result", result);
                if (result?.status === 200) {
                    alert(result.message)
                    window.location.pathname = '/master/location'
                }
                else {
                    alert(result.message)
                }

            })
        }
        else {
            setEror("Please select Building")
        }

    }
    console.log("reduxZone", reduxZone);

    return (
        <div className='p-10 mb-40'>
            <form onSubmit={handleSubmit}>
                <SearchSelect name="id" label="Select Zone" options={zoneOptions} error={error} placeholder="Select Zone" reduxState={reduxZone.apiJson} setAction={setZoneMasterApiJson} />
                {/* <SearchableSelect name="buildingId" label="Select Building" api={searchBuilding} getFieldLabel={'buildingName'} getFieldValue={'id'}  error={error} placeholder="Select Building" reduxState={reduxZone.apiJson} setAction={setZoneMasterApiJson} /> */}

                <div className='flex gap-3 justify-end mb-5'>
                    <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                    <CustomButton type={'submit'} className={''} text={'Submit'} loading={loading} />
                </div>
                <ControlledTable
                    variant="modern"
                    isLoading={false}
                    showLoadingText={true}
                    data={row?.usedBy}
                    columns={visibleColumns}
                    className={TableClass}
                />

            </form>
        </div>
    )
}

export default AddLocationZone
