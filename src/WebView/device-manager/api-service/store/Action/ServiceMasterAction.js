export const SET_SERVICE_MASTER_JSON = 'SET_SERVICE_MASTER_JSON'
export const SET_API_JSON = 'SET_API_JSON'
export const SET_SERVICE_REQUEST_DATA = 'SET_SERVICE_REQUEST_DATA'
export const SET_SERVICE_GLOBAL_VAR = 'SET_SERVICE_GLOBAL_VAR'
export const SET_SERVICE_GLOBAL_RES = 'SET_SERVICE_GLOBAL_RES'
export const SET_WORKING_SERVICE_NAME = 'SET_WORKING_SERVICE_NAME'


export const setServiceMasterJson = (data) => ({
    type: SET_SERVICE_MASTER_JSON,
    value: data
});

export const setGlobalResponse = (data) => ({
    type: SET_SERVICE_GLOBAL_RES,
    value: data
});

export const setServiceRequestData = (data) => ({
    type: SET_SERVICE_REQUEST_DATA,
    value: data
});

export const setApiJson = (data) => ({
    type: SET_API_JSON,
    value: data
});

export const setServiceGlobalVariabls = (data) => ({
    type: SET_SERVICE_GLOBAL_VAR,
    value: data
});


export const setWorkingServiceName = (data) => ({
    type: SET_WORKING_SERVICE_NAME,
    value: data
});


