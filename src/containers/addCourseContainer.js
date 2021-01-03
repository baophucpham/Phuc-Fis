import React, {Component} from 'react';
import Home2 from '../components/home/Home2';
import {connect} from 'react-redux';
import {
  getBuildingRoomAction,
  postCourseAction,
  getCourseAction,
} from '../redux/actions/index';

const mapStateToProps = (state) => {
  return {
    building: state.buildingReducer,
    course: state.addCourseReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuildingRoomAction: () => dispatch(getBuildingRoomAction()),
  getCourseAction: () => dispatch(getCourseAction()),
  postCourseAction: (
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  ) =>
    dispatch(
      postCourseAction(
        courseName,
        trainer,
        startedDate,
        endedDate,
        buildingId,
        roomId,
      ),
    ),
});

class AddCourseContainer extends Component {
  render() {
    return <Home2 {...this.props}></Home2>;
  }
}

export default AddCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCourseContainer);
