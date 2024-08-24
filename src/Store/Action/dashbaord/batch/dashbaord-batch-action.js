export const DASHBOARD_BATCH_DATA = 'DASHBOARD_BATCH_DATA'
export const DASHBOARD_BATCH_API_JSON = 'DASHBOARD_BATCH_API_JSON'
export const DASHBOARD_INVENTORY_DATA = 'DASHBOARD_INVENTORY_DATA'
export const DASHBOARD_INVENTORY_API_JSON = 'DASHBOARD_INVENTORY_API_JSON'
export const DASHBOARD_SELECTED_BATCH_ID = 'DASHBOARD_SELECTED_BATCH_ID'

export const setDashboardBatchData = (data) => ({ type: DASHBOARD_BATCH_DATA, value: data });
export const setDashboardBatchApiJson = (data) => ({ type: DASHBOARD_BATCH_API_JSON, value: data });
export const setDashboardSelectedBatchId = (data) => ({ type: DASHBOARD_SELECTED_BATCH_ID, value: data });
export const setDashboardInventoryData = (data) => ({ type: DASHBOARD_INVENTORY_DATA, value: data });
export const setDashboardInventoryApiJson = (data) => ({ type: DASHBOARD_INVENTORY_API_JSON, value: data });
