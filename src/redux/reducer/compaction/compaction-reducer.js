import * as t from '@/redux/types';

const initialState = {
    doc:null,
}

const CompactionReducer = (state = initialState, action) =>{
    switch (action.type){
        case t.SET_COMPLETE_COMPACTOIN_DATA:
            return({...state, doc:action.value})
        default:
            return state;    
    }

}

export default CompactionReducer;