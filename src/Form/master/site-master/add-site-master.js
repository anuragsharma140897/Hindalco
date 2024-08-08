import React, { useEffect } from 'react'
import { Form } from '../../../Component/ui/form'
import { siteMasterSchema } from '../../../Utils/validators/master/site-master/site-master.schema'
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from '../../../Hooks/use-media';
import { Button, Input, Password, Switch } from 'rizzui';
import { setSiteMasterApiJson } from '../../../Store/Action/master/site-master/site-master-action';
import { siteMasterVariable as variable } from '../../../Constant/variables/master/site-master/site-master.variable';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import useDeleteKeys from '../../../Hooks/use-delete-keys';

export default function AddSiteMaster({ row, closeModal }) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);
    const reduxSiteMaster = useSelector(state => state.SiteMasterReducer)
    const deleteKeys = useDeleteKeys();

    useEffect(() => {
        if (row?.index) {
            loadDefault(row)
        }
        console.log('reduxSiteMaster', reduxSiteMaster?.apiJson);
    }, [])

    const loadDefault = (row) => {
        var json = reduxSiteMaster?.apiJson
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setSiteMasterApiJson(json))
    }

    const onSubmit = (data) => {
        console.log('data', data);
        // HitApi(initialValues, LoginApi).then((res) => {
        //     if (res) {
        //         dispatch(setAuth(res))
        //     }
        // })
    };

    const handleClose = () => {
        closeModal();
        dispatch(setSiteMasterApiJson(deleteKeys(reduxSiteMaster?.apiJson)))
    }



    return (
        <div className='p-10'>
            <Form validationSchema={siteMasterSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange' }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <CustomInput type={'text'} json={reduxSiteMaster?.apiJson} label={'Site Name'} register={register} fieldName={variable?.siteName} errors={errors} />
                        <CustomInput type={'text'} json={reduxSiteMaster?.apiJson} label={'Buildings (Operation)'} register={register} fieldName={variable?.building} errors={errors} />
                        <CustomInput type={'text'} json={reduxSiteMaster?.apiJson} label={'Area (Optional)'} register={register} fieldName={variable?.area} errors={errors} />

                        <div className='flex gap-3 justify-end'>
                            <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => handleClose()}> Cancel </Button>
                            <Button className="w-full" type="submit" size={isMedium ? 'lg' : 'md'} > Submit </Button>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}
