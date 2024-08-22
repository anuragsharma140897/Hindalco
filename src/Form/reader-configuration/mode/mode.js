import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HitApi } from '../../../Store/Action/Api/ApiAction'
import { editReaderMode, readerMode, readerStatus } from '../../../Constant/Api/Api'

import { setReaderConfigurationApiJson, setReaderConfigurationModeData, setReaderConfigurationSummaryJson } from '../../../Store/Action/device/reader-configuration/reader-configuration-action';
import CustomInput from '../../../Component/ui/form/input/custom-input';
import useValidation from '../../../Hooks/useValidation';
import { ReaderModeSchema } from './modeSchema';
import CustomSwitch from '../../../Component/ui/switch/custom-switch';
import { CompileModeForApiJson, CompileModeForUpdate } from './promiss/modePromiss';
import CustomButton from '../../../Component/ui/buttons/custom-button';

export default function Mode() {

    const { errors, validate } = useValidation(ReaderModeSchema);

    const dispatch = useDispatch()
    const reduxDevice = useSelector(state => state.DeviceReaderReducer)
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)

    const [disable, setDisable] = useState(true)

    useEffect(() => {
        if (reduxReaderConfiguration?.readerLoginData?.message && reduxDevice?.doc !== null && reduxReaderConfiguration?.summary === null) {
            loadSummary()
        }
        if (reduxReaderConfiguration?.readerLoginData?.message && reduxDevice?.doc !== null && reduxReaderConfiguration?.mode === null) {
            loadMode()
        }
    }, [reduxReaderConfiguration])

    const loadSummary = () => {
        var json = {
            token: reduxReaderConfiguration?.readerLoginData?.message,
            ip: reduxDevice?.doc?.readerIp,
        }
        HitApi(json, readerStatus).then((result) => {
            console.log('result', result);
            if (result) {
                dispatch(setReaderConfigurationSummaryJson(result))
            }
        })
    }

    const loadMode = () => {
        var json = {
            token: reduxReaderConfiguration?.readerLoginData?.message,
            ip: reduxDevice?.doc?.readerIp,
        }
        HitApi(json, readerMode).then((result) => {
            if (result) {
                dispatch(setReaderConfigurationModeData(result))
                CompileModeForApiJson(result).then(CompileData => {
                    console.log('CompileData', CompileData);
                    if (CompileData) {
                        dispatch(setReaderConfigurationApiJson(CompileData))
                    }
                })
            }
        })
    }

    const onEditClick = () => {
        const correctPassword = 'Aman@123';
        const userPassword = window.prompt('Please enter your password:');
        if (userPassword === correctPassword) {
            setDisable(false)
        } else if (userPassword === '') {
            console.log('false');
        }
        else {
            alert('Password is incorrect');
        }
    }

    const UpdateReader = () => {
        var apiJson = reduxReaderConfiguration?.apiJson
        var json = {
            token: reduxReaderConfiguration?.readerLoginData?.message,
            ip: reduxDevice?.doc?.readerIp,
        }
        CompileModeForUpdate(apiJson).then(CompileData => {

            Object.assign(CompileData,json)
            HitApi(CompileData,editReaderMode).then(result=>{
                console.log(result);
            })
        })
    }

    return (
        <div className='bg-white p-4 mt-5'>
            <div className='mt-5'>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Filter</div>
                    <div className='grid grid-cols-4 gap-4 mt-4 my-2'>
                        <CustomInput disabled={disable} maxLength={15} name="match" label="Match" value={reduxReaderConfiguration?.apiJson?.match} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                        <CustomInput disabled={disable} maxLength={15} name="operation" label="Operation" value={reduxReaderConfiguration?.apiJson?.operation} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                        <CustomInput disabled={disable} maxLength={15} name="value" label="Value" value={reduxReaderConfiguration?.apiJson?.value} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Mode Specific Settings (Interval)</div>
                    <div className='grid grid-cols-4 gap-4 mt-4 my-2'>
                        <CustomInput disabled={disable} maxLength={15} name="modeSpecificUnit" label="Unit" value={reduxReaderConfiguration?.apiJson?.unit} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                        <CustomInput type={'number'} disabled={disable} maxLength={15} name="modeSpecificvalue" label="Value" value={reduxReaderConfiguration?.apiJson?.value} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Tag Meta Data</div>
                    <div className='grid grid-cols-4 gap-4 mt-4 my-2'>
                        <CustomSwitch disabled={disable} name="ANTENNA" label={'ANTENNA'} value={reduxReaderConfiguration?.apiJson?.ANTENNA} reduxState={reduxReaderConfiguration?.apiJson} errors={errors} setAction={setReaderConfigurationApiJson} />
                        <CustomSwitch disabled={disable} name="RSSI" label={'RSSI'} value={reduxReaderConfiguration?.apiJson?.RSSI} reduxState={reduxReaderConfiguration?.apiJson} errors={errors} setAction={setReaderConfigurationApiJson} />
                        <CustomSwitch disabled={disable} name="CHANNEL" label={'CHANNEL'} value={reduxReaderConfiguration?.apiJson?.CHANNEL} reduxState={reduxReaderConfiguration?.apiJson} errors={errors} setAction={setReaderConfigurationApiJson} />
                        <CustomSwitch disabled={disable} name="SEEN_COUNT" label={'SEEN_COUNT'} value={reduxReaderConfiguration?.apiJson?.SEEN_COUNT} reduxState={reduxReaderConfiguration?.apiJson} errors={errors} setAction={setReaderConfigurationApiJson} />
                        <CustomInput disabled={disable} maxLength={15} name="userDefined" label="User Defined" value={reduxReaderConfiguration?.apiJson?.userDefined} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                    </div>
                </div>
                <div>
                    <div className='font-bold text-base bg-lightpink p-2'>Type</div>
                    <div className='grid grid-cols-4 gap-4 mt-4 my-2'>
                        <CustomInput disabled={disable} maxLength={15} name="type" label="Type" value={reduxReaderConfiguration?.apiJson?.type} error={errors} reduxState={reduxReaderConfiguration?.apiJson} setAction={setReaderConfigurationApiJson} />
                    </div>
                </div>
            </div>
            <div className='mt-5 flex justify-end'>
                <CustomButton type={'submit'} onClick={() => disable ? onEditClick() : UpdateReader()} className={'w-28'} text={disable ? 'Edit' : 'Update'} />
            </div>
        </div>
    )
}
