import * as t from '@/redux/types';

const initialState = {
    doc: null,
    json: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_EMPLOYEE_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case t.SET_EMPLOYEE_JSON:
            return ({ ...state, json: action.value, timestamp: Date.now() })
        default:
            return state;
    }

}

export default EmployeeReducer;