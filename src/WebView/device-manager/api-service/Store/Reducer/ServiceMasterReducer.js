import { SET_API_JSON, SET_SERVICE_MASTER_JSON, SET_SERVICE_REQUEST_DATA, SET_SERVICE_GLOBAL_VAR, SET_SERVICE_GLOBAL_RES,SET_WORKING_SERVICE_NAME } from "../Action/ServiceMasterAction"

const initialState = {
    doc: null,
    apiJson: {},
    requestDoc: null,
    globalVariables: null,
    globalResponse: [],
    workingServiceName: null,
    timestamp: Date.now()
}

const ServiceMasterReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SERVICE_MASTER_JSON:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_SERVICE_REQUEST_DATA:
            return ({ ...state, requestDoc: action.value, timestamp: Date.now() })
        case SET_SERVICE_GLOBAL_VAR:
            return ({ ...state, globalVariables: action.value, timestamp: Date.now() })
        case SET_SERVICE_GLOBAL_RES:
            return ({ ...state, globalResponse: action.value, timestamp: Date.now() })
        case SET_WORKING_SERVICE_NAME:
            return ({ ...state, workingServiceName: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default ServiceMasterReducer;