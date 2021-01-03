import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getClassByCourseAction,
  deleteClassAction,
} from '../redux/actions/index';
import QlBHScreen from '../components/home/QLBH';

class ClassContainer extends Component {
  render() {
    return <QlBHScreen {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  console.log(state.getClassReducer);
  return {
    class: state.getClassReducer,

    deleteClass: state.deleteClassAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassByCourseAction: (course_id) => {
      dispatch(getClassByCourseAction(course_id));
    },
    deleteClassAction: (classId) => {
      dispatch(deleteClassAction(classId))
      console.log(deleteClassAction);
    },
  };
};

export default ClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassContainer);
