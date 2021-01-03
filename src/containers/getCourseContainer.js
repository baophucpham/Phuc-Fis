import Home from '../components/home/Home'
import { getCourseAction, removeCourseAction,sendCourseAction } from '../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

class HomeContainer extends React.Component {
    render() {
        return <Home {...this.props} />;
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.getCourseReducers.loading,
        data: state.getCourseReducers.data,
        error: state.getCourseReducers.error,

        loadingRemove: state.removeCourseReducers.loading,
        dataRemove: state.removeCourseReducers.data,
        errorRemove: state.removeCourseReducers.error,
    };
};

const mapDishpatchToProps = (dispatch) =>
    bindActionCreators({
        getCourseAction: getCourseAction,
        removeCourseAction: removeCourseAction,
        sendCourseAction: sendCourseAction,
    },
    //console.log(getCourseAction,removeCourseAction),
        dispatch,
    );


export default HomeContainer = connect(
    mapStateToProps,
    mapDishpatchToProps,
)(HomeContainer)
