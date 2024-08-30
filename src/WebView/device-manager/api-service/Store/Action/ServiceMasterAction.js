export const SET_SERVICE_MASTER_JSON = 'SET_SERVICE_MASTER_JSON'
export const SET_API_JSON = 'SET_API_JSON'

export const setServiceMasterJson = (data) => ({
    type: SET_SERVICE_MASTER_JSON,
    value: data
});

export const setApiJson = (data) => ({
    type: SET_API_JSON,
    value: data
});
