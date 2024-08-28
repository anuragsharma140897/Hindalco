import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addBuilding, searchSite, updateBuilding, } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { setBuildingMasterApiJson } from '../../../Store/Action/master/building-master/building-master-action';
import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
import { builingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema';
import { buildingMasterVariable as variable  } from '../../../Constant/variables/master/building-master/building-master.variable';
import useDeleteKeys from '../../../Hooks/use-delete-keys';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import useAlertController from '../../../Hooks/use-alert-controller';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';

export default function AddSiteMaster({ row, closeModal, ApiHit }) {
    var dispatch = useDispatch()
    const reduxBuilding = useSelector(state => state.BuildingMasterReducer)
    const reduxSelect = useSelector(state => state.SearchableSelectReducer)
    const { errors, validate } = useValidation(builingMasterSchema);
    const deleteKeys = useDeleteKeys();
    const { showCustomAlert } = useAlertController();

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])

    const loadDefault = (row) => {
        console.log('row', row);
        var json = reduxBuilding?.apiJson
        var selected = reduxSelect?.selected
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setSearchableSelectSelectedData([...selected, {unitName : row?.['unitName']}]))
        dispatch(setBuildingMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxBuilding?.apiJson

        console.log('json', json);
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateBuilding).then((result) => {
                    if (result?.success!==false) {
                        showCustomAlert({
                            type: 'success',
                            title: 'Success!',
                            message: 'Building Added Successfully',
                        });
                        if (ApiHit) { ApiHit() }
                        handleClose()
                    }
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addBuilding).then((result) => {
                    if (result?.success!==false) {
                        showCustomAlert({
                            type: 'success',
                            title: 'Success!',
                            message: 'Building Added Successfully',
                        });
                        if (ApiHit) { ApiHit() }
                        handleClose()
                    }
                })
            }
        } else {

        }
    };

    const handleCustomChange = (e) => {
        var json = reduxBuilding?.apiJson
        const { id, value } = e
        Object.assign(json, { unitId: id, unitName: value })
        dispatch(setBuildingMasterApiJson(json))
    }



    const handleClose = () => {
        closeModal();
        dispatch(setBuildingMasterApiJson({}))
    }

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className='grid grid-cols-2 gap-4'>
                        <CustomInput name="buildingName" label="Building Name" validate={validate} value={reduxBuilding?.apiJson?.buildingName} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} />
                        <CustomInput name="buildingNo" label="Building No" validate={validate} value={reduxBuilding?.apiJson?.buildingNo} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                    <SearchableSelect name="unitName" label="Unit" api={searchSite} getFieldName={'siteName'} getFieldLabel={'siteName'} getFieldValue={'siteName'} value={reduxBuilding?.apiJson?.roleName} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} onChange={handleCustomChange}/>
                        {/* <CustomInput name="unit" label="Unit" validate={validate} value={reduxBuilding?.apiJson?.unit} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} /> */}
                    </div>

                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={()=>handleClose()} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>

        </div>
    )
}
