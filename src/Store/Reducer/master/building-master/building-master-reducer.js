import { SET_BUILDING_MASTER_API_JSON, SET_BUILDING_MASTER_DATA, SET_BUILDING_MASTER_SEARCH_JSON, SET_BUILDING_MASTER_SELECTED_BUILDING_ID } from "../../../Action/master/building-master/building-master-action";

const initialState = {
    doc: null,
    selectedBuildingId: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const BuildingMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDING_MASTER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_BUILDING_MASTER_SELECTED_BUILDING_ID:
            return ({ ...state, selectedBuildingId: action.value, timestamp: Date.now() })
        case SET_BUILDING_MASTER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_BUILDING_MASTER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default BuildingMasterReducer;
