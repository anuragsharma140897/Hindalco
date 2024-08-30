export const SET_INPUT_JSON = 'SET_INPUT_JSON'
export const SET_OUTPUT_JSON = 'SET_OUTPUT_JSON'
export const SET_CONFIG_JSON = 'SET_CONFIG_JSON'
export const SET_MAPPER_API_JSON = 'SET_MAPPER_API_JSON'



export const setMapperApiJson = (data) => { return { type: SET_MAPPER_API_JSON, value: data } }
export const setInputJson = (data) => { return { type: SET_INPUT_JSON, value: data } }
export const setOutputJson = (data) => { return { type: SET_OUTPUT_JSON, value: data } }
export const setConfigJson = (data) => { return { type: SET_CONFIG_JSON, value: data } }

