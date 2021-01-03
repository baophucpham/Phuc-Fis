import {POST_KH_ERROR,POST_KH_SUCCESS} from "../actions/actionTypes";

const intialState ={
    loading: false,
}


const addCourseReducer = (state= intialState, action)=>{
    switch(action.type){
        case POST_KH_SUCCESS:
            return action.response;
        case POST_KH_ERROR:
            return action.response;
        default:
            return state;
    }
}

export default addCourseReducer;
