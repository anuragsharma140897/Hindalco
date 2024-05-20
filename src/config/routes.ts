export const routes = {
  panel: {
    dashboard: '/',
    mapview: '/mapview',
    compactionreport: '/compaction-report',
    alerts: '/alerts',
    roads: '/roads',
    employee : '/employee',
    addemployee : '/employee/add',

  },
  profile: {

  },
  forms: {

  }, eCommerce: {
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    dashbaord : '/'
  }
};
