import React from 'react'
import CustomInput from '../../../../../Component/ui/form/input/custom-input'
import CustomCheckBox from '../../../../../Component/ui/form/checkbox/custom-checkbox'
import CustomSelect from '../../../../../Component/ui/form/select/custom-select'
import { useSelector } from 'react-redux';
import { setConfigurationMasterApiJson } from '../../../../../Store/Action/master/configuration-master/configuration-master-action';

function Connection() {
    const reduxConfiguration = useSelector(state => state.ConfigurationMasterReducer);

    return (
        <div className=' py-5 bg-white'>
            <div className='grid grid-cols-3 gap-x-4'>
                <CustomInput important={true} name="endpointhostname" label="Host Name" value={reduxConfiguration?.apiJson?.endpointhostname} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                <CustomInput important={true} name="endpointhostport" label="Port" value={reduxConfiguration?.apiJson?.endpointhostport} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                <CustomInput important={true} name="endpointhostprotocol" label="Protocol" value={reduxConfiguration?.apiJson?.endpointhostprotocol} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
            </div>
            <div className='grid grid-cols-3 gap-x-4'>
                <CustomInput important={true} name="additionalclientId" label="Client Id" value={reduxConfiguration?.apiJson?.additionalclientId} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                <CustomInput important={true} name="additionalalive" label="Keep Alive" value={reduxConfiguration?.apiJson?.additionalalive} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                <CustomCheckBox name="additionalcleanSession" label="Clean Session" value={reduxConfiguration?.apiJson?.additionalcleanSession} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson} />
                <CustomCheckBox name="additionaldebug" label="Debug" value={reduxConfiguration?.apiJson?.additionaldebug} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
                <CustomCheckBox name="additionalbasicAuth" label="Basic Authentication" value={reduxConfiguration?.apiJson?.additionalbasicAuth} error={reduxConfiguration?.error} reduxState={reduxConfiguration?.apiJson} setAction={setConfigurationMasterApiJson}  />
            </div>

        </div>
    )
}

export default Connection