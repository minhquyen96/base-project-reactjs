import * as Types from './../actions/actionTypes';
const initialState = {
    loggedIn: false
};

const authReducer = (state = initialState, action) => {
    if (action.type === Types.LOGIN) {
        return {
            ...state,
            loggedIn: true
        }
    }
    if (action.type === Types.LOGOUT) {
        return {
            ...state,
            loggedIn: false
        }
    }
    return state;
};

export default authReducer;
