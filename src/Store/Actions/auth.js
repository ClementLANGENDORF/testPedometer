'use strict';

import {Platform} from 'react-native';
import * as types from './actionTypes';
import GoogleFit from '../../services/fitService.android';

function authSuccess(authorized) {
    return {
        type: types.AUTHORIZE_SUCCESS,
        authorized: authorized
    }
}

function authFailed(authorized) {
    return {
        type: types.AUTHORIZE_FAILED,
        authorized: authorized
    }
}

export function authorize() {
    if (Platform.OS === 'android') {
        return (dispatch) => {
            GoogleFit.authorize((err, result) => {
                if (err || !result) {
                    dispatch(authFailed(false));
                    //handle and display error here
                } else {
                    dispatch(authSuccess(result));
                   // Actions.tabbar();
                }
            })
        }
    } else   {
        console.log("Probleme")
    }

}

module.exports = {
    ...authorize,
};

