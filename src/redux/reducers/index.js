import { combineReducers } from 'redux';

import loginReducers from './loginReducers';
import getCourseReducers from './getCourseReducers'
import removeCourseReducers from './removeCourseReducers'

import changeCourseReducer from './changeCourseReducer'
import buildingReducer from './buildingReducer'
import addCourseReducer from './addCourseReducer'
import getClassReducer from './getClassReducer'
import deleteClassReducer from './deleteClassReducer'
import addClassReducer from './addClassReducer'
import sendCourseReducer from './sendCourseReducer'
import updateClassReducer from './updateClassReducer'

const allReducers = combineReducers({
    
    loginReducers,
    getCourseReducers,
    removeCourseReducers,
    addCourseReducer,
    changeCourseReducer,
    buildingReducer,
    getClassReducer,
    deleteClassReducer,
    addClassReducer,
    sendCourseReducer,
    updateClassReducer,
});

export default allReducers;