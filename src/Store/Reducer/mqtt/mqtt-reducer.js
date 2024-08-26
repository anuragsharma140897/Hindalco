import { SET_MQTT_RECEIVED_DATA, SET_SELECTED_READER, SET_SELECTED_READER_ANTEENA } from "../../Action/mqtt/mqtt-action";

const initialState = {
    doc: null,
    selected: null,
    selectedAnteena: null,
    timestamp: Date.now()
}

const MQTTReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MQTT_RECEIVED_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_SELECTED_READER:
            return ({ ...state, selected: action.value, timestamp: Date.now() })
        case SET_SELECTED_READER_ANTEENA:
            return ({ ...state, selectedAnteena: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default MQTTReducer;
