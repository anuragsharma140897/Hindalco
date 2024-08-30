
export const SET_DEVICES_DATA = 'SET_DEVICES_DATA'
export const SET_DEVICES_API_JSON = 'SET_DEVICES_API_JSON'
export const SET_DEVICES_SEARCH_JSON = 'SET_DEVICES_SEARCH_JSON'

export const setDevicesData = (data) => ({ type: SET_DEVICES_DATA, value: data });
export const setDevicesApiJson = (data) => ({ type: SET_DEVICES_API_JSON, value: data });
export const setDevicesSearchJson = (data) => ({ type: SET_DEVICES_SEARCH_JSON, value: data });
