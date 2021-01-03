import {
  GET_BUILDING_ROOM,
  GET_BUILDING_ROOM_ERROR,
  GET_BUILDING_ROOM_SUCCESS,
} from '../../actions/actionTypes';
import {takeEvery, put} from 'redux-saga/effects';
import {get_building_room} from '../api/get_building_room';

export function* watchGetBuildingRoom() {
  yield takeEvery(GET_BUILDING_ROOM, get_building_room_saga);
}

function* get_building_room_saga(actions) {
  var response = yield get_building_room();
  const error = response.message;
  if (response !== undefined) {
    if (response.resultCode !== -1) {
      yield put({type: GET_BUILDING_ROOM_SUCCESS, response: response});
    } else {
      yield put({type: GET_BUILDING_ROOM_ERROR, error: error});
    }
  } else {
    yield put({type: GET_BUILDING_ROOM_ERROR, error: error});
  }
}
