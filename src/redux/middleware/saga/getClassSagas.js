import { GET_CLASS,GET_CLASS_SUCCESS, GET_CLASS_ERROR } from "../../actions/actionTypes";
import {takeEvery, takeLatest,call, put} from "redux-saga/effects";
import {get_class_by_course} from "../api/get_class_by_course";

export function* watchGetClassSaga(){
    yield takeEvery(GET_CLASS,getClassSaga);
}

function* getClassSaga(action){
    var response = yield get_class_by_course(action.data);
    console.log("dataClass:", response);
    var error = response.message;
    if(response != undefined){
        if(response.resultCode === 1){
            yield put({type:GET_CLASS_SUCCESS,response:response});
        }else{
            yield put({type:GET_CLASS_ERROR,response:response});
        }
    }
    else{
        yield put({type:GET_CLASS_ERROR,response:error});
    }
}
