export const SET_AUTH = 'SET_AUTH'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'

export const setAuth = (data) => ({ type: SET_AUTH, value: data });
export const setAuthError = (data) => ({ type: SET_AUTH_ERROR, value: data });