
export const SET_BUILDING_MASTER_DATA = 'SET_BUILDING_MASTER_DATA'
export const SET_BUILDING_MASTER_SELECTED_BUILDING_ID = 'SET_BUILDING_MASTER_SELECTED_BUILDING_ID'
export const SET_BUILDING_MASTER_API_JSON = 'SET_BUILDING_MASTER_API_JSON'
export const SET_BUILDING_MASTER_SEARCH_JSON = 'SET_BUILDING_MASTER_SEARCH_JSON'

export const setBuildingMasterData = (data) => ({ type: SET_BUILDING_MASTER_DATA, value: data });
export const setBuildingMasterSelectedBuildingId = (data) => ({ type: SET_BUILDING_MASTER_SELECTED_BUILDING_ID, value: data });
export const setBuildingMasterApiJson = (data) => ({ type: SET_BUILDING_MASTER_API_JSON, value: data });
export const setBuildingMasterSearchJson = (data) => ({ type: SET_BUILDING_MASTER_SEARCH_JSON, value: data });


