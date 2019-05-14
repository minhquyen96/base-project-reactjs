import React, {useState, useEffect} from 'react';
import {Form, Input, Button, DatePicker, message} from 'antd';
import './register.css';
import {callApi} from "../../../../services/api";
import * as moment from 'moment';
import {connect} from "react-redux";

const mapStoreToProps = store => {
    return {
        auth: store.auth.loggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch({type: 'LOGIN'})
    }
};

const Register = props => {
    const [day] = useState({dob: null});
    const {dob} = day;
    const {getFieldDecorator} = props.form;

    const [invalid, setInvalid] = useState({confirmDirty: false});

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            props.login();
        }
        if (props.auth === true) {
            props.history.push('/dashboard');
        }
    }, [props.auth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                callApi('register', 'POST', values).then(res => {
                    if (res) {
                        message.success('Registration Successful', 3);
                        props.history.push('/');
                    } else {
                        message.error('Registration failed', 3);
                    }
                })
            }
        });
    };

    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setInvalid({confirmDirty: invalid.confirmDirty || !!value});
    };

    const compareToFirstPassword = (rule, value, callback) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        const form = props.form;
        if (value && invalid.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    const validateUserName = (rule, value, callback) => {
        const form = props.form;
        const regExp = new RegExp(/(^$)|(^[a-zA-Z0-9]*$)/);
        if (!regExp.test(form.getFieldValue('username'))) {
            callback('The character must be in [a-zA-Z0-9]!');
        } else {
            callback();
        }
    };

    const disabledDate = (dob) => {
        const today = moment(Date.now(), 'x').format("YYYY-MM-DD");
        return moment(dob.valueOf(), 'x').format("YYYY-MM-DD") >= today;
    };

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const config = {
        rules: [{type: 'object', required: true, message: 'Please select time!'}],
    };

    return (
        <div className="body">
            <div className="register-screen thumbnail">
                <h1 className="text-center title-register">Register</h1>
                <Form {...formItemLayout} onSubmit={handleSubmit} className="register-form">
                    <Form.Item
                        label="User name"
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                max: 16, message: 'maximum 16 characters!',
                            }, {
                                min: 4, message: 'minimum 4 characters!',
                            }, {
                                required: true, message: 'Please input your user name!',
                            }, {
                                validator: validateUserName,
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                max: 16, message: 'maximum 16 characters!',
                            }, {
                                min: 4, message: 'minimum 4 characters!',
                            }, {
                                validator: validateToNextPassword,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={handleConfirmBlur}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="DatePicker"
                    >
                        {getFieldDecorator('date-picker', config)(
                            <DatePicker
                                value={dob}
                                disabledDate={disabledDate}
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

const WrappedRegistrationForm = Form.create({name: 'register'})(Register);
export default connect(mapStoreToProps, mapDispatchToProps)(WrappedRegistrationForm);
