import React from 'react';
import {Menu, Dropdown, Button, Icon, Row, Col, Input, Select} from 'antd';
import './listUserHeader.css';
import {connect} from "react-redux";
import render from "../../../../../../../reducers/renderContentDashboardReducer";

const Option = Select.Option;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
    </Menu>
);

function handleChange(value) {
}

const mapStoreToProps = (store) => {
    return {
        render: store.render.render
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderCreateUser: () => dispatch({type: 'RENDER_CREATE_USER'})
    }
};

const ListUserHeader = props => {

    return (
        <div>
            <Row>
                <Col className="tittle-list-user col-auto">User Management</Col>
                <Col className="action-list-user-header">
                    <Button type="primary" icon="plus" className="btn-create"
                            onClick={props.renderCreateUser}>Create</Button>
                    <Dropdown overlay={menu} placement="bottomCenter" className="btn-other">
                        <Button>Other <Icon type="down"/></Button>
                    </Dropdown>
                </Col>
            </Row>
            <hr/>
            <Row type="flex" className="d-flex form-search">
                <div className="search-item">
                    <label>User ID</label>
                    <Input className="search-input"/>
                </div>
                <div className="search-item">
                    <label>First name</label>
                    <Input className="search-input"/>
                </div>
                <div className="search-item">
                    <label>Last name</label>
                    <Input className="search-input"/>
                </div>
                <div className="search-item search-item-role">
                    <label>Role</label>
                    <Select defaultValue="Admin" onChange={handleChange} className="search-input">
                        <Option value="Admin" className="col-3">Admin</Option>
                        <Option value="Operator" className="col-3">Operator</Option>
                        <Option value="Approver" className="col-3">Approver</Option>
                        <Option value="Creator" className="col-3">Creator</Option>
                        <Option value="Authorizer" className="col-3">Authorizer</Option>
                        <Option value="Customer User" className="col-3">Customer User</Option>
                    </Select>
                </div>
                <div>
                    <Button type="primary" icon="search" className="btn-search">Search</Button>
                </div>
            </Row>
        </div>
    )
}

export default connect(mapStoreToProps, mapDispatchToProps)(ListUserHeader);
