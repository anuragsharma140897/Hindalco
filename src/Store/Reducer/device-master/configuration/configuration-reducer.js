import { SET_CONFIGURATION_DATA, SET_CONFIGURATION_JSON, SET_CONFIGURATION_SEARCH_JSON } from "../../../Action/device-master/configuration/configuration-action";

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const ConfigurationReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CONFIGURATION_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_CONFIGURATION_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_CONFIGURATION_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default ConfigurationReducer;