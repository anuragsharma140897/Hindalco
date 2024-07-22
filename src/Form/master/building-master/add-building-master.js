import React from 'react'
import { Form } from '../../../Component/ui/form'
import { siteMasterSchema } from '../../../Utils/validators/master/site-master/site-master.schema'
import { useDispatch } from 'react-redux';
import { useMedia } from '../../../Hooks/use-media';
import { Button, Checkbox, Input, Password, Switch } from 'rizzui';
import CustomCheckBox from '../../../Component/ui/form/checkbox/custom-checkbox';
import { buildingMasterSchema } from '../../../Utils/validators/master/building-master/building-master.schema';
import CustomInput from '../../../Component/ui/form/input/custom-input';

const initialValues = {
    siteName: '',
    building: '',
    area: ''
};

export default function AddBuildingMaster({ closeModal }) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);
    const onSubmit = (data) => {
        // console.log('Sign in data ->', data);
        // HitApi(initialValues, LoginApi).then((res) => {
        //     console.log('res', res);
        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };

    return (
        <div className='p-10'>
            <Form validationSchema={buildingMasterSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput type={'text'} label={'Building Name'} register={register} fieldName={'buildingName'} errors={errors} />
                            <CustomInput type={'text'} label={'Building No'} register={register} fieldName={'buildingNo'} errors={errors} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <CustomInput type={'text'} label={'Unit'} register={register} fieldName={'unit'} errors={errors} />
                            <CustomCheckBox register={register} fieldName={'addEmptyBag'} errors={errors} />
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
