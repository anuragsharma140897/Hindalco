import { SET_SITE_MASTER_API_JSON, SET_SITE_MASTER_DATA } from "../../../Action/master/site-master/site-master-action";

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: { type: 'All' } },
    timestamp: Date.now()
}

const SiteMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SITE_MASTER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_SITE_MASTER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default SiteMasterReducer;
