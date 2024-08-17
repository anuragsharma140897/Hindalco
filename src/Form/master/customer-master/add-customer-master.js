import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addCustomer, addGeneral, updateCustomer, updateGeneral } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { customerMasterVariable as variable } from '../../../Constant/variables/master/customer-master/customer-master.variable';
import { generalMasterSchema } from '../../../Utils/validators/master/general-master/general-master-schema';
import { setCustomerMasterApiJson } from '../../../Store/Action/master/customer-master/customer-master-action';
import { customerlMasterSchema } from '../../../Utils/validators/master/customer-master/customer-master-schema';



export default function AddCustomeMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxCustomer = useSelector(state=>state.CustomerMasterReducer)

    const { errors, validate } = useValidation(customerlMasterSchema);

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
        }
    }, [])


    const loadDefault = (row) => {
        var json = reduxCustomer?.apiJson


        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setCustomerMasterApiJson(json))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxCustomer?.apiJson
        const validationErrors = validate(json);
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id })
                HitApi(json, updateCustomer).then((result) => {

                })
            } else {
                Object.assign(json, { status: json?.status || 'active' })
                HitApi(json, addCustomer).then((result) => {

                })
            }
        } else {

        }
    };

    return (
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-5 lg:space-y-6">
                    <div className='grid grid-cols-4 gap-x-4 '>
                        <CustomInput important={true} name="customerName" label="Customer Name" value={reduxCustomer?.apiJson?.customerName} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerCode" label="Customer Code" value={reduxCustomer?.apiJson?.status} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerGroup" label="Customer Group" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerEmail" label="Customer Email" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerVisibility" label="Customer Visibility" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerType" label="Customer Type" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerAddress1" label="Customer Add1" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerAddress2" label="Customer Add2" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerLandmark" label="Customer Landmark" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerCity" label="Customer City" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerState" label="Customer State" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerRegion" label="Customer Region" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerPostCode" label="Customer PostCode" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerCountry" label="Customer Country" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerGst" label="Customer Gst" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerContact" label="Customer Contact" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerPan" label="Customer PAN" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerStatus" label="Customer Status" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerVat" label="Customer VAT" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                        <CustomInput important={true} name="customerTan" label="Customer TAN" value={reduxCustomer?.apiJson?.usedBy} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
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
