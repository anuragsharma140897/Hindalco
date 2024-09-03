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
import { useCallback } from 'react';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';




export default function AddCustomeMaster({ row}) {
    const dispatch = useDispatch();
    const reduxCustomer = useSelector(state => state.CustomerMasterReducer);
    const reduxUser = useSelector(state => state.UserReducer);
    const [countries, setCountries] = useState(reduxCustomer?.apiJson?.customerCountry || []);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const { errors, validate } = useValidation(customerlMasterSchema);

    const statusOption = [
        { label: 'Active', value: 'Active' },
        { label: 'InActive', value: 'InActive' },
        { label: 'Blocked', value: 'Blocked' },
    ];

    useEffect(() => {
        if (row?._id) {
            loadDefault(row);

            var json = [{name:'customerGroup',value:row?.customerGroup},{name:'customerType',value:row?.customerType},{name:'siteIds',value:row?.siteIds?.siteName}]
            dispatch(setSearchableSelectSelectedData(json))
            setCountries(row?.customerCountry)

        }

        const allCountries = Country.getAllCountries().map(country => ({
            label: country.name,
            value: country.name
        }));
        setCountries(allCountries);
    }, [row?._id]); 
    const loadDefault = useCallback((row) => {

        var json = { ...reduxCustomer?.apiJson };


        
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        Object.assign(json, {siteIds : row?.siteIds?._id})
        dispatch(setCustomerMasterApiJson(json));
    }, [dispatch, reduxCustomer?.apiJson]);

    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxCustomer?.apiJson;


        const validationErrors = validate(json);



        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            const apiCall = row?._id ? updateCustomer : addCustomer;
            const updatedJson = { ...json, _id: row?._id, status: json?.status || 'Active' };

            HitApi(updatedJson, apiCall).then((result) => {
                setLoading(false);
                if (result?.status === 200 || result?.status === 201) {
                    alert(result.message);
                    window.location.pathname = '/master/customer';
                } else if (result?.status === 409) {
                    alert(result?.error?.message);
                } else {
                    alert(result.message);
                }
            });
        }
    };

    const handleOnChange = useCallback((e, name) => {
        const { _id, value } = e;
        const newJson = { [name]: name === 'siteIds' ? _id : value };
        const updatedJson = { ...reduxCustomer?.apiJson, ...newJson };
        dispatch(setCustomerMasterApiJson(updatedJson));
    }, [dispatch, reduxCustomer?.apiJson]);

    const handleCountry = useCallback((e) => {
        const selectedCountryName = e?.value;
        const selectedCountry = Country.getAllCountries().find(country => country.name === selectedCountryName)?.isoCode;

        if (!selectedCountry) {
            console.error("Invalid country selected.");
            return;
        }

        const updatedJson = { ...reduxCustomer?.apiJson, customerCountry: selectedCountryName };
        dispatch(setCustomerMasterApiJson(updatedJson));

        const states = State.getStatesOfCountry(selectedCountry).map(state => ({
            label: state.name,
            value: state.name
        }));
        setStates(states);
        setCities([]);
    }, [dispatch, reduxCustomer?.apiJson]);

    const handleStateChange = useCallback((e) => {
        const selectedStateName = e?.value;
        const countryISOCode = Country.getAllCountries().find(country => country.name === reduxCustomer?.apiJson?.customerCountry)?.isoCode;
        const stateISOCode = State.getStatesOfCountry(countryISOCode).find(state => state.name === selectedStateName)?.isoCode;

        if (!stateISOCode) {
            console.error("Invalid state selected.");
            return;
        }

        const updatedJson = { ...reduxCustomer?.apiJson, customerState: selectedStateName };
        dispatch(setCustomerMasterApiJson(updatedJson));

        const cities = City.getCitiesOfState(countryISOCode, stateISOCode).map(city => ({
            label: city.name,
            value: city.name
        }));
        setCities(cities);
    }, [dispatch, reduxCustomer?.apiJson]);

    const handleCityChange = useCallback((e) => {
        const selectedCity = e?.value;
        const updatedJson = { ...reduxCustomer?.apiJson, customerCity: selectedCity };
        dispatch(setCustomerMasterApiJson(updatedJson));
    }, [dispatch, reduxCustomer?.apiJson]);

    return (
        <div>
            <div className='p-10 rounded-xl bg-white mt-10' >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-4 gap-4 '>
                            <CustomInput important={true} name="customerName" label="Customer Name" value={reduxCustomer?.apiJson?.customerName} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <CustomInput important={true} name="customerCode" label="Customer Code" value={reduxCustomer?.apiJson?.customerCode} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate}/>
                            <SearchableSelect name="customerGroup" label="Customer Group" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'customergroup'} getFieldName={'value'} dynamicSearch={{'fieldName':'customergroup'}} value={reduxCustomer?.apiJson?.roleName} error={errors} reduxState={reduxCustomer?.apiJson} onChange={(e)=>handleOnChange(e,'customerGroup')}  validate={validate}  />
                            <CustomInput important={true} name="customerEmail" label="Customer Email" value={reduxCustomer?.apiJson?.customerEmail} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <SearchableSelect name="customerType" label="Customer Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'customertype'} getFieldName={'value'} dynamicSearch={{'fieldName':'customertype'}} value={reduxCustomer?.apiJson?.roleName} error={errors} reduxState={reduxCustomer?.apiJson} onChange={(e)=>handleOnChange(e,'customerType')}  validate={validate} />
                            <CustomInput important={true} name="customerAddress1" label="Customer Add1" value={reduxCustomer?.apiJson?.customerAddress1} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <CustomInput important={true} name="customerAddress2" label="Customer Add2" value={reduxCustomer?.apiJson?.customerAddress2} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <CustomInput important={true} name="customerLandmark" label="Customer Landmark" value={reduxCustomer?.apiJson?.customerLandmark} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <SearchCountryStateCity name={"customerCountry"} value={row ? row?.customerCountry :reduxCustomer ?.apiJson?.customerCountry} important={true} label="Customer Country" options={countries} error={errors} onChange={handleCountry}  validate={validate}  />
                            <SearchCountryStateCity name={"customerState"} value={row ? row?.customerState :reduxCustomer?.apiJson?.customerState} important={true} label="Customer State" options={states} error={errors} onChange={handleStateChange}  validate={validate} />
                            <SearchCountryStateCity name={"customerCity"} value={row ? row?.customerCity :reduxCustomer?.apiJson?.customerCity} important={true} label="Customer City" options={cities} error={errors} onChange={handleCityChange}  validate={validate}  />
                            <CustomInput important={true} type={"number"} maxLength={6} name="customerPostCode" label="Customer PostCode" value={reduxCustomer?.apiJson?.customerPostCode} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate}  />
                            <CustomInput important={true} name="customerGst" label="Customer Gst" value={reduxCustomer?.apiJson?.customerGst} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate}  />
                            <CustomInput important={true} type={"number"} name="customerContact" maxLength={10} label="Customer Contact" value={reduxCustomer?.apiJson?.customerContact} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate}  />
                            <CustomInput important={true} name="customerPan" label="Customer PAN" value={reduxCustomer?.apiJson?.customerPan} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}   validate={validate} />
                            <CustomInput important={true} name="customerVat" label="Customer VAT" value={reduxCustomer?.apiJson?.customerVat} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <CustomInput important={true} name="customerTan" label="Customer TAN" value={reduxCustomer?.apiJson?.customerTan} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <CustomSelect important={true} name="customerStatus" label="Customer Status" options={statusOption} value={reduxCustomer?.apiJson?.customerStatus} error={errors} reduxState={reduxCustomer?.apiJson} setAction={setCustomerMasterApiJson}  validate={validate} />
                            <SearchableSelect name="siteIds" label="Site" api={searchSite} getFieldName={'siteName'} error={errors} onChange={(e)=>handleOnChange(e,'siteIds')}  validate={validate}  />
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CustomButton text={'Back'} variant='flat' onClick={() => { window.location.pathname = 'master/customer/' }} />
                            <CustomButton type={'submit'}  text={row?._id ? 'Update' : 'Submit'} loading={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
