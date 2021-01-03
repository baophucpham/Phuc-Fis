import {
  REMOVE_COURSE,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_ERROR,
} from '../../actions/actionTypes';

import {call, takeEvery, put} from 'redux-saga/effects';

import {removeCourse} from '../api/removeCourse';

function* removeCourseFlow(action) {
  const {courseId} = action.data;
  console.log('id: ', action.data);
  try {
    const response = yield removeCourse(courseId);
    if (response !== undefined && response !== null) {
      if (response.resultCode === 1) {
        yield put({type: REMOVE_COURSE_SUCCESS, response});
      } else {
        yield put({type: REMOVE_COURSE_ERROR, error: response.message});
      }
    } else {
      const message = 'Không kết nối được server!';
      yield put({type: REMOVE_COURSE_ERROR, error: message});
    }
  } catch (error) {
    const message = 'Không có kết quả trả về!';
    yield put({type: REMOVE_COURSE_ERROR, error: message});
  }
}

export function* watchRemoveCourse() {
  yield takeEvery(REMOVE_COURSE, removeCourseFlow);
}
