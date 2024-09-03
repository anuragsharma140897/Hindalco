
export const SET_BROKERS_DATA = 'SET_BROKERS_DATA'
export const SET_BROKERS_API_JSON = 'SET_BROKERS_API_JSON'
export const SET_BROKERS_SEARCH_JSON = 'SET_BROKERS_SEARCH_JSON'

export const setBrokesrData = (data) => ({ type: SET_BROKERS_DATA, value: data });
export const setBrokersApiJson = (data) => ({ type: SET_BROKERS_API_JSON, value: data });
export const setBrokersSearchJson = (data) => ({ type: SET_BROKERS_SEARCH_JSON, value: data });
