import {
    GET_CLASS,
    GET_CLASS_SUCCESS,
    GET_CLASS_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const getClassReducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_CLASS:
        return {
          loading: true,
          data: null,
          error: null,
        };
      case GET_CLASS_SUCCESS:
        return {
          loading: false,
          data: action.response,
          error: null,
        };
      case GET_CLASS_ERROR:
        return {
          loading: false,
          data: null,
          error: action.error,
        };
      default:
        return state;
    }
  };
  export default getClassReducers;
  