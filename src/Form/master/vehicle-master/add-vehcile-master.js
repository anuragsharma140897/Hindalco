import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import {  addVehicle, searchGeneral, searchSite, updateVehicle } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { vehicleMasterVariable as variable } from '../../../Constant/variables/master/vehicle-master/vehicle-master.variable';
import { setVehicleMasterApiJson } from '../../../Store/Action/master/vehicle-master/vehicle-master-action'
import { vehicleMasterSchema } from '../../../Utils/validators/master/vehicle-master/vehicle-master-schema';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';


export default function AddVehicleMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxVehicle = useSelector(state => state.VehicleMasterReducer)
    const { errors, validate } = useValidation(vehicleMasterSchema);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (row?._id) {
            loadDefault(row)
            var json = [{name:'vehicleType',value:row?.vehicleType},{name:'siteIds',value:row?.siteIds?.siteName}]
            dispatch(setSearchableSelectSelectedData(json))
            
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxVehicle?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        Object.assign(json, {siteIds : row?.siteIds?._id})
        Object.assign(json, {vehicleType : row?.vehicleType})

        dispatch(setVehicleMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxVehicle?.apiJson
        const validationErrors = validate(json);


        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            if (row?._id) {
                Object.assign(json, { _id: row?._id , status: json?.status || 'active'})
                HitApi(json, updateVehicle).then((result) => {
                    setLoading(false)
                    if(result?.status ==200){
                        alert(result.message);
                        window.location.pathname = '/master/vehicle'
                    }            
                    else {
                        alert(result.message)
                    }
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addVehicle).then((result) => {
                    setLoading(false)


                    if(result?.status === 201){
                        alert(result.message);
                        window.location.pathname = '/master/vehicle'
                    }
                    else if (result?.status === 409){
                        alert(result.error?.message)

                    }
                    else {
                        alert(result.message)
                    }
                })
            }
        } else {

        }
    };



    const handleOnChange = useCallback((e, name) => {
        const { _id, value } = e;
        const newJson = { [name]: name === 'siteIds' ? _id : value };
        const updatedJson = { ...reduxVehicle?.apiJson, ...newJson };
        dispatch(setVehicleMasterApiJson(updatedJson));
    }, [dispatch, reduxVehicle?.apiJson]);






    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <div className='grid grid-cols-2 gap-4'>
                    <CustomInput important={true} name="vehicleNumber" label="Vehicle Number" value={reduxVehicle?.apiJson?.vehicleNumber} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleMaker" label="Vehicle Maker" value={reduxVehicle?.apiJson?.vehicleMaker} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleModel" label="Vehicle Model" value={reduxVehicle?.apiJson?.vehicleModel} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleYear" type={'number'} maxLength={4} label="Vehicle Year" value={reduxVehicle?.apiJson?.vehicleYear} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleEngine" label="Vehicle Engine" value={reduxVehicle?.apiJson?.vehicleEngine} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="tagId" label="Tag Number" value={reduxVehicle?.apiJson?.tagId} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <SearchableSelect name="vehicleType" label="Vehicle Type" api={searchGeneral} checkServerKey={'fieldName'}  dynamicSearch={{ 'fieldName': 'vehicletype' }} checkServerValue={'vehicleType'} getFieldName={'value'} value={reduxVehicle?.apiJson?.roleName} error={errors}  onChange={(e)=>handleOnChange(e,'vehicleType')} />
                    <CustomInput important={false} name="supplierIds" label="Supplier ID" value={reduxVehicle?.apiJson?.supplierIds} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <SearchableSelect name="siteIds" label="Site" api={searchSite} getFieldName={'siteName'} onChange={(e)=>handleOnChange(e,'siteIds')} />
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat'  onClick={closeModal} />
                        <CustomButton type={'submit'}  text={row?._id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
