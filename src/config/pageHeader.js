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
    },

]
