import { combineReducers } from "redux"
import AuthReducer from "@/redux/reducer/auth/auth-reducer";

const rootReducer = combineReducers({
    AuthReducer : AuthReducer
})

export default rootReducer;