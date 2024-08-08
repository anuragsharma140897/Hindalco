import React, { useEffect } from 'react'
import { Form } from '../../../Component/ui/form'
import { siteMasterSchema } from '../../../Utils/validators/master/site-master/site-master.schema'
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from '../../../Hooks/use-media';
import { Button, Checkbox, Input, Password, Switch } from 'rizzui';
import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
import { buildingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { setBuildingMasterApiJson } from '../../../Store/Action/master/building-master/building-master-action';
import { buildingMasterVariable as variable } from '../../../Constant/variables/master/building-master/building-master.variable';

export default function AddBuildingMaster({ row, closeModal }) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);
    const reduxBuildingMaster = useSelector(state => state.BuildingMasterReducer)

    useEffect(() => {
        row?.index && loadDefault(row);
    }, [])

    const loadDefault = (row) => {
        var json = reduxBuildingMaster?.apiJson
        // Assign Every key value to respective variable
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));

        dispatch(setBuildingMasterApiJson(json))
    }
    
    const onSubmit = (data) => {

        // HitApi(initialValues, LoginApi).then((res) => {

        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };

    

    return (
        <div className='p-10'>
            <Form validationSchema={buildingMasterSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange'}} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput type={'text'} json={reduxBuildingMaster?.apiJson} label={'Building Name'} register={register} fieldName={variable?.buildingName} errors={errors} />
                            <CustomInput type={'text'} json={reduxBuildingMaster?.apiJson} label={'Building No'} register={register} fieldName={variable?.buildingNo} errors={errors} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput type={'text'} json={reduxBuildingMaster?.apiJson} label={'Unit'} register={register} fieldName={variable?.NoOfReaders} errors={errors} />
                            <CustomCheckBox register={register} fieldName={variable?.addEmptyBag} errors={errors} />
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}> Cancel </Button>
                            <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'md'} > Submit </Button>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}
