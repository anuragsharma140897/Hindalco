import { SET_DEVICES_API_JSON, SET_DEVICES_DATA, SET_DEVICES_SEARCH_JSON } from "../../../Action/device-master/devices/device-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const DevicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICES_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_DEVICES_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_DEVICES_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default DevicesReducer;
