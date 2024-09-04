
export const SET_SELECTED_READER = 'SET_SELECTED_READER'
export const SET_SELECTED_READER_ANTEENA = 'SET_SELECTED_READER_ANTEENA'
export const SET_MQTT_RECEIVED_DATA = 'SET_MQTT_RECEIVED_DATA'

export const setMqttReceivedData = (data) => ({ type: SET_MQTT_RECEIVED_DATA, value: data });
export const setSelectedReader = (data) => ({ type: SET_SELECTED_READER, value: data });
export const setSelectedReaderAnteena = (data) => ({ type: SET_SELECTED_READER_ANTEENA, value: data });