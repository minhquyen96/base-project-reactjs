import * as Types from './../actions/actionTypes';
const initialState = {
    create: 1,
    edit: 0,
    approve: 0,
    delete: 0
};

const userReducer = (state = initialState, action) => {
    if (action.type === Types.CREATE_USER) {
        return {
            ...state,
            create: state.create + 1
        }
    }
    if (action.type === Types.EDIT_USER) {
        return {
            ...state,
            edit: state.edit + 1
        }
    }
    if (action.type === Types.APPROVE_USER) {
        return {
            ...state,
            approve: state.approve + 1
        }
    }
    return state;
};

export default userReducer;
