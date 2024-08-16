import { SET_USER_API_JSON, SET_USER_DATA, SET_USER_SEARCH_JSON } from "../../Action/user-management/user-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_USER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_USER_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default UserReducer;
