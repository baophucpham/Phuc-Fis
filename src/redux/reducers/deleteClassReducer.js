import {State} from 'react-native-gesture-handler';
import {
  DELETE_CLASS,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const deleteClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CLASS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case DELETE_CLASS_SUCCESS:
      return {
        loading: false,
        data: action.response,
        error: null,
      };
      case DELETE_CLASS_ERROR:
          return{
              loading:false,
              data:null,
              error:action.error,
          };
          default:
              return state;
  }
};

export default deleteClassReducer;