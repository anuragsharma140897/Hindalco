import { SET_MAPPING_MASTER_ZONE_DATA, SET_SELECTED_MAPPING_MASTER_BUILDING_DATA, SET_SELECTED_MAPPING_MASTER_LOCATION_DATA, SET_SELECTED_MAPPING_MASTER_READER_DATA, SET_SELECTED_MAPPING_MASTER_ZONE_DATA } from "../../../Action/master/mapping-master/mapping-master-action";

const initialState = {
    building: null,
    zoneData: null,
    selectedZone:null,
    location: null,
    reader: null,
    timestamp: Date.now()
}

const MappingMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_MAPPING_MASTER_BUILDING_DATA:
            return ({ ...state, building: action.value, timestamp: Date.now() })
        case SET_MAPPING_MASTER_ZONE_DATA:
            return ({ ...state, zoneData: action.value, timestamp: Date.now() })
        case SET_SELECTED_MAPPING_MASTER_ZONE_DATA:
            return ({ ...state, selectedZone: action.value, timestamp: Date.now() })
        case SET_SELECTED_MAPPING_MASTER_LOCATION_DATA:
            return ({ ...state, location: action.value, timestamp: Date.now() })
        case SET_SELECTED_MAPPING_MASTER_READER_DATA:
            return ({ ...state, reader: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default MappingMasterReducer;
