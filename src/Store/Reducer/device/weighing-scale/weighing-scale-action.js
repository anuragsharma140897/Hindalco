import { SET_WEIGHING_SCALE_API_JSON, SET_WEIGHING_SCALE_DATA, SET_WEIGHING_SCALE_SEARCH_JSON } from "../../../Action/device/weighing-scale/weighing-scale-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const WeighingScaleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEIGHING_SCALE_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_WEIGHING_SCALE_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_WEIGHING_SCALE_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default WeighingScaleReducer;
