import React, { useEffect } from 'react'
import { HitApi, HitApiXML } from '../../../Store/Action/Api/ApiAction'
import { getAccessInMqtt, viewTopics } from '../../../Constant/Api/Api'
import { useDispatch, useSelector } from 'react-redux'
import { setReaderConfigurationApiJson, setReaderConfigurationData } from '../../../Store/Action/device/reader-configuration/reader-configuration-action'

import demo from './demo.json'
import MQTTUI from '../ui/MQTTUI'

export default function Configuration() {
    const dispatch = useDispatch()
    const reduxDevice = useSelector(state => state.DeviceReaderReducer)
    const reduxReaderConfiguration = useSelector(state => state.ReaderConfigurationReducer)

    useEffect(() => {
        if (reduxReaderConfiguration?.readerLoginData?.message && reduxDevice?.doc !== null && reduxReaderConfiguration?.configuration === null) {
            loadConnection(reduxDevice?.doc)
        }



    }, [reduxReaderConfiguration])

    const loadConnection = (row) => {
        var json = {
            "ip": row?.readerIp,
            "username": row?.readerUsername,
            "password": row?.readerPassword,
        }

        HitApiXML(json, getAccessInMqtt).then((result) => {

            if (result) {
                const parser = new DOMParser();
                const xmlDoc = parser?.parseFromString(result, "application/xml");
                const sessionIDElement = xmlDoc?.getElementsByTagName("g3:sessionID")[0];
                const sessionIDValue = sessionIDElement ? sessionIDElement.textContent : '';
                dispatch(setReaderConfigurationData(sessionIDValue))
                // loadViewTopic(sessionIDValue)
            }
        })

    }

    const loadViewTopic = (sessionIDValue) => {
        var json = {
            "ip": reduxDevice?.doc?.readerIp,
            "sessionId": sessionIDValue
        }



        HitApiXML(json, viewTopics).then((result) => {

            if (result) {
                // dispatch(setReaderConfigurationData(result))
            }
        })
    }

    return (
        <div className="container mx-auto p-4">
            <MQTTUI data={demo?.[0]} />
        </div>
    )
}
