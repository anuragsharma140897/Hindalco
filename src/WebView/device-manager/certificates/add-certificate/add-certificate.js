import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCertificatesApiJson, setCertificatesData } from '../store/action/certificate-action';
import CustomInput from '../../../../Component/ui/form/input/custom-input';
import DateAndTime from '../../../../Component/ui/date-and-time/date-and-time';
import CustomSwitch from '../../../../Component/ui/switch/custom-switch';
import SearchableSelect from '../../../../Component/ui/form/select/SearchableSelect';
import { addCertificate, searchCertificate, searchGeneral, updateCertificate } from '../../../../Constant/Api/Api';
import { IoMdAddCircle } from "react-icons/io";
import { Colors } from '../../../../Constant/Colors/Color';
import MutlipleInput from '../../../../Component/ui/form/input/mutliple-input';
import CustomButton from '../../devices/component/form/custom-button';
import { HitApi } from '../../../../Store/Action/Api/ApiAction';

function AddCertificate() {
  const _id = window.location.pathname.split('/')[4]
  console.log("id", _id);
  const dispatch = useDispatch();
  const reduxCertificates = useSelector((state) => state.CertificatesReducer);
  const [loading, setLoading] = useState(false)
  const [defaultDates, setDefaultDates] = useState({
    validFrom: new Date(),
    validTo: new Date(),
  });


  if (_id !== undefined && Object.keys(reduxCertificates?.apiJson).length === 0) {
    var json = {
      page: 1,
      limit: 1,
      search: {
        _id: _id
      }
    }
    HitApi(json, searchCertificate).then((result) => {
      console.log("result_____", result);
      if (result?.content) {
        dispatch(setCertificatesApiJson(result?.content?.[0]));
      }

    });
  }


  const [subjectFields, setSubjectFields] = useState({
    CN: '',
    O: '',
    L: '',
    ST: '',
    C: ''
  });

  const handleDateChange = (e, name) => {
    setDefaultDates(prevState => ({
      ...prevState,
      [name]: e
    }));

    if (e) {
      const formattedDate = e.getTime();
      const updatedJson = { ...reduxCertificates?.apiJson, [name]: formattedDate };
      dispatch(setCertificatesApiJson(updatedJson));
    } else {
      const updatedJson = { ...reduxCertificates?.apiJson };
      delete updatedJson[name];
      dispatch(setCertificatesApiJson(updatedJson));
    }
  };
  const handleOnChange = useCallback((e, name) => {
    const { _id, value } = e;
    console.log("e", e);
    var json = reduxCertificates?.apiJson
    if (name === 'keyUsage' || name === 'extendedKeyUsage') {
      var newJson = {
        [name]: [
          {
            "usage": e?.label,
            "critical": e?.value
          }
        ],
      }
    }
    else {
      var newJson = {
        [name]: value,

      }
    }

    Object.assign(json, newJson);
    dispatch(setCertificatesApiJson(json));
  }, [dispatch, reduxCertificates?.apiJson]);

  const handleAddNames = () => {
    const updatedNames = [...(reduxCertificates?.apiJson?.subjectAlternativeNames || []), ""];
    dispatch(setCertificatesApiJson({ ...reduxCertificates.apiJson, subjectAlternativeNames: updatedNames }));
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...reduxCertificates.apiJson.subjectAlternativeNames];
    updatedNames[index] = value;
    dispatch(setCertificatesApiJson({ ...reduxCertificates.apiJson, subjectAlternativeNames: updatedNames }));
  };

  const handleSubject = (e, fieldName) => {
    const updatedSubjectFields = { ...subjectFields, [fieldName]: e.target.value };
    setSubjectFields(updatedSubjectFields);

    const subjectString = Object.entries(updatedSubjectFields)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');

    dispatch(setCertificatesApiJson({ ...reduxCertificates.apiJson, subject: subjectString }));
  };

  const handleSubmit = () => {
    var json = reduxCertificates?.apiJson
    const updatedJson = { ...json, revokedAt: null, revocationReason: null }
    const apiToHit = _id ? updateCertificate : addCertificate
    setLoading(true);
    HitApi(json, apiToHit).then((result) => {
      console.log("result______", result);
      setLoading(false);
      if (result?.status === 200 || result?.status === 201) {
        alert(result.message);
        window.location.pathname = '/device-manager/certificates';
      } else if (result?.status === 409) {
        alert(result?.error?.message);
      } else {
        alert(result.message);
      }
    });

    // HitApi(json,addCertificate).then((res)=>{
    //   console.log("res",res);

    // })

    console.log("updatedJson", updatedJson);

  }


  console.log("reduxCertificates", reduxCertificates);

  return (
    <div>
      <div className='mt-10 bg-white p-10'>
        <div className='grid grid-cols-4 gap-4'>
          <CustomInput important={true} name="certificateName" label="Certificate Name" value={reduxCertificates?.apiJson?.certificateName} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <SearchableSelect name="certificateType" label="Certificate Type" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ usedBy: 'certificateType' }} value={reduxCertificates?.apiJson?.roleName} reduxState={reduxCertificates?.apiJson} onChange={(e) => handleOnChange(e, 'certificateType')} />
          <CustomInput important={true} name="version" label="Certificate Version" value={reduxCertificates?.apiJson?.version} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <CustomInput important={true} name="issuer" label="Certificate Issuer" value={reduxCertificates?.apiJson?.issuer} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <CustomInput important={true} name="serialNumber" label="Certificate SerialNumber" value={reduxCertificates?.apiJson?.serialNumber} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <DateAndTime lable={"Valid From"} onChange={(e) => handleDateChange(e, "validFrom")} value={defaultDates.validFrom} />
          <DateAndTime lable={"Valid To"} onChange={(e) => handleDateChange(e, "validTo")} value={defaultDates.validTo} />
          <SearchableSelect type={'custom'} name="keyUsage" label="Key Usage" api={searchGeneral}  getFieldName={'value'} dynamicSearch={{ usedBy: 'keyUsage' }} value={reduxCertificates?.apiJson?.roleName} reduxState={reduxCertificates?.apiJson} onChange={(e) => handleOnChange(e, 'keyUsage')} />
          <SearchableSelect type={'custom'} name="extendedKeyUsage" label="Extended Key Usage" api={searchGeneral} getFieldName={'value'} dynamicSearch={{ usedBy: 'extendedKeyUsage' }} value={reduxCertificates?.apiJson?.roleName} reduxState={reduxCertificates?.apiJson} onChange={(e) => handleOnChange(e, 'extendedKeyUsage')} />
          <CustomInput important={true} name="publicKey" label="Public Key" value={reduxCertificates?.apiJson?.publicKey} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <CustomInput important={true} name="signature" label="Certificate Signature" value={reduxCertificates?.apiJson?.signature} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
          <CustomSwitch name="isRevoked" label={'Revoked'} value={reduxCertificates?.apiJson?.isRevoked} reduxState={reduxCertificates?.apiJson} setAction={setCertificatesApiJson} />
        </div>
        <div className='mt-5'>
          <div className='mb-5'>
            <div className='font-bold mb-5'>Subjects</div>
            <div className='grid grid-cols-4 gap-4'>
              <MutlipleInput label={"CN"} value={subjectFields.CN} onChange={(e) => handleSubject(e, 'CN')} />
              <MutlipleInput label={"O"} value={subjectFields.O} onChange={(e) => handleSubject(e, 'O')} />
              <MutlipleInput label={"L"} value={subjectFields.L} onChange={(e) => handleSubject(e, 'L')} />
              <MutlipleInput label={"ST"} value={subjectFields.ST} onChange={(e) => handleSubject(e, 'ST')} />
              <MutlipleInput label={"C"} value={subjectFields.C} onChange={(e) => handleSubject(e, 'C')} />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <div className='font-bold mb-5 flex items-center gap-x-5'>
            <div>Subject Alternative Names</div>
            <IoMdAddCircle size={25} color={Colors.LOGINRED} onClick={handleAddNames} />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {reduxCertificates?.apiJson?.subjectAlternativeNames?.map((name, index) => (
              <MutlipleInput name={`name${index + 1}`} label={'Name'} value={name} onChange={(e) => handleNameChange(index, e.target.value)} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-3 justify-end mt-10'>
        <CustomButton text={'Back'} onClick={() => { window.location.pathname = '/device-manager/broker' }} />
        <CustomButton type={'submit'} variant='solid' text={_id ? "Update" : 'Submit'} loading={loading} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AddCertificate;
