import {call, takeEvery, put} from 'redux-saga/effects';
import { DELETE_CLASS, DELETE_CLASS_ERROR, DELETE_CLASS_SUCCESS } from '../../actions/actionTypes';
import {deleteClass} from '../api/delete_Class'

function* deleteClassFlow(action){
    const{classId} = action.data;
    console.log('id: ',action.data);
    try{
        const response = yield deleteClass(classId);
        if(response !== undefined && response !== null){
            if(response.resultCode === 1){
                yield put({type: DELETE_CLASS_SUCCESS, response});
            }else{
                yield put ({type: DELETE_CLASS_ERROR, error: response.message});
            }
        }else{
            const message = 'không kết nối được server!';
            yield put({type: DELETE_CLASS_ERROR, error: message});
        }
    }catch(error){
        const message = 'không có kết qua trả về!';
        yield put({type: DELETE_CLASS_ERROR, error: message});
    }
}

export function* watchDeleteClass(){
    yield takeEvery(DELETE_CLASS, deleteClassFlow);
}