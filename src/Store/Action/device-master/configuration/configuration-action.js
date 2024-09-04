export const SET_CONFIGURATION_DATA = 'SET_CONFIGURATION_DATA'
export const SET_CONFIGURATION_JSON = 'SET_CONFIGURATION_JSON'
export const SET_CONFIGURATION_SEARCH_JSON = 'SET_CONFIGURATION_SEARCH_JSON'

export const setConfigurationData = (data) => ({ type: SET_CONFIGURATION_DATA, value: data });
export const setConfigurationJson = (data) => ({ type: SET_CONFIGURATION_JSON, value: data });
export const setConfigurationSearchJson = (data) => ({ type: SET_CONFIGURATION_SEARCH_JSON, value: data });