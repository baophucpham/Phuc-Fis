import {
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const getCourseReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_COURSE_SUCCESS:
      return {
        loading: false,
        data: action.response,
        error: null,
      };
    case GET_COURSE_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};
export default getCourseReducers;
