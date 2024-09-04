export const SET_CERTIFICATES_DATA = 'SET_CERTIFICATES_DATA'
export const SET_CERTIFICATES_API_JSON = 'SET_CERTIFICATES_API_JSON'
export const SET_CERTIFICATES_SEARCH_JSON = 'SET_CERTIFICATES_SEARCH_JSON'


export const setCertificatesData = (data) => ({ type: SET_CERTIFICATES_DATA, value: data });
export const setCertificatesApiJson = (data) => ({ type: SET_CERTIFICATES_API_JSON, value: data });
export const setCertificatesSearchJson = (data) => ({ type: SET_CERTIFICATES_SEARCH_JSON, value: data });

