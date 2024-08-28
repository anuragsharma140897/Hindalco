import { SET_ADDED_PRODUCT, SET_INBOUND_API_JSON, SET_INBOUND_DATA, SET_INBOUND_SEARCH_JSON } from "../../Action/inbound/inbound-action";

const initialState = {
    doc: [],
    apiJson: {},
    productAdded: [],
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const InboundReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INBOUND_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_INBOUND_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_INBOUND_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        case SET_ADDED_PRODUCT:
            return ({ ...state, productAdded: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default InboundReducer;
