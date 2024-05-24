import * as t from '@/redux/types';

const initialState = {
    doc:null,
    timestamp : Date.now()
}

const AuthReducer = (state = initialState, action) =>{
    switch (action.type){
        case t.SET_AUTH:
            return({...state, doc:action.value, timestamp : Date.now()})
        default:
            return state;    
    }
}

export default AuthReducer;