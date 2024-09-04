import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addZone, updateZone } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { generalMasterVariable as variable } from '../../../Constant/variables/master/general-master/general-master.variable';
import { setZoneMasterApiJson } from '../../../Store/Action/master/zone-master/zone-master-action';
import { zoneMasterSchema } from '../../../Utils/validators/master/zone-master/zone-master-scheema';



export default function AddZoneMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxZone = useSelector(state => state.ZoneMasterReducer)
    const [loading, setLoading] = useState(false)

    const { errors, validate } = useValidation(zoneMasterSchema);

    useEffect(() => {
        if (row?._id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxZone?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setZoneMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const json = { ...reduxZone?.apiJson }; 
        const validationErrors = validate(json);
    
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
    
            const apiCall = row?._id ? updateZone : addZone;
            if (row?._id) {
                Object.assign(json, { _id: row._id });
            } else {
                Object.assign(json, { status: json?.status || 'active' });
            }
    
            HitApi(json, apiCall)
                .then((result) => {
                    setLoading(false); 

    
                    if (row?._id && result?.status === 200) {
                        alert(result.message);
                        window.location.pathname = '/master/zone';
                    } else if (!row?._id && result?.status === 201) {
                        alert(result.message);
                        window.location.pathname = '/master/zone';
                    } else {
                        console.error("API Error", result);
                        alert(result.message || 'Something went wrong');
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.error("Network error:", error);
                    alert('An error occurred. Please try again.');
                });
        } else {
           
        }
    };
    


    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <CustomInput important={true} name="value" label="Zone Name" value={reduxZone?.apiJson?.value} error={errors} reduxState={reduxZone?.apiJson} setAction={setZoneMasterApiJson} />
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat'  onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?._id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
