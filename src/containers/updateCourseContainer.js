import AddCourse from '../components/course/AddCourse';
import {
  updateCourseAction,
  getCourseAction,
} from '../redux/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React from 'react';

const mapStateToProps = (state) => {
  return {
    loadingUpdate: state.updateCourseReducers.loading,
    dataUpdate: state.updateCourseReducers.data,
    errorUpdate: state.updateCourseReducers.error,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCourseAction: updateCourseAction,
      getCourseAction: getCourseAction,
    },
    dispatch,
  );


class updateCourseContainer extends React.Component {
  render() {
    return <updateCourse {...this.props} />;
  }
}

export default updateCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateCourseAction);
