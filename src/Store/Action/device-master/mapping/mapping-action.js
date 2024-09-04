export const SET_MAPPING_DATA = 'SET_MAPPING_DATA'
export const SET_MAPPING_API_JSON = 'SET_MAPPING_API_JSON'
export const SET_MAPPING_SEARCH_JSON = 'SET_MAPPING_SEARCH_JSON'
export const SET_MAPPING_MAPPING_JSON = 'SET_MAPPING_MAPPING_JSON'



export const setMappingData = (data) => ({ type: SET_MAPPING_DATA, value: data });
export const setMappingApiJson = (data) => ({ type: SET_MAPPING_API_JSON, value: data });
export const setMappingSearchJson = (data) => ({ type: SET_MAPPING_SEARCH_JSON, value: data });
export const setMappingMappingJson = (data) => ({ type: SET_MAPPING_MAPPING_JSON, value: data });