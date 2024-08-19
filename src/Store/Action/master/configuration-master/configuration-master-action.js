export const SET_CONFIGURATION_MASTER_DATA = 'SET_CONFIGURATION_MASTER_DATA'
export const SET_CONFIGURATION_MASTER_API_JSON = 'SET_CONFIGURATION_MASTER_API_JSON'
export const SET_CONFIGURATION_MASTER_SEARCH_JSON = 'SET_CONFIGURATION_MASTER_SEARCH_JSON'

export const setConfigurationMasterData = (data) => ( {type : SET_CONFIGURATION_MASTER_DATA , value : data})
export const setConfigurationMasterApiJson = (data) => ( {type : SET_CONFIGURATION_MASTER_API_JSON , value : data})
export const setConfigurationMasterSearchJson = (data) => ( {type : SET_CONFIGURATION_MASTER_SEARCH_JSON , value : data})
