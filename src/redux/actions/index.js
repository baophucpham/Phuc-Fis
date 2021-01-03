//Linhtn23

import {
    INCREMENT,
    DECREMENT,
    POST_LOGIN,
    DID_LOGIN_ACTION,
    GET_COURSE,
    REMOVE_COURSE,
    UPDATE_COURSE,
    GET_CLASS,
    GET_BUILDING_ROOM,
    POST_EDIT_KH,
    POST_KH,
    POST_BH,
    DELETE_CLASS,
    SEND_COURSE,
    UPDATE_BH,
} from './actionTypes';


export const increaseAction = (step) => {
    return {
        type: INCREMENT,
        step: step
    }
}

export const onDidLogin = () => {
    return {
        type: DID_LOGIN_ACTION,

    }
}

export const decreaseAction = (step) => {
    return {
        type: DECREMENT,
        step: step
    }
}

export const loginAction = (user, password) => {
    return {
        type: POST_LOGIN,
        data: { user, password }
    }
}

export const getCourseAction =() =>{
    return{
        type: GET_COURSE,
    };
};

export const removeCourseAction = (courseId) =>{
    return{
        type:REMOVE_COURSE,
        data:{courseId},
    }
}

export const deleteClassAction = (classId) =>{
    return{
        type:DELETE_CLASS,
        data:{classId},
    }
}

export const updateCourseAction = (token, courseOj) => {
    return {
      type: UPDATE_COURSE,
      data: {token, courseOj},
    };
  };
  
  export const getClassByCourseAction = (courseId)=>{
    return{
        type: GET_CLASS,
        data: courseId
    }
}

export const sendCourseAction =(courseId)=>{
    return{
        type: SEND_COURSE,
        data: {courseId}
    }
}

export const getBuildingRoomAction = ()=>{
    return {
        type: GET_BUILDING_ROOM,
    }
}

export const postCourseAction = (courseName,trainer,startedDate,endedDate,buildingId,roomId)=>{
    return{
        type: POST_KH,
        data: {courseName,trainer,startedDate,endedDate,buildingId,roomId},
    }
}

export const postClassAction =(courseId,className,trainer,date,startedTime,endedTime,buildingId,roomId)=>{
    return{
        type: POST_BH,
        data:{courseId,className,trainer,date,startedTime,endedTime,buildingId,roomId}
    }
}

export const postChangeCourseAction = (id,courseName,trainer,startedDate,endedDate,buildingId,roomId)=>{
    
    return{
        type: POST_EDIT_KH,
        data: {id,courseName,trainer,startedDate,endedDate,buildingId,roomId},
    }
}

export const updateClassAction = (classId,className,trainer,date,startedTime,endedTime,buildingId,roomId) =>{
    return{
        type: UPDATE_BH,
        data:{classId,className,trainer,date,startedTime,endedTime,buildingId,roomId}
    }
}