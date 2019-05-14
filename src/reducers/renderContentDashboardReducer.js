import * as Types from './../actions/actionTypes';
const initialState = {
    render: 'Home',
    data: null,
    key: 0
};

const renderContentDashboardReducer = (state = initialState, action) => {
    if (action.type === Types.RENDER_EDIT_USER) {
        return {
            ...state,
            render: 'CreateUser',
            data: action.data,
            key: 2
        }
    }
    if (action.type === Types.RENDER_CREATE_USER) {
        return {
            ...state,
            render: 'CreateUser',
            data: 'create',
            key: 2
        }
    }
    if (action.type === Types.RENDER_LIST_USER) {
        return {
            ...state,
            render: 'ListUser',
            key: 2
        }
    }
    if (action.type === Types.RENDER_HOME) {
        return {
            ...state,
            render: 'Home',
            data: null,
            key: 1
        }
    }
    if (action.type === Types.RENDER_ROLE_PERMISSION) {
        return {
            ...state,
            render: 'RolePermission',
            data: null,
            key: 3
        }
    }
    if (action.type === Types.RENDER_SETTING) {
        return {
            ...state,
            render: 'Setting',
            data: null,
            key: 4
        }
    }
    if (action.type === Types.RENDER_USER_DETAIL) {
        return {
            ...state,
            render: 'UserDetail',
            data: action.user,
            key: 2
        }
    }
    return state;
};

export default renderContentDashboardReducer;
