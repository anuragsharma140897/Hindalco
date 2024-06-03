import { SET_ROLES_AND_PERMISSION } from "../../Action/RolesAndPermission/RolesAndPermissionAction";

const initialState = {
    doc: [
        { "dashboard": { read: false, write: false, delete: false } },
        { "user management": { read: false, write: false, delete: false } },
        { "location mapping": { read: false, write: false, delete: false } },
        { "device management": { read: false, write: false, delete: false } },
        { "inventory management": { read: false, write: false, delete: false } },
        { "erp": { read: false, write: false, delete: false } },
        { "reoprts": { read: false, write: false, delete: false } },
    ],
    timestamp: Date.now()
}

const RolesAndPermissionReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ROLES_AND_PERMISSION:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default RolesAndPermissionReducer;