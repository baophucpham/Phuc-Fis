import {
    UPDATE_BH,
    UPDATE_BH_SUCCESS,
    UPDATE_BH_ERROR,
} from '../../actions/actionTypes';

import {call, takeEvery, put} from 'redux-saga/effects';
import {updateClass} from '../api/update_Class';

export function* watchUpdateClassSaga(){
    yield takeEvery(UPDATE_BH,updateClassSaga);
}

function* updateClassSaga(action) {
    console.log(action.data)
    const {
        classId,
        className,
        trainer,
        date,
        startedTime,
        endedTime,
        buildingId,
        roomId,
    } = action.data;
    const response = yield updateClass(
        classId,
        className,
        trainer,
        date,
        startedTime,
        endedTime,
        buildingId,
        roomId,
    );
    console.log( "saga");
        console.log( response);
    if(response !== undefined){
        if(response.result.resultCode === 1){
            yield put({
                type:UPDATE_BH_SUCCESS,
                response:response,
            });
        }else{
            yield put({
                type: UPDATE_BH_ERROR,
                error: response,
            });
        }
    }else{
        yield put({
            type: UPDATE_BH_ERROR,
            error: response,
        });
    }
}