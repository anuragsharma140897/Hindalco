
export const roleData = [
    {
        id: 0, index: 1, name: 'Super Admin', permission: [
            { "dashboard": { read: true, write: true, delete: true } },
            { "user management": { read: true, write: true, delete: true } },
        ]
    },
    {
        id: 1, index: 2, name: 'Admin', permission: [
            { "dashboard": { read: true, write: true, delete: false } },
            { "user management": { read: true, write: true, delete: false } },
        ]
    },
    {
        id: 2, index: 3, name: 'Sub Admin', permission: [
            { "dashboard": { read: true, write: false, delete: false } },
            { "user management": { read: true, write: false, delete: false } },
        ]
    },

]