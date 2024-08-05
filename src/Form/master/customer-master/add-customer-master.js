import React from 'react'
import { useDispatch } from 'react-redux';
import { useMedia } from '../../../Hooks/use-media';
import { Form } from '../../../Component/ui/form';
import { addCustomerSchema } from '../../../Utils/validators/master/customer-master/add-customer.schema';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { Button } from 'rizzui';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import { StatusOptions } from '../../../Constant/Common/Common';
import SubmitButton from '../../../Component/ui/form/button/SubmitButton';
import { customerMasterVariable } from '../../../Constant/variables/master/customer-master/customer-master.variable';

const initialValues = {
    siteName: '',
    building: '',
    area: ''
};

export default function AddCustomeMaster({ closeModal }) {
    const dispatch = useDispatch()
    const isMedium = useMedia('(max-width: 1200px)', false);

    const onSubmit = (data) => {

    };

    return (
        <div className='p-10 bg-white'>
            <Form validationSchema={addCustomerSchema} onSubmit={onSubmit} useFormProps={{ mode: 'onChange', defaultValues: initialValues, }} >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Customer Code'} register={register} fieldName={customerMasterVariable?.customerCode} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Name'} register={register} fieldName={customerMasterVariable?.customerName} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Group'} register={register} fieldName={customerMasterVariable?.customerGroup} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Email'} register={register} fieldName={customerMasterVariable?.customerEmail} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Customer Visibility'} register={register} fieldName={customerMasterVariable?.customerVisibility} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Type'} register={register} fieldName={customerMasterVariable?.customerType} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Address 1'} register={register} fieldName={customerMasterVariable?.customerAddress1} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Address 2'} register={register} fieldName={customerMasterVariable?.customerAddress2} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Customer Landmark'} register={register} fieldName={customerMasterVariable?.customerLandmark} errors={errors} />
                            <CustomInput type={'text'} label={'Customer City'} register={register} fieldName={customerMasterVariable?.customerCity} errors={errors} />
                            <CustomInput type={'text'} label={'Customer State'} register={register} fieldName={customerMasterVariable?.customerState} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Region'} register={register} fieldName={customerMasterVariable?.customerRegion} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Customer Postcode'} register={register} fieldName={customerMasterVariable?.customerPostcode} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Country'} register={register} fieldName={customerMasterVariable?.customerCountry} errors={errors} />
                            <CustomInput type={'text'} label={'Customer Contact'} register={register} fieldName={customerMasterVariable?.customerContact} errors={errors} />
                            <CustomInput type={'text'} label={'Customer CST'} register={register} fieldName={customerMasterVariable?.customerCST} errors={errors} />
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <CustomInput type={'text'} label={'Customer PAN'} register={register} fieldName={customerMasterVariable?.customerPAN} errors={errors} />
                            <CustomSelect type={'text'} title={'Customer Status'} options={StatusOptions} register={register} fieldName={customerMasterVariable?.customerStatus} errors={errors} />
                            <CustomInput type={'text'} label={'Customer VAT'} register={register} fieldName={customerMasterVariable?.customerVAT} errors={errors} />
                            <CustomInput type={'text'} label={'Customer TAN'} register={register} fieldName={customerMasterVariable?.customerTAN} errors={errors} />
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
