export const SET_ZONE_MASTER_DATA = 'SET_ZONE_MASTER_DATA'
export const SET_ZONE_MASTER_API_JSON = 'SET_ZONE_MASTER_API_JSON'
export const SET_ZONE_MASTER_SEARCH_JSON = 'SET_ZONE_MASTER_SEARCH_JSON'

export const setZoneMasterData = (data) => ({ type: SET_ZONE_MASTER_DATA, value: data})
export const setZoneMasterApiJson = (data) => ({ type: SET_ZONE_MASTER_API_JSON, value: data })
export const setZoneMasterSearchJson = (data) => ({ type: SET_ZONE_MASTER_SEARCH_JSON, value: data })

