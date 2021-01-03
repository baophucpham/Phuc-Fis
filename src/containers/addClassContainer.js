import React, {Component} from 'react';
import ChangeBHScreen from '../components/home/changeBHScreen';
import {connect} from 'react-redux';
import {
  getBuildingRoomAction,
  postClassAction,
  getClassByCourseAction,
  sendCoruseAction
} from '../redux/actions/index';

const mapStateToProps = (state) => {
  return {
    building: state.buildingReducer,
    class: state.addClassReducer,
    course: state.sendCourseReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuildingRoomAction: () => dispatch(getBuildingRoomAction()),
  getClassByCourseAction: (id) => dispatch(getClassByCourseAction(id)),
  sendCoruseAction:()=>dispatch(sendCoruseAction(courseId)),
  postClassAction: (
    courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  ) =>
    dispatch(
      postClassAction(
        courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
      ),
    ),
});

class AddClassContainer extends Component {
  render() {
    return <ChangeBHScreen  {...this.props}></ChangeBHScreen>;
  }
}

export default AddClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddClassContainer);
