import React from 'react';
import {Layout, Menu, Icon, Dropdown, Button, message} from 'antd';
import logo from '../../../../assets/images/ntq-logo.png';
import './header.css';
import {connect} from "react-redux";
import render from "../../../../reducers/renderContentDashboardReducer";

const mapStoreToProps = store => {
    return {
        auth: store.auth.loggedIn,
        select: store.render.key
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({type: 'LOGOUT'}),
        renderHome: () => dispatch({type: 'RENDER_HOME'})
    }
};

const {Header} = Layout;

const Head = props => {
    const profileUser = JSON.parse(localStorage.getItem('userData')).username;
    const logout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('loggedIn');
        props.logout();
        props.router.history.push('/');
        message.success('Logout successful', ['3']);
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <a  rel="noopener noreferrer" >View profile</a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" onClick={logout}>Logout</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="header">
            <div className="logo" onClick={props.renderHome}><img src={logo} alt="logo"/></div>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[`${props.select}`]}
                style={{lineHeight: '64px'}}
                className="menu"
            >
                <Menu.Item key="1" onClick={props.renderHome}><Icon type="home" />Home</Menu.Item>
                <Menu.Item key="2" className="d-flex"><Dropdown overlay={menu} placement="bottomCenter">
                    <Button><Icon type="user"/>{profileUser} <Icon type="down"/></Button>
                </Dropdown></Menu.Item>
            </Menu>
        </Header>
    )
};

export default connect(mapStoreToProps, mapDispatchToProps)(Head);
