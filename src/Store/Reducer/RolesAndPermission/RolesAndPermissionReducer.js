import { SET_ROLES_AND_PERMISSION } from "../../Action/RolesAndPermission/RolesAndPermissionAction";

const initialState = {
    doc: [
        {
          value: "USER_MANAGEMENT",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ],
          child: [
            {
              value: "USER_VIEW",
              permission: [
                {
                  read: false,
                  write: false,
                  delete: false
                }
              ]
            },
            {
              value: "USER_EDIT",
              permission: [
                {
                  read: false,
                  write: false,
                  delete: false
                }
              ]
            }
          ]
        },
        {
          value: "REPORT_MANAGEMENT",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ],
          child: []
        }
      ]
      
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
