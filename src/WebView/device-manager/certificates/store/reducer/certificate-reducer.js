
import { SET_CERTIFICATES_API_JSON, SET_CERTIFICATES_DATA, SET_CERTIFICATES_SEARCH_JSON } from "../action/certificate-action"

const initialState = {
    doc: null,
    apiJson: {},
    searchJson: { page: 1, limit: 10, search: {} },
    timestamp: Date.now()
}

const CertificatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CERTIFICATES_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case SET_CERTIFICATES_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_CERTIFICATES_SEARCH_JSON:
            return ({ ...state, searchJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default CertificatesReducer;
