import {
  POST_EDIT_KH,
  POST_EDIT_KH_SUCCESS,
  POST_EDIT_KH_ERROR,
} from '../../actions/actionTypes';
import {call, takeLatest, takeEvery, put} from 'redux-saga/effects';
import {postChangeCourseAction} from '../../actions/index';
import post_change_course from '../api/post_change_course';

export function* watchChangeCourseSaga() {
  yield takeEvery(POST_EDIT_KH, postChangeCourseSaga);
}

function* postChangeCourseSaga(action) {
  const {
    id,
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  } = action.data;
  const response = yield post_change_course(
    id,
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
        type: POST_EDIT_KH_SUCCESS,
        response: response,
      });
    } else {
      yield put({
        type: POST_EDIT_KH_ERROR,
        error: response,
      });
    }
  } else {
    yield put({
      type: POST_EDIT_KH_ERROR,
      error: response,
    });
  }
}
