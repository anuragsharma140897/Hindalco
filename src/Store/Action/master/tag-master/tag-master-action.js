export const SET_TAG_MASTER_DATA = 'SET_TAG_MASTER_DATA'
export const SET_TAG_MASTER_API_JSON = 'SET_TAG_MASTER_API_JSON'
export const SET_TAG_MASTER_SEARCH_JSON = 'SET_TAG_MASTER_SEARCH_JSON'

export const setTagMasterData = (data) => ({ type: SET_TAG_MASTER_DATA, value: data})
export const setTagMasterApiJson = (data) => ({ type: SET_TAG_MASTER_API_JSON, value: data })
export const setTagMasterSearchJson = (data) => ({ type: SET_TAG_MASTER_SEARCH_JSON, value: data })

