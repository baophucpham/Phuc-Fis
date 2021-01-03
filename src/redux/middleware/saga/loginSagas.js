import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
} from '../../actions/actionTypes';

import {call, takeEvery, put, takeLatest} from 'redux-saga/effects';

import {postLogin} from '../api/login';

function* signInFlow(action) {
  const {user, password} = action.data;

  try {
    const response = yield postLogin(user, password);
    console.log('Login:', response);

    if (response !== undefined && response !== null) {
      if (response.resultCode === 1) {
        yield put({type: POST_LOGIN_SUCCESS, response});
      } else {
        yield put({type: POST_LOGIN_ERROR, error: response.message});
      }
    } else {
      const message = 'Không kết nối được server!';
      yield put({type: POST_LOGIN_ERROR, error: message});
    }
  } catch (error) {
    const message = 'Không có kết quả trả về!';
    yield put({type: POST_LOGIN_ERROR, error: message});
  }
}

export function* watchLogin() {
  yield takeEvery(POST_LOGIN, signInFlow);
}
