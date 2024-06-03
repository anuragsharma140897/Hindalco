export const routes = {
  panel: {
    dashboard: '/',
    userManagement: { users: '/user-management/users', rolesAndPermission: '/user-management/roles-and-permission' },
    locationMapping: { units: '/location-mapping/units', buildings: '/location-mapping/buildings', mapping: '/location-mapping/mapping' },
    deviceManagement: {
      readers: '/device-management/readers', readerAction: '/device-management/roles-and-permission', placement: '/device-management/placement',
      readerType: '/device-management/reader-type', readerHealth: '/device-management/reader-health', readerReplacement: '/device-management/reader-replacement',
    },
    inventoryManagement: '/inventory-management',
    erp: '/erp',
    deviceAndBuildingMapping: '/device-and-building-mapping',
    reports: '/reports',
  },
  profile: {
    edit : '/profile/edit',
    chnagePassword : '/profile/change-password'
  },
  forms: {
    
  }
};
