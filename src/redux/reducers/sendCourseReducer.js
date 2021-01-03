import {SEND_COURSE} from "../actions/actionTypes"

const intialState={
    courseId:'',
}

const sendCourseReducer = (selectedCourse=intialState,action) =>{

    switch(action.type){
        case SEND_COURSE:
            intialState.courseId = action.data.courseId;
            return selectedCourse
            default:
                return selectedCourse;
    }
}

export default sendCourseReducer;