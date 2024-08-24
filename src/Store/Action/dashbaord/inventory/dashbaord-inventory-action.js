export const DASHBOARD_INVENTORY_DATA = 'DASHBOARD_INVENTORY_DATA'
export const DASHBOARD_INVENTORY_API_JSON = 'DASHBOARD_INVENTORY_API_JSON'

export const setDashboardInventoryData = (data) => ({ type: DASHBOARD_INVENTORY_DATA, value: data });
export const setDashboardInventoryApiJson = (data) => ({ type: DASHBOARD_INVENTORY_API_JSON, value: data });