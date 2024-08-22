import { SET_SEARCHABLE_SELECT_DATA } from "../../../Action/common/searcheable-select/searcheable-select-action";

const initialState = {
    doc: null,
    timestamp: Date.now()
}

const SearchableSelectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCHABLE_SELECT_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default SearchableSelectReducer;