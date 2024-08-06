import React from 'react'
import { useDispatch } from 'react-redux';
import { useMedia } from '../../../Hooks/use-media';
import { Form } from '../../../Component/ui/form';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { Button } from 'rizzui';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import { StatusOptions } from '../../../Constant/Common/Common';
import SubmitButton from '../../../Component/ui/form/button/SubmitButton';
import { supplierMasterVariable } from '../../../Constant/variables/master/supplier-master/supplier-master.variable';
import { addSupplierSchema } from '../../../Utils/validators/master/supplier-master/add-supplier.schema';

const initialValues = {
    siteName: '',
    building: '',
    area: ''
};

export default function AddSupplierMaster({ closeModal }) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);

    const onSubmit = (data) => {

    };

    return (
        <div className='p-10 bg-white'>
            <Form validationSchema={addSupplierSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Supplier Code'} register={register} fieldName={supplierMasterVariable?.supplierCode} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Name'} register={register} fieldName={supplierMasterVariable?.supplierName} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Notes'} register={register} fieldName={supplierMasterVariable?.supplierNotes} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Address 1'} register={register} fieldName={supplierMasterVariable?.supplierAddress1} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Supplier Address 2'} register={register} fieldName={supplierMasterVariable?.supplierAddress2} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier City'} register={register} fieldName={supplierMasterVariable?.supplierCity} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier State'} register={register} fieldName={supplierMasterVariable?.supplierState} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Region'} register={register} fieldName={supplierMasterVariable?.supplierRegion} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Supplier Country'} register={register} fieldName={supplierMasterVariable?.supplierCountry} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Contact Phone'} register={register} fieldName={supplierMasterVariable?.supplierContactPhone} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Contact Email'} register={register} fieldName={supplierMasterVariable?.supplierContactEmail} errors={errors} />
                            <CustomInput type={'text'} label={'Supplier Class'} register={register} fieldName={supplierMasterVariable?.supplierClass} errors={errors} />
                        </div>
                        <div className='grid grid-cols-5 gap-3 justify-end'>
                            <Button className="w-full" variant="flat" type="button" size={isMedium ? 'lg' : 'md'} onClick={() => closeModal()}> Cancel </Button>
                            <SubmitButton title={'Save'}/>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    )
}
