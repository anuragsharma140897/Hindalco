import { SET_SERVICE_MASTER_JSON,SET_API_JSON } from "../Action/ServiceMasterAction"

const initialState = {
    doc:null,
    apiJson : {},
    timestamp: Date.now()
}

const ServiceMasterReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SERVICE_MASTER_JSON:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
            case  SET_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default ServiceMasterReducer;