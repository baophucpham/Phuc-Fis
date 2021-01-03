import {POST_BH_ERROR, POST_BH_SUCCESS} from '../actions/actionTypes';

const intialState = {
  loading: false,
};

const addClassReducer = (state = intialState, action) => {
  switch (action.type) {
    case POST_BH_SUCCESS:
      return action.response;
    case POST_BH_ERROR:
      return action.response;
    default:
      return state;
  }
};
export default addClassReducer;
