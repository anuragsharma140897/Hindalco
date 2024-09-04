import { SET_SUPPLIER_API_JSON, SET_SUPPLIER_DATA, SET_SUPPLIER_SEARCH_JSON } from "../../../Action/master/supplier-master/supplier-master-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const SupplierMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUPPLIER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_SUPPLIER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_SUPPLIER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default SupplierMasterReducer;
