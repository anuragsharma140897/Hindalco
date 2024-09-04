import { SET_INVENTORIES_SEARCH_JSON } from "../../Action/Inventories/InventoriesAction";

const initialState = {
    doc: null,
    searchJson : {page:1, limit : 10, search : { type:'All' }},
    timestamp: Date.now()
}

const InventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVENTORIES_SEARCH_JSON:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default InventoryReducer;