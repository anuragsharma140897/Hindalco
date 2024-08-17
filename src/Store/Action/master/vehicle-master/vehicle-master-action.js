export const SET_VEHICLE_MASTER_DATA = 'SET_VEHICLE_MASTER_DATA'
export const SET_VEHICLE_MASTER_API_JSON = 'SET_VEHICLE_MASTER_API_JSON'
export const SET_VEHICLE_MASTER_SEARCH_JSON = 'SET_VEHICLE_MASTER_SEARCH_JSON'

export const setVehicleMasterData = (data) => ({ type: SET_VEHICLE_MASTER_DATA, value: data})
export const setVehicleMasterApiJson = (data) => ({ type: SET_VEHICLE_MASTER_API_JSON, value: data })
export const setVehicleMasterSearchJson = (data) => ({ type: SET_VEHICLE_MASTER_SEARCH_JSON, value: data })

