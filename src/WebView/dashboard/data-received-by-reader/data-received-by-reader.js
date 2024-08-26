import React, { useEffect, useMemo, useState } from 'react'
import mqttService from '../../../service/mqttService';
import { useDispatch, useSelector } from 'react-redux';
import { setMqttReceivedData } from '../../../Store/Action/mqtt/mqtt-action';
import ControlledTable from '../../../Component/ControlledTable/ControlledTable';
import { TableClass } from '../../../Constant/Classes/Classes';
import { GetMqttReaderColumns } from './data-received-by-reader-column';
import { useColumn } from '../../../Hooks/use-column';

export default function DataReceivedByReader() {
    const dispatch = useDispatch()
    const reduxMqtt = useSelector(state => state.MQTTReducer)
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const columns = useMemo(() => GetMqttReaderColumns())
    const { visibleColumns } = useColumn(columns);

    useEffect(() => {
        let messageIndex = 1;
        const handleConnect = () => {
            setIsConnected(true);
        };

        const handleMessage = (msg) => {
            const parsedMsg = JSON.parse(msg);
            const indexedMsg = { ...parsedMsg, index: messageIndex++ }; // Add index to message
            setMessages((prevMessages) => {
                const updatedMessages = [indexedMsg, ...prevMessages].slice(0, 10);
                dispatch(setMqttReceivedData(updatedMessages));
                return updatedMessages;
            });
        };


        const handleError = (err) => {
            console.error('Connection error: ', err);
        };

        mqttService.on('onConnect', handleConnect);
        mqttService.on('onMessage', handleMessage);
        mqttService.on('onError', handleError);

        mqttService.connect();

        return () => {
            mqttService.disconnect();
        };
    }, []);

    return (
        <div style={{maxHeight : 400, overflow : 'scroll'}}>
            <ControlledTable
                variant="modern"
                // isLoading={loading}
                showLoadingText={true}
                data={reduxMqtt?.doc}
                columns={visibleColumns}
                className={TableClass}
                disablePagination
            />
        </div>
    );
}
