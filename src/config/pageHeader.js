import { routes } from "./routes";

export const pageHeader = [
    {
        title: 'User Management', breadcrumb: [
            { href: routes?.panel?.userManagement?.users, name: 'Users' },
            { name: 'List' }
        ],
    }, {
        title: 'Role And Permission', breadcrumb: [
            { href: routes?.panel?.userManagement?.users, name: 'Roles And Permission' },
            { name: 'List' }
        ],
    }, {
        title: 'Site Master', breadcrumb: [
            { href: routes?.panel?.master?.siteMaster, name: 'Site Master' },
            { name: 'List' }
        ],
    }, {
        title: 'Building Master', breadcrumb: [
            { href: routes?.panel?.master?.buildingsMaster, name: 'Building Master' },
            { name: 'List' }
        ],
    }, {
        title: 'Reader Master', breadcrumb: [
            { href: routes?.panel?.master?.readerMaster, name: 'Reader Master' },
            { name: 'List' }
        ],
    },
    {
        title: 'Product Master', breadcrumb: [
            { href: routes?.panel?.master?.productMaster, name: 'Product Master' },
            { name: 'List' }
        ],
    }, {
        title: 'Customer Master', breadcrumb: [
            { href: routes?.panel?.master?.customerMaster, name: 'Customer Master' },
            { name: 'List' }
        ],
    },
    {
        title: 'Create Product', breadcrumb: [
            { href: routes?.panel?.master?.productMaster, name: 'Product Master' },
            { href: routes?.panel?.master?.createProduct, name: 'Create' },
            { name: 'List' }
        ],
    },
    {
        title: 'Reports', breadcrumb: [],
    },

]
