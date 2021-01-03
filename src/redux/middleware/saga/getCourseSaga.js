import {
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {getCourse} from '../api/getCourse';

function* getCourseFlow() {
  try {
    const response = yield getCourse();
    console.log('response', response);
    if (response !== undefined && response !== null) {
      if (response.resultCode === 1) {
        yield put({type: GET_COURSE_SUCCESS, response});
      } else {
        yield put({GET_COURSE_ERROR, error: response.message});
      }
    } else {
      const message = 'không kết nối được server !';
      yield put({type: GET_COURSE_ERROR, error: message});
    }
  } catch (error) {
    const message = 'không có kết quả trả về !';
    yield put({type: GET_COURSE_ERROR, error: message});
  }
}

export function* watchGetCourse() {
  yield takeEvery(GET_COURSE, getCourseFlow);
}
