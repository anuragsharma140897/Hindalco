import { SET_AUTH } from "../../../Action/Auth/Sample/AuthAction";

const initialState = {
    doc: null,
    timestamp: Date.now()
}

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_AUTH:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default AuthReducer;