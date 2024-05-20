import * as t from '@/redux/types';

const initialState = {
    doc:null,
}

const MapviewReducer = (state = initialState, action) =>{
    switch (action.type){
        case t.SET_WIDTH:
            return({...state, doc:action.value})
        default:
            return state;    
    }

}

export default MapviewReducer;