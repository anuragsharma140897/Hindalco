
export const routes = {
  panel: {
    dashboard: '/',
    master: {
      users: '/master/users',
      rolesAndPermission: '/master/roles-and-permission',
      siteMaster : '/master/site',
      buildingsMaster : '/master/building',
      readerMaster : '/master/reader',
      readerReplacementMaster : '/master/reader-replacement',
      readerHealthMaster : '/master/reader-health',
      productMaster : '/master/product',
      createProduct : '/master/product/create',
      customerMaster : '/master/customer',
      createCustomer : '/master/customer/create',
      supplierMaster : '/master/supplier',
      createSupplier : '/master/supplier/create',
      generalMaster : '/master/general',
      readerBuildingMappingMaster : '/master/reader-builing-mapping',
    },
    inbond: {
      inboundOrder: '/inbond/inbound-order',
      webReceiving: '/inbond/web-receiving',
      inboundCreate : '/inbond/inbound-create',
    },
    outbond: {
      outboundOrder: '/outbond/outbound-order',
      webPicking: '/outbond/web-picking',
      outboundCreate : '/outbond/outbound-create',
    },
  },
};
