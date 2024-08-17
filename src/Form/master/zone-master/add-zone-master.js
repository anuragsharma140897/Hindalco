import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addZone, updateZone } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { generalMasterVariable as variable } from '../../../Constant/variables/master/general-master/general-master.variable';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { setZoneMasterApiJson } from '../../../Store/Action/master/zone-master/zone-master-action';
import { zoneMasterSchema } from '../../../Utils/validators/master/zone-master/zone-master-scheema';



export default function AddZoneMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxZone = useSelector(state => state.ZoneMasterReducer)

    const { errors, validate } = useValidation(zoneMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxZone?.apiJson
        console.log("json111111", json);
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setZoneMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxZone?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateZone).then((result) => {
                    console.log('result', result);
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addZone).then((result) => {
                    console.log('result', result);
                })
            }
        } else {
            console.log('Form has errors');
        }
    };

    console.log("reduxZone++++++", reduxZone);
    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <CustomInput important={true} name="value" label="Value" value={reduxZone?.apiJson?.value} error={errors} reduxState={reduxZone?.apiJson} setAction={setZoneMasterApiJson} />
                    <CustomInput important={true} name="status" label="Status" value={reduxZone?.apiJson?.status} error={errors} reduxState={reduxZone?.apiJson} setAction={setZoneMasterApiJson} />
                    <CustomInput important={true} name="usedBy" label="Used By" value={reduxZone?.apiJson?.usedBy} error={errors} reduxState={reduxZone?.apiJson} setAction={setZoneMasterApiJson} />
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>
        </div>
    )
}
