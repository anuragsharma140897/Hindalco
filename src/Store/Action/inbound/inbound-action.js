export const SET_INBOUND_DATA = 'SET_INBOUND_DATA'
export const SET_INBOUND_API_JSON = 'SET_INBOUND_API_JSON'
export const SET_INBOUND_SEARCH_JSON = 'SET_INBOUND_SEARCH_JSON'

export const setInboundData = (data) => ({ type: SET_INBOUND_DATA, value: data})
export const setInboundApiJson = (data) => ({ type: SET_INBOUND_API_JSON, value: data })
export const setInboundSearchJson = (data) => ({ type: SET_INBOUND_SEARCH_JSON, value: data })
