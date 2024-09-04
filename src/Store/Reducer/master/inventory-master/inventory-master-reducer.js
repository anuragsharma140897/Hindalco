import { SET_INVENTORY_MASTER_API_JSON, SET_INVENTORY_MASTER_DATA, SET_INVENTORY_MASTER_SEARCH_JSON } from "../../../Action/master/inventory-master/inventory-master-action";

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const InventoryMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVENTORY_MASTER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_INVENTORY_MASTER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_INVENTORY_MASTER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default InventoryMasterReducer;
