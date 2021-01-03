import {
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_ERROR,
} from '../../actions/actionTypes';

import {call, takeEvery, put} from 'redux-saga/effects';

import {updateCourse} from '../api/updateCourse';

function* updateCourseFlow(action) {
  const {courseOj} = action.data;
  console.log('CourseInfo: ', courseOj);
  try {
    const response = yield updateCourse(null, courseOj);
    console.log('update :', response);
    if (response !== undefined && response !== null) {
      if (response.resultCode === 1) {
        yield put({type: UPDATE_COURSE_SUCCESS, response});
      } else {
        yield put({type: UPDATE_COURSE_ERROR, error: response.message});
      }
    } else {
      const message = 'Không kết nối được server!';
      yield put({type: UPDATE_COURSE_ERROR, error: message});
    }
  } catch (error) {
    const message = 'Không có kết quả trả về!';
    yield put({type: UPDATE_COURSE_ERROR, error: message});
  }
}

export function* watchUpdateCourse() {
  yield takeEvery(UPDATE_COURSE, updateCourseFlow);
}
