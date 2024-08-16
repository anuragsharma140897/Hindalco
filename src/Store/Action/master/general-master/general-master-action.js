
export const SET_GENERAL_MASTER_DATA = 'SET_GENERAL_MASTER_DATA'
export const SET_GENERAL_MASTER_API_JSON = 'SET_GENERAL_MASTER_API_JSON'
export const SET_GENERAL_MASTER_SEARCH_JSON = 'SET_GENERAL_MASTER_SEARCH_JSON'

export const setGeneralMasterData = (data) => ({ type: SET_GENERAL_MASTER_DATA, value: data})
export const setGeneralMasterApiJson = (data) => ({ type: SET_GENERAL_MASTER_API_JSON, value: data })
export const setGeneralMasterSearchJson = (data) => ({ type: SET_GENERAL_MASTER_SEARCH_JSON, value: data })

