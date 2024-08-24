import { DASHBOARD_INVENTORY_API_JSON, DASHBOARD_INVENTORY_DATA } from "../../../Action/dashbaord/inventory/dashbaord-inventory-action";

const initialState = {
    doc: null,
    apiJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const DashboardInventoryBatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_INVENTORY_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case DASHBOARD_INVENTORY_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default DashboardInventoryBatchReducer;
