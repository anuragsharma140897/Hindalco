import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import { siteMasterSchema } from '../../../Utils/validators/master/site-master/site-master.schema';
import { setSiteMasterApiJson } from '../../../Store/Action/master/site-master/site-master-action';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addSite, updateSite } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { siteMasterVariable as variable } from '../../../Constant/variables/master/site-master/site-master.variable';
import { setBuildingMasterApiJson } from '../../../Store/Action/master/building-master/building-master-action';
import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
import { builingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema';




export default function AddSiteMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxBuilding = useSelector(state => state.BuildingMasterReducer)
    const { errors, validate } = useValidation(builingMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxBuilding?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setBuildingMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxBuilding?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateSite).then((result) => {
                    console.log('result', result);
                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addSite).then((result) => {
                    console.log('result', result);
                })
            }
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className='grid grid-cols-2 gap-4'>
                        <CustomInput name="buildingName" label="Building Name" value={reduxBuilding?.apiJson?.buildingName} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} />
                        <CustomInput name="buildingNo" label="Building No" value={reduxBuilding?.apiJson?.buildingName} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <CustomInput name="unit" label="Unit" value={reduxBuilding?.apiJson?.buildingName} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson} />
                        <CustomCheckBox name="addEmptyBox" label="Unit" value={reduxBuilding?.apiJson?.addEmptyBox} error={errors} reduxState={reduxBuilding?.apiJson} setAction={setBuildingMasterApiJson}/>
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
