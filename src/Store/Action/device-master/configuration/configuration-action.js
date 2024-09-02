export const SET_CONFIGURATION_JSON = 'SET_CONFIGURATION_JSON'
export const SET_CONFIGURATION_SEARCH_JSON = 'SET_CONFIGURATION_SEARCH_JSON'

export const setConfigurationJson = (data) => ({ type: SET_CONFIGURATION_JSON, value: data });
export const setConfigurationSearchJson = (data) => ({ type: SET_CONFIGURATION_SEARCH_JSON, value: data });