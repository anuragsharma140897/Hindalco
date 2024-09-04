
export const SET_USER_DATA = 'SET_USER_DATA'
export const SET_USER_API_JSON = 'SET_USER_API_JSON'
export const SET_USER_SEARCH_JSON = 'SET_USER_SEARCH_JSON'

export const setUserData = (data) => ({ type: SET_USER_DATA, value: data });
export const setUserApiJson = (data) => ({ type: SET_USER_API_JSON, value: data });
export const setUserSearcjJson = (data) => ({ type: SET_USER_SEARCH_JSON, value: data });
