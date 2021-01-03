import {
  UPDATE_BH,
  UPDATE_BH_SUCCESS,
  UPDATE_BH_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const updateClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BH:
      return {
        loading: true,
      };
    case UPDATE_BH_SUCCESS:
      return {
        loading: false,
        data: action.response,
      };
    case UPDATE_BH_ERROR:
      return {
        loading: false,
        error: action.response
      };

    default:
      return state;
  }
};
export default updateClassReducer;
