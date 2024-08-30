
export const routes = {
  panel: {
    dashboard: '/',
    master: {
      users: '/master/users',
      rolesAndPermission: '/master/roles-and-permission',
      siteMaster : '/master/site',
      buildingsMaster : '/master/building',
      // readerMaster : '/master/reader',
      // readerReplacementMaster : '/master/reader-replacement',
      // readerHealthMaster : '/master/reader-health',
      productMaster : '/master/product',
      createProduct : '/master/product/create',
      editProduct : '/master/product/edit/:id',
      customerMaster : '/master/customer',
      createCustomer : '/master/customer/create',
      supplierMaster : '/master/supplier',
      createSupplier : '/master/supplier/create',
      generalMaster : '/master/general',
      mappingMaster : '/master/mapping-master',
      // readerBuildingMappingMaster : '/master/reader-builing-mapping',
      zomeMaster: '/master/zone',
      locationMaster: '/master/location',
      tagMaster: '/master/tag',
      configurationMaster: '/master/configuration',
      createConfigurationMaster: '/master/configuration/create',
      editConfigurationMaster: '/master/configuration/edit/:id',
      vehicleMaster: '/master/vehicle',
      innventoryMaster: '/master/inventory',
      inventoryInventories: '/master/inventory/:id',
    },
    device: {
      readerMaster : '/device/reader',
      createReader : '/device/reader/add',
      editReader : '/device/reader/edit/:id',
      readerConfiguration : '/device/reader/reader-configuration/:id',
      readerReplacementMaster : '/device/reader-replacement',
      readerHealthMaster : '/device/reader-health',
      readerBuildingMappingMaster : '/device/reader-builing-mapping',
      weighingScale : '/device/weighingscale',
      createWeighingScale : '/device/weighingscale/create',
      editWeighingScale : '/device/weighingscale/edit/:id',
    },
    deviceManager:{
      devices : '/device-manager/devices',
      addDevice : '/device-manager/devices/add',
      broker : '/device-manager/broker',
      deviceProfiler : '/device-manager/devices-profile',
      apiService : '/device-manager/api-service',
      mapper : '/device-manager/mapper',
      certificates : '/device-manager/certificates',
      addCertificates : '/device-manager/certificates/add',
    },
    inbond: {
      inboundOrder: '/inbond/inbound-order',
      webReceiving: '/inbond/web-receiving',
      inboundCreate: '/inbond/inbound-create',
    },
    outbond: {
      outboundOrder: '/outbond/outbound-order',
      webPicking: '/outbond/web-picking',
      outboundCreate: '/outbond/outbound-create',
      outboundEdit: '/outbond/outbound-edit/:id',
    },
  },
};
