import { SET_PAGINATION } from "../../Action/Pagination/PaginationAction";

const initialState = {
    doc: {current:1, total : 0, limit : 50 },
    timestamp: Date.now()
}

const PaginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default PaginationReducer;