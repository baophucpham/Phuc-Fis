import React,{Component} from "react";
import ChangeKHScreen from "../components/home/changeKHScreen";
import {connect} from "react-redux";
import {getBuildingRoomAction,postChangeCourseAction,getCourseAction} from "../redux/actions/index";

const mapStateToProps = (state)=>{
    return{
        changeCourse: state.changeCourseReducer,
        building: state.buildingReducer, 
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getBuildingRoomAction:()=> dispatch(getBuildingRoomAction()),
        postChangeCourseAction:(id,courseName,trainer,startedDate,endedDate,buildingId,roomId)=>dispatch(postChangeCourseAction(id,courseName,trainer,startedDate,endedDate,buildingId,roomId)),
        getCourseAction:()=> dispatch(getCourseAction()),
    }
}

class ChangeCourseContainer extends Component{
    render(){
        return(
            <ChangeKHScreen {...this.props}></ChangeKHScreen>
        )
    }
}

export default ChangeCourseContainer = connect(mapStateToProps,mapDispatchToProps)(ChangeCourseContainer);
