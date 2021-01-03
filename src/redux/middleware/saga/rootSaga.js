import {all} from 'redux-saga/effects';

import {watchLogin} from './loginSagas';
import {watchGetCourse} from './getCourseSaga';
import {watchRemoveCourse} from './removeCourseSagas';
import {watchUpdateCourse} from './updateCourseSagas';
import {watchGetBuildingRoom} from './getBuildingSagas';
import {watchGetClassSaga} from './getClassSagas';
import {watchPostCourse} from './postCourseSagas';
import {watchChangeCourseSaga} from './postChangeCourseSagas';
import {watchDeleteClass} from './deleteClassSaga';
import {watchPostClass} from './post_change_class_saga';
import{watchUpdateClassSaga} from './updateClassSaga'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchGetCourse(),
    watchRemoveCourse(),
    watchUpdateCourse(),
    watchGetBuildingRoom(),
    watchGetClassSaga(),
    watchPostCourse(),
    watchChangeCourseSaga(),
    watchDeleteClass(),
    watchPostClass(),
    watchUpdateClassSaga(),
  ]);
}
