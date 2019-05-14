import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Dashboard from "./pages/secure/dashboard";
import 'antd/dist/antd.css';
import Login from './pages/public/components/login/login';
import Register from './pages/public/components/register/register';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" render={props => <Dashboard{...props}/>}/>
                    <Route path="/register" render={props => <Register{...props}/>}/>
                    <Route path="/" render={props => <Login{...props}/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
