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
import { addBuildingToZone, searchBuilding } from '../../../Constant/Api/Api';
import { CompileBuildingMaster } from '../../../WebView/master/buildings-master/promiss/building-master.promiss';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';


function AddZoneBuilding({ row }) {
    let zoneid = row?.id

    console.log("zoneid",zoneid);

    const reduxZone = useSelector(state => state.ZoneMasterReducer);
    const reduxBuilding = useSelector(state => state.ZoneMasterReducer);
    const [error, setEror] = useState('')

    const [loading, setLoading] = useState(false);
    const { errors, validate } = useValidation(zoneMasterSchema);
    const dispatch = useDispatch();
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getBuildingZoneMasterColumns({ openModal, closeModal ,zoneid}))
    const { visibleColumns } = useColumn(columns);
    const [buildingOptions, setBuildingOptions] = useState()


    useEffect(() => {

        loadData()

    }, [])

    const loadData = () => {
        var json = reduxBuilding?.searchJson
        HitApi(json, searchBuilding).then((result) => {
            if (result) {
                CompileBuildingMaster(result).then((CompiledData) => {
                    console.log("CompiledData", CompiledData)
                    const x = CompiledData.content?.map(building => ({
                        label: building.buildingName,
                        value: building.id,
                    }));

                    setBuildingOptions(x);
                })
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (reduxZone?.apiJson?.buildingId) {
            setLoading(true)
            var json = {
                zoneId: row?.id, // selected zone ki id
                buildingId: reduxZone?.apiJson?.buildingId, // 
            }

            console.log(json);

            // HitApi(json, addBuildingToZone).then((result) => {
            //     setLoading(false)
            //     console.log("result", result);
            //     if(result?.status === 200){
            //         alert(result.message)
            //         window.location.pathname = '/master/zone'
            //     }
            //     else{
            //         alert(result.message)
            //     }
                
            // })
        }
        else {
            setEror("Please select Building")
        }

    }
    console.log("reduxZone", reduxZone);

    return (
        <div className='p-10 mb-40'>
            <form onSubmit={handleSubmit}>
                {/* <SearchSelect name="id" label="Select Building" options={buildingOptions} error={error} placeholder="Select Building" reduxState={reduxZone.apiJson} setAction={setZoneMasterApiJson} /> */}
                <SearchableSelect name="buildingId" label="Select Building" api={searchBuilding} getFieldLabel={'buildingName'} getFieldValue={'id'}  error={error} placeholder="Select Building" reduxState={reduxZone.apiJson} setAction={setZoneMasterApiJson} />
                
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

export default AddZoneBuilding
