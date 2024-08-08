
export const SET_SITE_MASTER_DATA = 'SET_SITE_MASTER_DATA'
export const SET_SITE_MASTER_API_JSON = 'SET_SITE_MASTER_API_JSON'

export const setSiteMasterData = (data) => ({ type: SET_SITE_MASTER_DATA, value: data });
export const setSiteMasterApiJson = (data) => ({ type: SET_SITE_MASTER_API_JSON, value: data });
