import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import { addCustomer, searchGeneral, searchSite, updateCustomer } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { customerMasterVariable as variable } from '../../../Constant/variables/master/customer-master/customer-master.variable';
import { setCustomerMasterApiJson } from '../../../Store/Action/master/customer-master/customer-master-action';
import { customerlMasterSchema } from '../../../Utils/validators/master/customer-master/customer-master-schema';
import PageHeader from '../../../shared/page-header';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import SearchCountryStateCity from '../../../Component/ui/form/select/search-country-state-city';
import { Country, State, City } from 'country-state-city';




export default function AddCustomeMaster({ row, closeModal }) {
    var dispatch = useDispatch()
    const reduxCustomer = useSelector(state => state.CustomerMasterReducer)
    const reduxUser = useSelector(state => state.UserReducer)
    const [countries, setCountries] = useState(reduxCustomer?.apiJson?.customerCountry ||[]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    const { errors, validate } = useValidation(customerlMasterSchema);

    const statusOption = [
        { label: 'Active', value: 'Active' },
        { label: 'InActive', value: 'InActive' },
        { label: 'Blocked', value: 'Blocked' },
    ]

    const countryOptions =[]

    useEffect(() => {
        if (row?.id) {
            loadDefault(row)
           
        }

        const allCountries = Country.getAllCountries().map(country => ({
            label: country.name,
            value: country.name
        }));
        setCountries(allCountries);
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

        console.log("validationErrors", validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            if (row?.id) {
                Object.assign(json, { id: row?.id , status: json?.status || 'active' })
                HitApi(json, updateCustomer).then((result) => {
                    if (result?.status === 200) {
                        alert(result.message);
                        window.location.pathname = '/master/customer'
                    }
                    else {
                        alert(result.message)
                    }


                })
            } else {
                Object.assign(json, {  status: json?.status || 'active' })
                HitApi(json, addCustomer).then((result) => {
                    console.log("reult", result);
                    if (result?.status === 201) {
                        alert(result.message);
                        window.location.pathname = '/master/customer'
                    }
                    else if(result?.status === 409){
                        alert(result?.error?.message)
                    }
                    else {
                        alert(result.message)
                    }

                })
            }
        } else {

        }
    };


    const handleOnChange = (e) => {
        const { id, label, value } = e
        console.log("dfsddsd", e);
        let oldJson = reduxCustomer?.apiJson
        let newJson = { ...oldJson, "customerGroup": e?.value, "customerType": e?.value,"siteId" :e.id }
        dispatch(setCustomerMasterApiJson(newJson))

    }

    const handleCountry = (e) => {
        const selectedCountryName = e?.value; 
        console.log("handleCountry", selectedCountryName);
    
        const selectedCountry = Country.getAllCountries().find(country => country.name === selectedCountryName)?.isoCode;
    
        if (!selectedCountry) {
            console.error("Invalid country selected.");
            return;
        }
    
        let oldJson = reduxCustomer?.apiJson;
        let newJson = { ...oldJson, "customerCountry": selectedCountryName };
        dispatch(setCustomerMasterApiJson(newJson));
    
        const states = State.getStatesOfCountry(selectedCountry).map(state => ({
            label: state.name,
            value: state.name
        }));
    
        console.log("States:", states);
        setStates(states);
        setCities([]);
    };
    
    const handleStateChange = (e) => {
        const selectedStateName = e?.value;
        console.log("handleStateChange", selectedStateName);
    
        const countryISOCode = Country.getAllCountries().find(country => country.name === reduxCustomer?.apiJson?.customerCountry)?.isoCode;
        const stateISOCode = State.getStatesOfCountry(countryISOCode).find(state => state.name === selectedStateName)?.isoCode;
    
        if (!stateISOCode) {
            console.error("Invalid state selected.");
            return;
        }
        let oldJson = reduxCustomer?.apiJson;
        let newJson = { ...oldJson, "customerState": selectedStateName }; 
        dispatch(setCustomerMasterApiJson(newJson));
    
        const cities = City.getCitiesOfState(countryISOCode, stateISOCode).map(city => ({
            label: city.name,
            value: city.name
        }));
    
        console.log("Cities:", cities);
        setCities(cities);
    };
    
    const handleCityChange = (e)=>{
        const selectedCity = e?.value; 
        let oldJson = reduxCustomer?.apiJson;
        let newJson = { ...oldJson, "customerCity": selectedCity };
        dispatch(setCustomerMasterApiJson(newJson));

    }
    


console.log("reduxCustomer",reduxCustomer);
    return (
        <div  >
            <PageHeader metaTitle={'Create Customer'} disbleExport />
            <div className='p-10 rounded-xl bg-white'>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-4 gap-x-4 '>
                            <CustomInput important={true} name="customerName" label="Customer Name" value={reduxCustomer?.apiJson?.customerName} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerCode" label="Customer Code" value={reduxCustomer?.apiJson?.customerCode} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <SearchableSelect name="customerGroup" label="Customer Group" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'customergroup'} getFieldName={'value'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} onChange={handleOnChange} />
                            <CustomInput important={true} name="customerEmail" label="Customer Email" value={reduxCustomer?.apiJson?.customerEmail} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerVisibility" label="Customer Visibility" value={reduxCustomer?.apiJson?.customerVisibility} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <SearchableSelect name="customerType" label="Customer Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'customertype'} getFieldName={'value'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} onChange={handleOnChange} />
                            <CustomInput important={true} name="customerAddress1" label="Customer Add1" value={reduxCustomer?.apiJson?.customerAddress1} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerAddress2" label="Customer Add2" value={reduxCustomer?.apiJson?.customerAddress2} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerLandmark" label="Customer Landmark" value={reduxCustomer?.apiJson?.customerLandmark} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <SearchCountryStateCity value={reduxCustomer?.apiJson?.customerCountry}  important={true} label="Customer Country" options={countries} onChange={handleCountry}/>
                            <SearchCountryStateCity value={reduxCustomer?.apiJson?.customerState} important={true} label="Customer State" options={states} onChange={handleStateChange}/>
                            <SearchCountryStateCity value={reduxCustomer?.apiJson?.customerCity}  important={true} label="Customer City" options={cities} onChange={handleCityChange}/>


                            <CustomInput important={true} type={"number"} maxLength={6} name="customerPostCode" label="Customer PostCode" value={reduxCustomer?.apiJson?.customerPostCode} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerGst" label="Customer Gst" value={reduxCustomer?.apiJson?.customerGst} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} type={"number"} name="customerContact" maxLength={10} label="Customer Contact" value={reduxCustomer?.apiJson?.customerContact} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerPan" label="Customer PAN" value={reduxCustomer?.apiJson?.customerPan} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerVat" label="Customer VAT" value={reduxCustomer?.apiJson?.customerVat} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomInput important={true} name="customerTan" label="Customer TAN" value={reduxCustomer?.apiJson?.customerTan} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <CustomSelect important={true} name="customerStatus" label="Customer Status" options={statusOption} value={reduxCustomer?.apiJson?.customerStatus} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson} />
                            <SearchableSelect name="siteId" label="Site" api={searchSite} getFieldName={'siteName'} onChange={handleOnChange} />

                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CustomButton text={'Back'} variant='flat' onClick={() => { window.location.pathname = 'master/customer/' }} />
                            <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
