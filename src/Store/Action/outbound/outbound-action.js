
export const SET_OUTBOUND_DATA = 'SET_OUTBOUND_DATA'
export const SET_OUTBOUND_API_JSON = 'SET_OUTBOUND_API_JSON'
export const SET_OUTBOUND_SEARCH_JSON = 'SET_OUTBOUND_SEARCH_JSON'
export const SET_OUTBOUND_ADDED_VEHICLE = 'SET_ADDED_PRODUCT'
export const SET_BUILDING_BATCH = 'SET_BUILDING_BATCH'
export const SET_OUTBOUND_INVNETORY = 'SET_OUTBOUND_INVNETORY'

export const setOutboundData = (data) => ({ type: SET_OUTBOUND_DATA, value: data})
export const setOutboundApiJson = (data) => ({ type: SET_OUTBOUND_API_JSON, value: data })
export const setOutboundSearchJson = (data) => ({ type: SET_OUTBOUND_SEARCH_JSON, value: data })
export const setOutboundAddedVehicle = (data) => ({ type: SET_OUTBOUND_ADDED_VEHICLE, value: data})
export const setBuldingBatch = (data) =>({type :SET_BUILDING_BATCH, value : data})
export const setOutboundInventory = (data) => ({ type: SET_OUTBOUND_INVNETORY, value: data })
