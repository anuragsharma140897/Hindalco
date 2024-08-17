import { SET_READER_CONFIGURATION_API_JSON, SET_READER_CONFIGURATION_DATA, SET_READER_CONFIGURATION_LOGIN_DATA, SET_READER_CONFIGURATION_NETWORK_DATA, SET_READER_CONFIGURATION_SEARCH_JSON, SET_READER_CONFIGURATION_SUMMARY_DATA, SET_READER_CONFIGURATION_TOPIC_DATA } from "../../../Action/device/reader-configuration/reader-configuration-action"

const initialState = {
    doc: null,
    readerLoginData: null,
    summary: null,
    configuration: null,
    topic: null,
    network: null,
    ntp: null,
    status: null,
    logs: null,
    certificates: null,
    mode: null,
    reboot: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const ReaderConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_READER_CONFIGURATION_DATA:
            return ({ ...state, configuration: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_LOGIN_DATA:
            return ({ ...state, readerLoginData: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_TOPIC_DATA:
            return ({ ...state, topic: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_SUMMARY_DATA:
            return ({ ...state, summary: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_NETWORK_DATA:
            return ({ ...state, network: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_READER_CONFIGURATION_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default ReaderConfigurationReducer;
