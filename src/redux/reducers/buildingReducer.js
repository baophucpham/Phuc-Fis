import { GET_BUILDING_ROOM_SUCCESS,GET_BUILDING_ROOM_ERROR } from "../actions/actionTypes";

const intialState ={
    loading: false,
}

const buildingReducer = (state= intialState,action)=>{
    switch(action.type){
        case GET_BUILDING_ROOM_SUCCESS:
            console.log("action.response");
            return{
                ...action.response,
                isFetching: true,
            };
        case GET_BUILDING_ROOM_ERROR:
            return action.response ? action.response.isSuccess : -1;
        default:
            return state;
    }
}

export default buildingReducer;
