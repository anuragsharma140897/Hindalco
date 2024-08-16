
export const SET_CUSTOMER_MASTER_DATA = 'SET_CUSTOMER_MASTER_DATA'
export const SET_CUSTOMER_MASTER_API_JSON = 'SET_CUSTOMER_MASTER_API_JSON'
export const SET_CUSTOMER_MASTER_SEARCH_JSON = 'SET_CUSTOMER_MASTER_SEARCH_JSON'

export const setCustomerMasterData = (data) => ({ type: SET_CUSTOMER_MASTER_DATA, value: data})
export const setCustomerMasterApiJson = (data) => ({ type: SET_CUSTOMER_MASTER_API_JSON, value: data })
export const setCustomerMasterSearchJson = (data) => ({ type: SET_CUSTOMER_MASTER_SEARCH_JSON, value: data })

