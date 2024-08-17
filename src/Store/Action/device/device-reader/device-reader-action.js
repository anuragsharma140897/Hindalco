
export const SET_DEVICE_READER_DATA = 'SET_DEVICE_READER_DATA'
export const SET_DEVICE_READER_API_JSON = 'SET_DEVICE_READER_API_JSON'
export const SET_DEVICE_READER_SEARCH_JSON = 'SET_DEVICE_READER_SEARCH_JSON'

export const setDeviceReaderData = (data) => ({ type: SET_DEVICE_READER_DATA, value: data });
export const setDeviceReaderApiJson = (data) => ({ type: SET_DEVICE_READER_API_JSON, value: data });
export const setDeviceReaderSearchJson = (data) => ({ type: SET_DEVICE_READER_SEARCH_JSON, value: data });
