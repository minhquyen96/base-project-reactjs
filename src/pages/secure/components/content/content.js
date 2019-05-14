import React from 'react';
import './content.css';
import {Layout} from 'antd';
import ListUser from "./screens/list-user/listUser";
import {connect} from "react-redux";
import CreateUser from "./screens/create-user/createUser";
import Home from "./screens/home/home";
import Role from "./screens/role-permission/rolePermission";
import Setting from "./screens/system-setting/setting";
import UserDetail from "./screens/user-detail/userDetail";

const mapStoreToProps = (store) => {
    return {
        render: store.render.render
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderListUser: () => dispatch({type: 'RENDER_LIST_USER'}),
        renderHome: () => dispatch({type: 'RENDER_HOME'})
    }
};

const {Content} = Layout;

const Body = props => {
    let content;
    if (props.render === 'ListUser') {
        content = <ListUser/>;
    }
    if (props.render === 'CreateUser') {
        content = <CreateUser/>;
    }
    if (props.render === 'Home') {
        content = <Home/>;
    }
    if (props.render === 'RolePermission') {
        content = <Role/>;
    }
    if (props.render === 'Setting') {
        content = <Setting/>;
    }
    if (props.render === 'UserDetail') {
        content = <UserDetail/>;
    }
    return (
        <Layout style={{padding: '0 24px 24px'}}>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                {content}
            </Content>
        </Layout>
    )
};

export default connect(mapStoreToProps, mapDispatchToProps)(Body);
