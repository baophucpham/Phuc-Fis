import {
    UPDATE_COURSE,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const updateCourseReducers = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_COURSE:
        return {
          loading: true,
          data: null,
          error: null,
        };
      case UPDATE_COURSE_SUCCESS:
        return {
          loading: false,
          data: action.response,
          error: null,
        };
      case UPDATE_COURSE_ERROR:
        return {
          loading: false,
          data: null,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default updateCourseReducers;
  