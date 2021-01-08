import {SEND_COURSE} from "../actions/actionTypes"

const intialState={
    courseId:'',
    startedDate:'',
    endedDate:'',
}

const sendCourseReducer = (selectedCourse=intialState,action) =>{

    switch(action.type){
        case SEND_COURSE:
            intialState.courseId = action.data.courseId;
            intialState.startedDate = action.data.startedDate;
            intialState.endedDate = action.data.endedDate;
            return selectedCourse
            default:
                return selectedCourse;
    }
}

export default sendCourseReducer;