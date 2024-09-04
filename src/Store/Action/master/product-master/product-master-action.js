
export const SET_PRODUCT_MASTER_DATA = 'SET_PRODUCT_MASTER_DATA'
export const SET_PRODUCT_MASTER_API_JSON = 'SET_PRODUCT_MASTER_API_JSON'
export const SET_PRODUCT_MASTER_SEARCH_JSON = 'SET_PRODUCT_MASTER_SEARCH_JSON'

export const setProductMasterData = (data) => ({ type: SET_PRODUCT_MASTER_DATA, value: data });
export const setProductMasterApiJson = (data) => ({ type: SET_PRODUCT_MASTER_API_JSON, value: data });
export const setProductMasterSearchJson = (data) => ({ type: SET_PRODUCT_MASTER_SEARCH_JSON, value: data });
