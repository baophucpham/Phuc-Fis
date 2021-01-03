import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getBuildingRoomAction,
  updateClassAction,
  getClassByCourseAction,
  sendCoruseAction,
} from '../redux/actions/index';
import UpdateBHScreen from '../components/home/updateBHScreen';

const mapStateToProps = (state) => {
  return {
    updateClass: state.updateClassReducer,
    building: state.buildingReducer, 
    course: state.sendCourseReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingRoomAction: () => dispatch(getBuildingRoomAction()),
    updateClassAction: (
      classId,
      className,
      trainer,
      date,
      startedTime,
      endedTime,
      buildingId,
      roomId,
    ) =>
      dispatch(
        updateClassAction(
          classId,
          className,
          trainer,
          date,
          startedTime,
          endedTime,
          buildingId,
          roomId,
        ),
      ),
    getClassByCourseAction: (classId) => dispatch(getClassByCourseAction(classId)),
    sendCoruseAction:()=>dispatch(sendCoruseAction(courseId))
  };
};
class UpdateClassContainer extends Component {
  render() {
    return <UpdateBHScreen {...this.props}></UpdateBHScreen>;
  }
}

export default UpdateClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateClassContainer);
