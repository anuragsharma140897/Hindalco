
export const SET_WEIGHING_SCALE_DATA = 'SET_WEIGHING_SCALE_DATA'
export const SET_WEIGHING_SCALE_API_JSON = 'SET_WEIGHING_SCALE_API_JSON'
export const SET_WEIGHING_SCALE_SEARCH_JSON = 'SET_WEIGHING_SCALE_SEARCH_JSON'

export const setWeighingScaleData = (data) => ({ type: SET_WEIGHING_SCALE_DATA, value: data });
export const setWeighingScaleApiJson = (data) => ({ type: SET_WEIGHING_SCALE_API_JSON, value: data });
export const setWeighingScaleSearchJson = (data) => ({ type: SET_WEIGHING_SCALE_SEARCH_JSON, value: data });
