import { DASHBOARD_BATCH_DATA, DASHBOARD_BATCH_API_JSON, DASHBOARD_INVENTORY_DATA, DASHBOARD_INVENTORY_API_JSON, DASHBOARD_SELECTED_BATCH_ID } from "../../../Action/dashbaord/batch/dashbaord-batch-action";

const initialState = {
    doc: null,
    inventory: null,
    apiJson: { page: 1, limit: 10, search: {} },
    selectedBatchId: null,
    inventoryJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const DashboardBatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_BATCH_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case DASHBOARD_BATCH_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case DASHBOARD_SELECTED_BATCH_ID:
            return ({ ...state, selectedBatchId: action.value, timestamp: Date.now() })
        case DASHBOARD_INVENTORY_DATA:
            return ({ ...state, inventory: action.value, timestamp: Date.now() })
        case DASHBOARD_INVENTORY_API_JSON:
            return ({ ...state, inventoryJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default DashboardBatchReducer;
