import React from 'react';
import {Layout} from 'antd';
import './dashboard.css';
import Head from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/content/content";
import WrappedNormalLoginForm from "../public/components/login/login";

const Dashboard = props => {
    if (localStorage.getItem('loggedIn') === null) {
        props.history.push('/');
        return <WrappedNormalLoginForm/>
    }
    if (localStorage.getItem('loggedIn') === 'true') {
        return (
            <Layout>
                <Head router={props}/>
                <Layout>
                    <Sidebar/>
                    <Body/>
                </Layout>
            </Layout>
        );
    }
};

export default Dashboard;
