import Login from "../components/login/Login";
import { loginAction } from '../redux/actions/index';
import { connect } from 'react-redux';
import React, { Component } from 'react';


class LoginContainer extends React.Component {
    // static navigationOption = {
    //     headerShow: false
    // }
    render() {
        return <Login{...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loginReducers.loading,
        data: state.loginReducers.data,
        error: state.loginReducers.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (user, password) => {
            dispatch(loginAction(user, password));
        },
    };
};


// const mapDispatchToProps = (dispatch) => {
//     return {
//       loginAction: (user, password) => {
//         dispatch(loginAction(user, password));
//       },
//     };
//   };

export default LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);