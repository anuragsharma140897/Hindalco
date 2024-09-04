import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addGeneral, updateGeneral } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { generalMasterVariable as variable } from '../../../Constant/variables/master/general-master/general-master.variable';
import { generalMasterSchema } from '../../../Utils/validators/master/general-master/general-master-schema';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { usedByOption } from '../../../Constant/UsedBy';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';



export default function AddGeneralMaster({ row, closeModal }) {
    console.log("row", row);
    var dispatch = useDispatch()
    const reduxGeneral = useSelector(state => state.GeneralMasterReducer)
    const [loading, setLoading] = useState(false)
    const { errors, validate } = useValidation(generalMasterSchema);

    useEffect(() => {
        if (row?._id) {
            loadDefault(row)
        }
    }, [])

    const statusOption = [
        { label: 'Active', value: 'Active' },
        { label: 'InActive', value: 'InActive' },
        { label: 'Blocked', value: 'Blocked' },
    ];
    const loadDefault = (row) => {
        var json = reduxGeneral?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setGeneralMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxGeneral?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            if (row?._id) {
                Object.assign(json, { _id: row?._id })
                HitApi(json, updateGeneral).then((result) => {

                    setLoading(false)

                    if (result && result.status === 200) {

                        alert(result.message);
                        window.location.pathname = '/master/general';
                    }
                    else {
                        alert(result.message);
                    }

                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addGeneral).then((result) => {
                    console.log("json", json);
                    console.log("result", result);

                    setLoading(false)

                    if (result && result.status === 201) {
                        alert(result.message);
                        window.location.pathname = '/master/general';
                    }
                    else {
                        alert(result.error?.message);
                    }

                })
            }
        } else {

        }
    };

    console.log('reduxGeneral', reduxGeneral);

    // Example var json = { label:TLS, value : TLS 1.2, usedBy : brokerType // this will come from an array from constant }
    // Example2  var json = { label:male, value : male, usedBy : gender }

    const handleSelect = (e, name) =>{
        const {label, value, _id} = e
        var json = reduxGeneral?.apiJson
        Object.assign(json,{ [name]:value })
        console.log('e', e);
    }

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <CustomInput important={true} name="label" label="Label" value={reduxGeneral?.apiJson?.label} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} />
                    <CustomInput important={true} name="value" label="Value" value={reduxGeneral?.apiJson?.value} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} />
                    <SearchableSelect name="usedBy" label="Used By" defaultOptions={usedByOption} value={reduxGeneral?.apiJson?.usedBy} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} validate={validate} onChange={(e)=>handleSelect(e,'usedBy')} />
                    <div className='flex gap-3 justify-end pt-24'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?._id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
