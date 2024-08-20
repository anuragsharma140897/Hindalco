export const SET_INVENTORY_MASTER_DATA = 'SET_INVENTORY_MASTER_DATA'
export const SET_INVENTORY_MASTER_API_JSON = 'SET_INVENTORY_MASTER_API_JSON'
export const SET_INVENTORY_MASTER_SEARCH_JSON = 'SET_INVENTORY_MASTER_SEARCH_JSON'

export const setInventoryMasterData = (data) => ({ type: SET_INVENTORY_MASTER_DATA, value: data})
export const setInventoryMasterApiJson = (data) => ({ type: SET_INVENTORY_MASTER_API_JSON, value: data })
export const setInventoryMasterSearchJson = (data) => ({ type: SET_INVENTORY_MASTER_SEARCH_JSON, value: data })
