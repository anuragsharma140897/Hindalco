import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addTag, updateTag } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { TagMasterVariable as variable } from '../../../Constant/variables/master/tag-master/tag-master.variable';
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


        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setTagMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxTag?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateTag).then((result) => {

                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addTag).then((result) => {

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
                        <CustomInput important={true} name="identification" label="Identification" value={reduxTag?.apiJson?.identification} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="typeName" label="Type Name" value={reduxTag?.apiJson?.typeName} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="typeId" label="Type Id" value={reduxTag?.apiJson?.typeId} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="locationName" label="Location Name" value={reduxTag?.apiJson?.locationName} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="locationId" label="Location Id" value={reduxTag?.apiJson?.locationId} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="tagNo" label="Tag No" value={reduxTag?.apiJson?.tagNo} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="tagUsedForName" label="Tag Used For Name" value={reduxTag?.apiJson?.tagUsedForName} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="tagUsedForId" label="Tag Used For Id" value={reduxTag?.apiJson?.tagUsedForId} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
                        <CustomInput important={true} name="status" label="Status" value={reduxTag?.apiJson?.status} error={errors} reduxState={reduxTag?.apiJson} setAction={setTagMasterApiJson} />
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
