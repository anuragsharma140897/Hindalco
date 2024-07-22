import { SET_INVENTORY_SEARCH_JSON } from "../../Action/Inventory-management/inventory-management-action";

const initialState = {
    doc: null,
    searchJson : {page:1, limit : 10, search : { type:'All' }},
    timestamp: Date.now()
}

const InventoryManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVENTORY_SEARCH_JSON:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default InventoryManagementReducer;