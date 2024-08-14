import { SET_ROLES_AND_PERMISSION } from "../../Action/RolesAndPermission/RolesAndPermissionAction";

const initialState = {
  doc: [
    {
      value: "Dashboard",
      permission: [
        {
          read: true,

        }
      ],
      child: []
    },
    {
      value: "Master",
      permission: [
        {
          read: false,
          write: false,
          delete: false
        }
      ],
      child: [
        {
          value: "USER_MANAGEMENT_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "ROLES_AND_PERMISSION",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "SITE_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "BUILDING_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "READER_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "READER_REPLACEMENT_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "READER_HEALTH_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "PRODUCT_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "COUSTOMER_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "SUPPLIER_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "GENERAL_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },
        {
          value: "READER_BUILDING_MAPPING_MASTER",
          permission: [
            {
              read: false,
              write: false,
              delete: false
            }
          ]
        },

      ]
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
