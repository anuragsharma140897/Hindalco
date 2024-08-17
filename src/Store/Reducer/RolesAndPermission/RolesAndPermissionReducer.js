import { addBuilding, addCustomer, addGeneral, addProduct, addReader, addRole, addSite, addSupplier, addUser, deleteBuilding, deleteCustomer, deleteGeneral, deleteProduct, deleteReader, deleteRole, deleteSite, deleteSupplier, deleteUser, searchBuilding, searchCustomer, searchGeneral, searchProduct, searchReader, searchRole, searchSite, searchSupplier, searchUser, updateBuilding, updateCustomer, updateGeneral, updateProduct, updateReader, updateRole, updateSite, updateSupplier, updateUser } from "../../../Constant/Api/Api";
import { SET_ROLES_AND_PERMISSION, SET_ROLES_AND_PERMISSION_API_JSON, SET_ROLES_AND_PERMISSION_MAIN_DATA, SET_ROLES_AND_PERMISSION_SEARCH_JSON } from "../../Action/RolesAndPermission/RolesAndPermissionAction";

const initialState = {
  mainData: null,
  doc: [
    {
      value: "master",
      url: [],
      permission: [
        {
          read: { allowed: false, url: [] },
          write: { allowed: false, url: [] },
          delete: { allowed: false, url: [] },
        }
      ],
      child: [
        {
          value: "user namagement master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchUser] },
              write: { allowed: false, url: [addUser, updateUser] },
              delete: { allowed: false, url: [deleteUser] },
            }
          ]
        },
        {
          value: "roles and permission master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchRole] },
              write: { allowed: false, url: [addRole, updateRole] },
              delete: { allowed: false, url: [deleteRole] },
            }
          ]
        },
        {
          value: "site master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchSite] },
              write: { allowed: false, url: [addSite, updateSite] },
              delete: { allowed: false, url: [deleteSite] },
            }
          ]
        }, {
          value: "buildings master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchBuilding] },
              write: { allowed: false, url: [addBuilding, updateBuilding] },
              delete: { allowed: false, url: [deleteBuilding] },
            }
          ]
        },
        {
          value: "Reader master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchReader] },
              write: { allowed: false, url: [addReader, updateReader] },
              delete: { allowed: false, url: [deleteReader] },
            }
          ]
        }, {
          value: "reader replacement master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        }, {
          value: "reader health master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        }, {
          value: "product master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchProduct] },
              write: { allowed: false, url: [addProduct, updateProduct] },
              delete: { allowed: false, url: [deleteProduct] },
            }
          ]
        },
        {
          value: "Customer master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchCustomer] },
              write: { allowed: false, url: [addCustomer, updateCustomer] },
              delete: { allowed: false, url: [deleteCustomer] },
            }
          ]
        }, {
          value: "supplier master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchSupplier] },
              write: { allowed: false, url: [addSupplier, updateSupplier] },
              delete: { allowed: false, url: [deleteSupplier] },
            }
          ]
        }, {
          value: "general master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [searchGeneral] },
              write: { allowed: false, url: [addGeneral, updateGeneral] },
              delete: { allowed: false, url: [deleteGeneral] },
            }
          ]
        }, {
          value: "reader building mapping master",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        },

      ]
    },
    {
      value: "Device",
      url: [],
      permission: [
        {
          read: { allowed: false, url: [] },
          write: { allowed: false, url: [] },
          delete: { allowed: false, url: [] },
        }
      ],
      child: [
        {
          value: "inbound order",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        }, {
          value: "web receving",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        },
      ]
    },
    {
      value: "inbound",
      url: [],
      permission: [
        {
          read: { allowed: false, url: [] },
          write: { allowed: false, url: [] },
          delete: { allowed: false, url: [] },
        }
      ],
      child: [
        {
          value: "inbound order",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        }, {
          value: "web receving",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        },
      ]
    },
    {
      value: "outbound",
      url: [],
      permission: [
        {
          read: { allowed: false, url: [] },
          write: { allowed: false, url: [] },
          delete: { allowed: false, url: [] },
        }
      ],
      child: [
        {
          value: "outbound order",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        },
        {
          value: "web picking",
          url: [],
          permission: [
            {
              read: { allowed: false, url: [] },
              write: { allowed: false, url: [] },
              delete: { allowed: false, url: [] },
            }
          ]
        },
      ]
    }
  ],
  apiJson: {},
  searchJson: { page: 1, limit: 10, search: {} },
  timestamp: Date.now()
}

const RolesAndPermissionReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_ROLES_AND_PERMISSION:
      return ({ ...state, mainData: action.value, timestamp: Date.now() })
    case SET_ROLES_AND_PERMISSION_MAIN_DATA:
      return ({ ...state, mainData: action.value, timestamp: Date.now() })
    case SET_ROLES_AND_PERMISSION_API_JSON:
      return ({ ...state, apiJson: action.value, timestamp: Date.now() })
    case SET_ROLES_AND_PERMISSION_SEARCH_JSON:
      return ({ ...state, searchJson: action.value, timestamp: Date.now() })
    default:
      return state;
  }
}

export default RolesAndPermissionReducer;
