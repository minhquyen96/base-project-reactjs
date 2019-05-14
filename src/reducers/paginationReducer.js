import * as Types from './../actions/actionTypes';
const initialState = {
    page: 1,
    total: 16
};

const paginationReducer = (state = initialState, action) => {
    if (action.type === Types.CHANGE_PAGE) {
        return {
            ...state,
            page: action.page
        }
    }
    return state;
};

export default paginationReducer;
