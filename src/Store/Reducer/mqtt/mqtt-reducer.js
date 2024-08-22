import { SET_MQTT_RECEIVED_DATA, SET_SELECTED_READER } from "../../Action/mqtt/mqtt-action";

const initialState = {
    doc:null,
    selected: null,
    timestamp: Date.now()
}

const MQTTReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MQTT_RECEIVED_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_SELECTED_READER:
            return ({ ...state, selected: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default MQTTReducer;
