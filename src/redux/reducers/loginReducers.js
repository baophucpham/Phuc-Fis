//Linhtn23

import {
    POST_LOGIN_ERROR,
    POST_LOGIN_SUCCESS,
    POST_LOGIN,
}
    from '../actions/actionTypes';

    const initialState = {
        loading: false,
        data: null,
        error: null,
      };
      

const loginReducers = (state = initialState, action) => {

    switch (action.type) {
        case POST_LOGIN:
            //console.log(action.response)
            return {
                loading: true,
                data: null,
                error: null,
            };

        case POST_LOGIN_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null,
            };
        case POST_LOGIN_ERROR:
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            return state;


    }
}

export default loginReducers;