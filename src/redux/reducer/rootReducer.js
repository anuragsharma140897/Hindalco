import { combineReducers } from "redux"
import MapviewReducer from "./mapview/mapview-reducer";
import RoadReducer from "./roads/roads-reducer";
import EmployeeReducer from "./employee/employee-reducer";

const rootReducer = combineReducers({
    MapviewReducer : MapviewReducer,
    RoadReducer : RoadReducer,
    EmployeeReducer : EmployeeReducer
})

export default rootReducer;