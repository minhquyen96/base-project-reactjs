import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import render from '../reducers/renderContentDashboardReducer';
import user from '../reducers/userReducer';
import auth from '../reducers/authReducer';
import page from '../reducers/paginationReducer'

const logger = (store) => {
    return next => {
        return action => {
            return next(action);
        }
    }
};

const rootReducers = combineReducers({
    render: render,
    user: user,
    auth: auth,
    page: page
});

export default createStore(
    rootReducers,
    {},
    applyMiddleware(thunk, logger)
);
