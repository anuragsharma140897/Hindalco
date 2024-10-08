import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setZoneMasterApiJson } from '../../../Store/Action/master/zone-master/zone-master-action';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import { useModal } from '../../../shared/modal-views/use-modal';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import { getzoneLocationMasterColumns } from '../../../WebView/master/location-master/location-zone/location-zone-column';
import { useColumn } from '../../../Hooks/use-column';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { CompileZoneMaster } from '../../../WebView/master/zone-master/promise/zone-master-promise';
import { addZoneToLocation, searchSite, searchZone } from '../../../Constant/Api/Api';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';



function AddLocationZone({ row }) {
    const [zoneOptions, setZoneOptions] = useState()
    const reduxZone = useSelector(state => state.ZoneMasterReducer);

    const { openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false)
    const reduxLocation = useSelector(state => state.LocationMasterReducer);

    const dispatch = useDispatch()

    let zoneid = row?._id

    const columns = useMemo(() => getzoneLocationMasterColumns({ openModal, closeModal, zoneid }))
    const { visibleColumns } = useColumn(columns);

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

                    const x = CompiledData.content?.map(building => ({
                        label: building.value,
                        value: building._id,
                    }));

                    setZoneOptions(x);
                })
            }
        })
    }


    const handleSubmit = () => {

        if (reduxZone?.apiJson?._id) {
            setLoading(true)
            var json = {
                sourceId: row?._id,
                mapTo: reduxZone?.apiJson?._id,
            }



            HitApi(json, addZoneToLocation).then((result) => {
                setLoading(false)

                if (result?.status === 200) {
                    alert(result.message)
                    window.location.pathname = '/master/location'
                }
                else {
                    alert(result.message)
                }

            })
        }  

    }


    const handleOnChange = useCallback((e, name) => {
        const { _id, value } = e;


        const newJson = { [name]: _id  };

        const updatedJson = { ...reduxLocation?.apiJson, ...newJson };


        dispatch(setZoneMasterApiJson(updatedJson));
    }, [dispatch, reduxLocation?.apiJson]);





    return (
        <div className='p-10'>
            <SearchableSelect name="_id" label="Select Zone" api={searchZone} getFieldName={'value'}  onChange={(e) => handleOnChange(e,"_id")} />
            <div className='flex gap-3 justify-end mt-3 mb-5'>
                <CustomButton text={'Cancel'} variant='flat' onClick={closeModal} />
                <CustomButton type={'submit'} text={'Submit'} loading={loading} onClick={handleSubmit} />
            </div>
            <ControlledTable
                variant="modern"
                isLoading={false}
                showLoadingText={true}
                data={row?.usedBy}
                columns={visibleColumns}
                className={TableClass}
            />

        </div>
    )
}

export default AddLocationZone
