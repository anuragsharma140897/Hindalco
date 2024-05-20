import * as t from '@/redux/types';

const initialState = {
    doc: null,
    json: { page: 1, limit: 10, search: {  }, populate: [ { "path": "ommas", "select": "" }, { "path": "devices", "select": "" }, ], lite: false, select: "" },
    timestamp: Date.now()

    // "devices.1" : {$exists:true}
}

const RoadReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_ROAD_DATA:
            return ({ ...state, doc: action.value, timestamp: Date.now() })
        case t.SET_ROAD_JSON:
            return ({ ...state, json: action.value, timestamp: Date.now() })
        default:
            return state;
    }

}

export default RoadReducer;