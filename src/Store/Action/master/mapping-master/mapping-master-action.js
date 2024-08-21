export const SET_SELECTED_MAPPING_MASTER_BUILDING_DATA = 'SET_SELECTED_MAPPING_MASTER_BUILDING_DATA'
export const SET_SELECTED_MAPPING_MASTER_ZONE_DATA = 'SET_SELECTED_MAPPING_MASTER_ZONE_DATA'
export const SET_SELECTED_MAPPING_MASTER_LOCATION_DATA = 'SET_SELECTED_MAPPING_MASTER_LOCATION_DATA'
export const SET_SELECTED_MAPPING_MASTER_READER_DATA = 'SET_SELECTED_MAPPING_MASTER_READER_DATA'
export const SET_MAPPING_MASTER_ZONE_DATA = 'SET_MAPPING_MASTER_ZONE_DATA'
export const SET_MAPPING_MASTER_JSON = 'SET_MAPPING_MASTER_JSON'

export const setSelectedMappingMasterJson = (data) => ({ type: SET_MAPPING_MASTER_JSON, value: data })
export const setSelectedMappingMasterBuildingData = (data) => ({ type: SET_SELECTED_MAPPING_MASTER_BUILDING_DATA, value: data })
export const setSelectedMappingMasterZoneData = (data) => ({ type: SET_SELECTED_MAPPING_MASTER_ZONE_DATA, value: data })
export const setMappingMasterZoneData = (data) => ({ type: SET_MAPPING_MASTER_ZONE_DATA, value: data })
export const setSelectedMappingMasterLocationData = (data) => ({ type: SET_SELECTED_MAPPING_MASTER_LOCATION_DATA, value: data })
export const setSelectedMappingMasterReaderData = (data) => ({ type: SET_SELECTED_MAPPING_MASTER_READER_DATA, value: data })

