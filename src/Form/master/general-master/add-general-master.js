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



export default function AddGeneralMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxGeneral = useSelector(state => state.GeneralMasterReducer)
    const [loading, setLoading] = useState(false)
    const { errors, validate } = useValidation(generalMasterSchema);

    useEffect(() => {
        if (row?._id) {
            loadDefault(row)
        }
    }, [])


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
                    setLoading(false)

                    if (result && result.status === 201) {
                        alert(result.message);
                        window.location.pathname = '/master/general';
                    }
                    else {
                        alert(result.message);
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
                    <CustomInput important={true} name="value" label="Value" value={reduxGeneral?.apiJson?.value} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} />
                    <CustomInput important={true} name="fieldName" label="Field Name" value={reduxGeneral?.apiJson?.fieldName} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} />
                    <CustomInput important={true} name="usedBy" label="Used By" value={reduxGeneral?.apiJson?.usedBy} error={errors} reduxState={reduxGeneral?.apiJson} setAction={setGeneralMasterApiJson} />
                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?._id ? 'Update' : 'Submit'} loading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}
