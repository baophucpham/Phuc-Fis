import {
  POST_KH,
  POST_KH_ERROR,
  POST_KH_SUCCESS,
} from '../../actions/actionTypes';
import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {post_course} from '../api/post_course';

export function* watchPostCourse() {
  yield takeEvery(POST_KH, postCourseSaga);
}

function* postCourseSaga(action) {
  const {
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  } = action.data;
  const response = yield post_course(
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  );

  if (response != undefined) {
    if (response.resultCode === 1) {
      yield put({
        type: POST_KH_SUCCESS,
        response: response,
      });
    } else {
      yield put({
        type: POST_KH_ERROR,
        response: response,
      });
    }
  } else {
    yield put({
      type: POST_KH_ERROR,
      response: response,
    });
  }
}
