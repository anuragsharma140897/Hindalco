import { SET_BUILDING_MASTER_API_JSON, SET_BUILDING_MASTER_DATA } from "../../../Action/master/building-master/building-master-action";

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: { type: 'All' } },
    timestamp: Date.now()
}

const BuildingMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDING_MASTER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_BUILDING_MASTER_API_JSON:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default BuildingMasterReducer;
