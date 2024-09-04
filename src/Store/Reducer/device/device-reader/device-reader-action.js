import { SET_DEVICE_READER_API_JSON, SET_DEVICE_READER_DATA, SET_DEVICE_READER_SEARCH_JSON } from "../../../Action/device/device-reader/device-reader-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const DeviceReaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_READER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_DEVICE_READER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_DEVICE_READER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default DeviceReaderReducer;
