import React from 'react';
import {Layout, Menu} from 'antd';
import './sidebar.css';
import {connect} from "react-redux";
import render from "../../../../reducers/renderContentDashboardReducer";

const mapStoreToProps = store => {
    return {
        select: store.render.key
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderListUser: () => dispatch({type: 'RENDER_LIST_USER'}),
        renderRolePermission: () => dispatch({type: 'RENDER_ROLE_PERMISSION'}),
        renderSetting: () => dispatch({type: 'RENDER_SETTING'})
    }
};

const {SubMenu} = Menu;
const {Sider} = Layout;

const Sidebar = props => {
    return (
        <Sider width={200} style={{background: '#fff'}}>
            <div className="title center-block"><h4>System management</h4></div>
            <Menu
                mode="inline"
                selectedKeys={[`${props.select}`]}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="2" onClick={props.renderListUser}>User management</Menu.Item>
                <Menu.Item key="3" onClick={props.renderRolePermission}>Role Permission</Menu.Item>
                <SubMenu key="4" title={<span>System setting</span>}>
                    <Menu.Item key="4" onClick={props.renderSetting}>Notices setting</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
};

export default connect(mapStoreToProps, mapDispatchToProps)(Sidebar);
