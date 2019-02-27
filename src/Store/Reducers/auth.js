'use strict';

const initialState = {authorized: false};

function auth(state = initialState, action) {
    let nextState;
    switch(action.type) {
        case 'AUTH SUCCESS':
            nextState = {
                ...state,
                authorized: true
            };
            return nextState || state;
        case 'AUTH ERROR':
            nextState = {
                ...state,
                authorized: false
            };
            return nextState || state;
        default:
            return state
    }
}

export default auth