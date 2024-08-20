import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addGeneral, addLocation, updateGeneral, updateLocation } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { generalMasterVariable as variable } from '../../../Constant/variables/master/general-master/general-master.variable';
import { generalMasterSchema } from '../../../Utils/validators/master/general-master/general-master-schema';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { locationMasterSchema } from '../../../Utils/validators/master/location-master/location-master-scheema';
import { setLocationMasterApiJson } from '../../../Store/Action/master/location-master/location-master-action';



export default function AddLocationMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxLocation = useSelector(state => state.LocationMasterReducer)
    const { errors, validate } = useValidation(locationMasterSchema);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxLocation?.apiJson


        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setLocationMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxLocation?.apiJson
        const validationErrors = validate(json);

        console.log("validationErrors", validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateLocation).then((result) => {
                    if (result?.status === 200) {
                        alert(result.message);
                        window.location.pathname = 'master/location'
                    }
                    else {
                        alert(result.message)
                    }


                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addLocation).then((result) => {
                    setLoading(false)
                    console.log("result-----", result);
                    if (result.status === 201) {
                        alert(result.message);
                        window.location.pathname = 'master/location'
                    }
                    else {
                        alert(result.message)
                    }

                })
            }
        } else {

        }
    };


    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <CustomInput important={true} name="value" label="Location Name" value={reduxLocation?.apiJson?.value} error={errors} reduxState={reduxLocation?.apiJson} setAction={setLocationMasterApiJson} />
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
