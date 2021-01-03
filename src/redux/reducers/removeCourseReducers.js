import {
    REMOVE_COURSE,
    REMOVE_COURSE_SUCCESS,
    REMOVE_COURSE_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const removeCourseReducers = (state = initialState, action) => {
    switch (action.type) {
      case REMOVE_COURSE:
        return {
          loading: true,
          data: null,
          error: null,
        };
      case REMOVE_COURSE_SUCCESS:
        return {
          loading: false,
          data: action.response,
          error: null,
        };
      case REMOVE_COURSE_ERROR:
        return {
          loading: false,
          data: null,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default removeCourseReducers;
  