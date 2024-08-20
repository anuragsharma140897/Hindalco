import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addGeneral, addVehicle, updateGeneral, updateVehicle } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { vehicleMasterVariable as variable } from '../../../Constant/variables/master/vehicle-master/vehicle-master.variable';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { setVehicleMasterApiJson } from '../../../Store/Action/master/vehicle-master/vehicle-master-action'
import { vehicleMasterSchema } from '../../../Utils/validators/master/vehicle-master/vehicle-master-schema';

export default function AddVehicleMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    // const reduxGeneral = useSelector(state => state.GeneralMasterReducer)
    const reduxVehicle = useSelector(state => state.VehicleMasterReducer)
    const { errors, validate } = useValidation(vehicleMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxVehicle?.apiJson


        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setVehicleMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxVehicle?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateVehicle).then((result) => {

                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addVehicle).then((result) => {

                })
            }
        } else {

        }
    };


    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <div className='grid grid-cols-2 gap-x-4'>
                    <CustomInput important={true} name="vehicleMaker" label="Vehicle Maker" value={reduxVehicle?.apiJson?.vehicleMaker} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleModel" label="Vehicle Model" value={reduxVehicle?.apiJson?.vehicleModel} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleYear" label="Vehicle Year" value={reduxVehicle?.apiJson?.vehicleYear} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleEngine" label="Vehicle Engine" value={reduxVehicle?.apiJson?.vehicleEngine} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleType" label="Vehicle Type" value={reduxVehicle?.apiJson?.vehicleType} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vehicleGear" label="Vehicle Gear" value={reduxVehicle?.apiJson?.vehicleGear} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    <CustomInput important={true} name="vendorId" label="Vendor ID" value={reduxVehicle?.apiJson?.vendorId} error={errors} reduxState={reduxVehicle?.apiJson} setAction={setVehicleMasterApiJson} />
                    </div>
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>
        </div>
    )
}
