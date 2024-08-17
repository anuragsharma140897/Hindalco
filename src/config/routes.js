
export const routes = {
  panel: {
    dashboard: '/',
    master: {
      users: '/master/users',
      rolesAndPermission: '/master/roles-and-permission',
      siteMaster: '/master/site',
      buildingsMaster: '/master/building',
      readerMaster: '/master/reader',
      readerReplacementMaster: '/master/reader-replacement',
      readerHealthMaster: '/master/reader-health',
      productMaster: '/master/product',
      createProduct: '/master/product/create',
      editProduct: '/master/product/edit/:id',
      customerMaster: '/master/customer',
      createCustomer: '/master/customer/create',
      supplierMaster: '/master/supplier',
      createSupplier: '/master/supplier/create',
      vehicleMaster: '/master/vehicle',
      generalMaster: '/master/general',
      readerBuildingMappingMaster: '/master/reader-builing-mapping',
      zomeMaster: '/master/zone',
      locationMaster: '/master/location',
      tagMaster: '/master/tag',


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
    },
  },
};
