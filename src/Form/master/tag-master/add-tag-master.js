import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import {  addTag, updateTag } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { TagMasterVariable as variable } from '../../../Constant/variables/master/tag-master/tag-master.variable';
import { setGeneralMasterApiJson } from '../../../Store/Action/master/general-master/general-master-action';
import { setTagMasterApiJson } from '../../../Store/Action/master/tag-master/tag-master-action';
import { tagMasterSchema } from '../../../Utils/validators/master/tag-master/tag-mster-schema';



export default function AddTagMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxTag = useSelector(state => state.TagMasterReducer)

    const { errors, validate } = useValidation(tagMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxTag?.apiJson

        console.log("json111111",json);
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setGeneralMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxTag?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateTag).then((result) => {
                    console.log('result', result);
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addTag).then((result) => {
                    console.log('result', result);
                })
            }
        } else {
            console.log('Form has errors');
        }
    };

    console.log("reduxTag++++++",reduxTag);
    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <CustomInput important={true} name="tagNumber" label="Tag Number" value={reduxTag?.apiJson?.value} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                    <CustomInput important={true} name="tagPlacement" label="Tag Placement" value={reduxTag?.apiJson?.status} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                    <CustomInput important={true} name="tagUsedFor" label="Tag Used For" value={reduxTag?.apiJson?.usedBy} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                    <CustomInput important={true} name="status" label="Status" value={reduxTag?.apiJson?.usedBy} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />

                    <div className='flex gap-3 justify-end'>
                        <CustomButton text={'Cancel'} variant='flat' className={''} onClick={closeModal} />
                        <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                    </div>
                </div>
            </form>
        </div>
    )
}
