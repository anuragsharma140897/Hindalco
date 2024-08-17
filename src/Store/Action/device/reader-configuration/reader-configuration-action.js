
export const SET_READER_CONFIGURATION_DATA = 'SET_READER_CONFIGURATION_DATA'
export const SET_READER_CONFIGURATION_API_JSON = 'SET_READER_CONFIGURATION_API_JSON'
export const SET_READER_CONFIGURATION_SEARCH_JSON = 'SET_READER_CONFIGURATION_SEARCH_JSON'
export const SET_READER_CONFIGURATION_LOGIN_DATA = 'SET_READER_CONFIGURATION_LOGIN_DATA'
export const SET_READER_CONFIGURATION_SUMMARY_DATA = 'SET_READER_CONFIGURATION_SUMMARY_DATA'
export const SET_READER_CONFIGURATION_TOPIC_DATA = 'SET_READER_CONFIGURATION_TOPIC_DATA'
export const SET_READER_CONFIGURATION_NETWORK_DATA = 'SET_READER_CONFIGURATION_NETWORK_DATA'

export const setReaderConfigurationTopicData = (data) => ({ type: SET_READER_CONFIGURATION_TOPIC_DATA, value: data });
export const setReaderConfigurationLoginData = (data) => ({ type: SET_READER_CONFIGURATION_LOGIN_DATA, value: data });
export const setReaderConfigurationSummaryJson = (data) => ({ type: SET_READER_CONFIGURATION_SUMMARY_DATA, value: data });
export const setReaderConfigurationData = (data) => ({ type: SET_READER_CONFIGURATION_DATA, value: data });
export const setReaderConfigurationNetworkJson = (data) => ({ type: SET_READER_CONFIGURATION_NETWORK_DATA, value: data });
export const setReaderConfigurationNTPJson = (data) => ({ type: SET_READER_CONFIGURATION_SEARCH_JSON, value: data });

export const setReaderConfigurationApiJson = (data) => ({ type: SET_READER_CONFIGURATION_API_JSON, value: data });
export const setReaderConfigurationSearchJson = (data) => ({ type: SET_READER_CONFIGURATION_SEARCH_JSON, value: data });

