import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useValidation from '../../../Hooks/useValidation';
import CustomButton from '../../../Component/ui/buttons/custom-button';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import {  addSupplier, searchGeneral, searchSite,  updateSupplier } from '../../../Constant/Api/Api';
import { HitApi } from '../../../Store/Action/Api/ApiAction';
import { supplierMasterVariable as variable } from '../../../Constant/variables/master/supplier-master/supplier-master.variable';
import SearchableSelect from '../../../Component/ui/form/select/SearchableSelect';
import CustomSelect from '../../../Component/ui/form/select/custom-select';
import SearchCountryStateCity from '../../../Component/ui/form/select/search-country-state-city';
import { Country, State, City } from 'country-state-city';
import { useCallback } from 'react';
import { setSupplierApiJson } from '../../../Store/Action/master/supplier-master/supplier-master-action';
import { addSupplierSchema } from '../../../Utils/validators/master/supplier-master/add-supplier.schema';
import { setSearchableSelectSelectedData } from '../../../Store/Action/common/searcheable-select/searcheable-select-action';




export default function AddSupplierMaster({ row }) {

    console.log("row",row);
    const dispatch = useDispatch();
    const reduxSupplier = useSelector(state => state.SupplierMasterReducer);

    const reduxUser = useSelector(state => state.UserReducer);
    const [countries, setCountries] = useState(reduxSupplier?.apiJson?.customerCountry || []);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const { errors, validate } = useValidation(addSupplierSchema);

    const statusOption = [
        { label: 'Active', value: 'Active' },
        { label: 'InActive', value: 'InActive' },
        { label: 'Blocked', value: 'Blocked' },
    ];

    useEffect(() => {
        if (row?.id) {
            loadDefault(row);
            var json = [{name:'supplierGroup',value:row?.supplierGroup},{name:'supplierType',value:row?.supplierType}]
            dispatch(setSearchableSelectSelectedData(json))
        }

        const allCountries = Country.getAllCountries().map(country => ({
            label: country.name,
            value: country.name
        }));
        setCountries(allCountries);
    }, [row?.id]);

    const loadDefault = useCallback((row) => {
        var json = { ...reduxSupplier?.apiJson };
        Object.assign(json, ...Object.keys(variable).map(key => ({ [variable[key]]: row[key] })));
        dispatch(setSupplierApiJson(json));
    }, [dispatch, reduxSupplier?.apiJson]);

    const handleSubmit = (e) => {
        e.preventDefault();
        var json = reduxSupplier?.apiJson;
        const validationErrors = validate(json);

        console.log("validationErrors", validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            const apiCall = row?.id ? updateSupplier : addSupplier;
            const updatedJson = { ...json, id: row?.id, status: json?.status || 'Active' };

            HitApi(updatedJson, apiCall).then((result) => {
                setLoading(false);
                if (result?.status === 200 || result?.status === 201) {
                    alert(result.message);
                    window.location.pathname = '/master/supplier';
                } else if (result?.status === 409) {
                    alert(result?.error?.message);
                } else {
                    alert(result.message);
                }
            });
        }
    };

    const handleOnChange = useCallback((e, name) => {
        const { id, value } = e;
        const newJson = { [name]: name === 'siteIds' ? id : value };
        const updatedJson = { ...reduxSupplier?.apiJson, ...newJson };
        dispatch(setSupplierApiJson(updatedJson));
    }, [dispatch, reduxSupplier?.apiJson]);

    const handleCountry = useCallback((e) => {
        const selectedCountryName = e?.value;
        const selectedCountry = Country.getAllCountries().find(country => country.name === selectedCountryName)?.isoCode;

        if (!selectedCountry) {
            console.error("Invalid country selected.");
            return;
        }

        const updatedJson = { ...reduxSupplier?.apiJson, supplierCountry: selectedCountryName };
        dispatch(setSupplierApiJson(updatedJson));

        const states = State.getStatesOfCountry(selectedCountry).map(state => ({
            label: state.name,
            value: state.name
        }));
        setStates(states);
        setCities([]);
    }, [dispatch, reduxSupplier?.apiJson]);

    const handleStateChange = useCallback((e) => {
        const selectedStateName = e?.value;
        const countryISOCode = Country.getAllCountries().find(country => country.name === reduxSupplier?.apiJson?.supplierCountry)?.isoCode;
        const stateISOCode = State.getStatesOfCountry(countryISOCode).find(state => state.name === selectedStateName)?.isoCode;

        if (!stateISOCode) {
            console.error("Invalid state selected.");
            return;
        }

        const updatedJson = { ...reduxSupplier?.apiJson, supplierState: selectedStateName };
        dispatch(setSupplierApiJson(updatedJson));

        const cities = City.getCitiesOfState(countryISOCode, stateISOCode).map(city => ({
            label: city.name,
            value: city.name
        }));
        setCities(cities);
    }, [dispatch, reduxSupplier?.apiJson]);

    const handleCityChange = useCallback((e) => {
        const selectedCity = e?.value;
        const updatedJson = { ...reduxSupplier?.apiJson, supplierCity: selectedCity };
        dispatch(setSupplierApiJson(updatedJson));
    }, [dispatch, reduxSupplier?.apiJson]);


    console.log("reduxSupplier", reduxSupplier);
    return (
        <div>
            <div className='p-10 rounded-xl bg-white'>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 lg:space-y-6">
                        <div className='grid grid-cols-4 gap-4 '>
                            <CustomInput important={true} name="supplierName" label="Supplier Name" value={reduxSupplier?.apiJson?.supplierName} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson} validate={validate} />
                            <CustomInput important={true} name="supplierCode" label="Supplier Code" value={reduxSupplier?.apiJson?.supplierCode} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson} validate={validate} />
                            <SearchableSelect name="supplierGroup" label="Supplier Group" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'suppliergroup'} getFieldName={'value'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} onChange={(e) => handleOnChange(e, 'supplierGroup')} validate={validate} />
                            <CustomInput important={true} name="supplierContactEmail" label="Supplier Email" value={reduxSupplier?.apiJson?.supplierContactEmail} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson} validate={validate}  />
                            <SearchableSelect name="supplierType" label="Supplier Type" api={searchGeneral} checkServerKey={'fieldName'} checkServerValue={'supplierType'} getFieldName={'value'} value={reduxUser?.apiJson?.roleName} error={errors} reduxState={reduxUser?.apiJson} onChange={(e) => handleOnChange(e, 'supplierType')} validate={validate}  />
                            <CustomInput important={true} name="supplierAddress1" label="Supplier Add1" value={reduxSupplier?.apiJson?.supplierAddress1} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} name="supplierAddress2" label="Supplier Add2" value={reduxSupplier?.apiJson?.supplierAddress2} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}   validate={validate}/>
                            <CustomInput important={true} name="supplierLandmark" label="Supplier Landmark" value={reduxSupplier?.apiJson?.supplierLandmark} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate}/>
                            <SearchCountryStateCity name={"supplierCountry"} value={row ? row?.supplierCountry : reduxSupplier?.apiJson?.supplierCountry} important={true} label="Supplier Country" options={countries} onChange={handleCountry} error={errors}  validate={validate}/>
                            <SearchCountryStateCity name={"supplierState"} value={row ? row?.supplierState : reduxSupplier?.apiJson?.supplierState} important={true} label="Supplier State" options={states} onChange={handleStateChange} error={errors}  validate={validate}/>
                            <SearchCountryStateCity name={"supplierCity"} value={row ? row?.supplierCity : reduxSupplier?.apiJson?.supplierCity} important={true} label="Supplier City" options={cities} onChange={handleCityChange}  error={errors}  validate={validate}/>
                            <CustomInput important={true} type={"number"} maxLength={6} name="supplierPostCode" label="Supplier PostCode" value={reduxSupplier?.apiJson?.supplierPostCode} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} name="supplierGst" label="Supplier Gst" value={reduxSupplier?.apiJson?.supplierGst} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} type={"number"} name="supplierContactPhone" maxLength={10} label="Supplier Contact" value={reduxSupplier?.apiJson?.supplierContactPhone} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} name="supplierPan" label="Supplier PAN" value={reduxSupplier?.apiJson?.supplierPan} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} name="supplierVat" label="Supplier VAT" value={reduxSupplier?.apiJson?.supplierVat} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomInput important={true} name="supplierTan" label="Supplier TAN" value={reduxSupplier?.apiJson?.supplierTan} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate} />
                            <CustomSelect important={true} name="supplierStatus" label="Supplier Status" options={statusOption} value={reduxSupplier?.apiJson?.supplierStatus} error={errors} reduxState={reduxSupplier?.apiJson} setAction={setSupplierApiJson}  validate={validate}/>
                            <SearchableSelect name="siteIds" label="Site" api={searchSite} getFieldName={'siteName'} error={errors} onChange={(e) => handleOnChange(e, 'siteIds')}  validate={validate} />
                        </div>
                        <div className='flex gap-3 justify-end'>
                            <CustomButton text={'Back'} variant='flat' onClick={() => { window.location.pathname = 'master/supplier' }} />
                            <CustomButton type={'submit'} className={''} text={row?.id ? 'Update' : 'Submit'} loading={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
