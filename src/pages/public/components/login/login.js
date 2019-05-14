import React, {useEffect} from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {Link} from 'react-router-dom';
import './login.css';
import {callApi} from '../../../../services/api'
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

const Login = props => {
    useEffect(() => {
        const form = props.form;
        if (localStorage.getItem('loggedIn') === 'true') {
            props.login();
        }
        if (props.auth === true) {
            props.history.push('/dashboard');
        }
        if (localStorage.getItem('account') !== null) {
            form.setFieldsValue({
                username: JSON.parse(localStorage.getItem('account')).username,
                password: JSON.parse(localStorage.getItem('account')).password, remember: true
            });
        } else {
            form.setFieldsValue({remember: false});
        }
    }, [props.auth]);
    const {getFieldDecorator} = props.form;

    const saveAccount = (values) => {
        const account = {
            username: values.username,
            password: values.password
        };
        if (values.remember) {
            localStorage.setItem('account', JSON.stringify(account));
        } else {
            localStorage.removeItem('account');
        }
    };

    const login = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                callApi('login', 'POST', values).then(res => {
                    if (res) {
                        localStorage.setItem('userData', JSON.stringify(res.data));
                        message.success('Login successful', 3);
                        localStorage.setItem('loggedIn', 'true');
                        props.history.push('/dashboard');
                        saveAccount(values);
                    } else {
                        message.error('Login failed', 3);
                    }
                })
            }
        });
    };
    return (
        <div className="body">
            <div className="login-screen thumbnail">
                <h1 className="text-center title-login">Login</h1>
                <Form onSubmit={login} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <Link to="/" className="login-form-forgot">Forgot password</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);
export default connect(mapStoreToProps, mapDispatchToProps)(WrappedNormalLoginForm);
