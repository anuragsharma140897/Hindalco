import { SET_CONFIGURATION_ERROR, SET_CONFIGURATION_MASTER_API_JSON, SET_CONFIGURATION_MASTER_DATA, SET_CONFIGURATION_MASTER_SEARCH_JSON } from "../../../Action/master/configuration-master/configuration-master-action";

const initialState = {
    doc: null,
    apiJson: {},
    error : {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const ConfigurationMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONFIGURATION_MASTER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_CONFIGURATION_MASTER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_CONFIGURATION_MASTER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        case SET_CONFIGURATION_ERROR:
            return ({ ...state, error: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default ConfigurationMasterReducer;