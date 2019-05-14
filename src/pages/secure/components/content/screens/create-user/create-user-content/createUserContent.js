import React, {useEffect} from 'react';
import {Form, Input, message, Select} from 'antd';
import {callApi} from "../../../../../../../services/api";
import {connect} from "react-redux";
import './createUserContent.css';
import * as moment from 'moment';
import render from "../../../../../../../reducers/renderContentDashboardReducer";

const Option = Select.Option;

function handleChange(value) {
}

const mapStoreToProps = (store) => {
    return {
        user: store.user.create,
        render: store.render.render,
        check: store.render.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderListUser: () => dispatch({type: 'RENDER_LIST_USER'})
    }
};

const CreateUserContent = props => {
    let user = {};
    const {getFieldDecorator} = props.form;
    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                user.userId = values.userId;
                user.first_name = values.first_name;
                user.last_name = values.last_name;
                user.email = values.email;
                user.role = values.role;
                if (props.check !== 'create') {
                    user.createdAt = JSON.parse(props.check).createdAt;
                    user.createdBy = JSON.parse(props.check).createdBy;
                    user.approvedAt = JSON.parse(props.check).approvedAt;
                    user.approvedBy = JSON.parse(props.check).approvedBy;
                    user.updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm');
                    user.updatedBy = JSON.parse(localStorage.getItem('userData')).username;
                    user.status = 'Activated';
                    updateUser(user);
                } else {
                    user.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm');
                    user.createdBy = '';
                    user.approvedAt = '';
                    user.approvedBy = '';
                    user.updatedAt = '';
                    user.updatedBy = '';
                    user.status = 'Deactivate';
                    postNewUser(user);
                }
            }
        });
    };

    const updateUser = (user) => {
        callApi('item/' + JSON.parse(props.check).id, 'PUT', user).then(res => {
            if (res) {
                message.success('Update User Successful', 3);
                props.renderListUser();
            } else {
                message.error('Update User failed', 3);
            }
        })
    };

    const postNewUser = (user) => {
        callApi('item', 'POST', user).then(res => {
            if (res) {
                message.success('Create User Successful', 3);
                props.renderListUser();
            } else {
                message.error('Create User failed', 3);
            }
        })
    };

    useEffect(() => {
        if (props.form.getFieldValue('userId') !== undefined) {
            handleSubmit();
        }
        if (props.check !== 'create') {
            props.form.setFieldsValue({
                userId: JSON.parse(props.check).userId,
                first_name: JSON.parse(props.check).first_name,
                last_name: JSON.parse(props.check).last_name,
                email: JSON.parse(props.check).email,
                role: JSON.parse(props.check).role,
            });
        }
    }, [props.user]);
    return (
        <div>
            <Form className="create-user-form">
                <Form.Item
                    label="User ID"
                >
                    {getFieldDecorator('userId', {
                        rules: [{
                            max: 16, message: 'maximum 16 characters!',
                        }, {
                            min: 4, message: 'minimum 4 characters!',
                        }, {
                            required: true, message: 'Please input your user ID!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    label="First name"
                >
                    {getFieldDecorator('first_name', {
                        rules: [{
                            max: 16, message: 'maximum 16 characters!',
                        }, {
                            required: true, message: 'Please input your first name!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Last name"
                >
                    {getFieldDecorator('last_name', {
                        rules: [{
                            max: 16, message: 'maximum 16 characters!',
                        }, {
                            required: true, message: 'Please input your last name!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Role"
                >
                    {getFieldDecorator('role', {
                        rules: [{
                            required: true, message: 'Please input your role!',
                        }],
                    })(
                        <Select onChange={handleChange}>
                            <Option value="Admin" className="col-3">Admin</Option>
                            <Option value="Operator" className="col-3">Operator</Option>
                            <Option value="Approver" className="col-3">Approver</Option>
                            <Option value="Creator" className="col-3">Creator</Option>
                            <Option value="Authorizer" className="col-3">Authorizer</Option>
                            <Option value="Customer User" className="col-3">Customer User</Option>
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
};

const CreateUserForm = Form.create({name: 'advanced_search'})(CreateUserContent);
export default connect(mapStoreToProps, mapDispatchToProps)(CreateUserForm);
