import {  SET_OUTBOUND_ADDED_VEHICLE, SET_OUTBOUND_API_JSON, SET_OUTBOUND_DATA, SET_OUTBOUND_SEARCH_JSON } from "../../Action/outbound/outbound-action";

const initialState = {
    doc: [],
    apiJson: {},
    vehicleAdded: [],
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const OutboundReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OUTBOUND_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_OUTBOUND_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_OUTBOUND_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        case SET_OUTBOUND_ADDED_VEHICLE:
            return ({ ...state, vehicleAdded: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default OutboundReducer;
