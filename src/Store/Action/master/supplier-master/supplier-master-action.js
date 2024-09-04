
export const SET_SUPPLIER_DATA = 'SET_SUPPLIER_DATA'
export const SET_SUPPLIER_API_JSON = 'SET_SUPPLIER_API_JSON'
export const SET_SUPPLIER_SEARCH_JSON = 'SET_SUPPLIER_SEARCH_JSON'

export const setSupplierData = (data) => ({ type: SET_SUPPLIER_DATA, value: data });
export const setSupplierApiJson = (data) => ({ type: SET_SUPPLIER_API_JSON, value: data });
export const setSupplierSearcjJson = (data) => ({ type: SET_SUPPLIER_SEARCH_JSON, value: data });
