import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchSelect from '../../../Component/ui/form/select/search-select';
import useValidation from '../../../Hooks/useValidation';
import { zoneMasterSchema } from '../../../Utils/validators/master/zone-master/zone-master-scheema';
import { setZoneMasterApiJson } from '../../../Store/Action/master/zone-master/zone-master-action';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { useColumn } from '../../../Hooks/use-column';
import { TableClass } from '../../../Constant/Classes/Classes';
import { useModal } from '../../../shared/modal-views/use-modal';
import { getBuildingZoneMasterColumns } from '../../../WebView/master/zone-master/zone-building/zone-building-column';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { addBuildingToZone, searchBuilding } from '../../../Constant/Api/Api';
import { CompileBuildingMaster } from '../../../WebView/master/buildings-master/promiss/building-master.promiss';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { setLocationMasterApiJson } from '../../../Store/Action/master/location-master/location-master-action';


function AddZoneBuilding({ row }) {
    let zoneid = row?._id



    const reduxZone = useSelector(state => state.ZoneMasterReducer);
    const reduxBuilding = useSelector(state => state.ZoneMasterReducer);
    const [error, setEror] = useState('')

    const [loading, setLoading] = useState(false);
    const { errors, validate } = useValidation(zoneMasterSchema);
    const dispatch = useDispatch();
    const { openModal, closeModal } = useModal();
    const columns = useMemo(() => getBuildingZoneMasterColumns({ openModal, closeModal, zoneid }))
    const { visibleColumns } = useColumn(columns);
    const [buildingOptions, setBuildingOptions] = useState()


    useEffect(() => {

        loadData()

    }, [])

    const loadData = () => {
        var json = reduxBuilding?.searchJson
        json.page = 1
        json.limit = 1000
        HitApi(json, searchBuilding).then((result) => {



            if (result) {
                CompileBuildingMaster(result).then((CompiledData) => {

                    const x = CompiledData.content?.map(building => ({
                        label: building.buildingName,
                        value: building._id,
                    }));

                    setBuildingOptions(x);
                })
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (reduxZone?.apiJson?._id) {
            setLoading(true)
            var json = {

                sourceId: row?._id,
                mapTo: reduxZone?.apiJson?._id,

            }



            HitApi(json, addBuildingToZone).then((result) => {
                setLoading(false)

                if (result?.status === 200) {
                    alert(result.message)
                    window.location.pathname = '/master/zone'
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



    const handleOnChange = useCallback((e, name) => {
        const { _id, value } = e;


        const newJson = { [name]: _id  };

        const updatedJson = { ...reduxZone?.apiJson, ...newJson };


        dispatch(setZoneMasterApiJson(updatedJson));
    }, [dispatch, reduxZone?.apiJson]);



    return (
        <div className='p-10 mb-40'>
            <form onSubmit={handleSubmit}>
            <SearchableSelect name="_id" label="Select Building" api={searchBuilding} getFieldName={'buildingName'}  onChange={(e) => handleOnChange(e,"_id")} />

                {/* <SearchSelect name="_id" label="Select Building" options={buildingOptions} error={error} placeholder="Select Building" reduxState={reduxZone.apiJson} setAction={setZoneMasterApiJson} /> */}
                <div className='flex gap-3 justify-end mb-5 mt-3'>
                    <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                    <CustomButton type={'submit'} className={''} text={'Submit'} loading={loading} onClick={handleSubmit}/>
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
