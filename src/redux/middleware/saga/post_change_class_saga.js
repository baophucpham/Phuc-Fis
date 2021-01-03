import{
POST_BH,
POST_BH_SUCCESS,
POST_BH_ERROR,
} from '../../actions/actionTypes' 
import {takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {post_change_class} from '../api/post_change_class';

export function* watchPostClass(){
    yield takeEvery(POST_BH,postChangeClassSaga);
}

function* postChangeClassSaga(action){
const {
    courseId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
} = action.data;
const response = yield post_change_class(
    courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
);

if(response != undefined){
    if(response.resultCode ===1) {
        yield put({
            type:POST_BH_SUCCESS,
            response:response,
        });
    }else{
        yield put({
            type:POST_BH_ERROR,
            response:response,
        });
    }
}else{
    yield put({
        type:POST_BH_ERROR,
        response:response,
    });
}
}