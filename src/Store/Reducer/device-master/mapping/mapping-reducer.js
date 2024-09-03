import { SET_MAPPING_API_JSON, SET_MAPPING_SEARCH_JSON, SET_MAPPING_MAPPING_JSON, SET_MAPPING_DATA } from "../../../Action/device-master/mapping/mapping-action";

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    mappingJson: {},
    timestamp: Date.now()
}

const MappingReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MAPPING_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_MAPPING_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_MAPPING_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        case SET_MAPPING_MAPPING_JSON:
            return ({ ...state, mappingJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default MappingReducer;