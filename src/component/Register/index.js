import React from 'react';
import { connect } from 'react-redux';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import { Card, Form, Button, Input } from 'antd';
import agent from '../../agent';

const FormItem = Form.Item;

const mapStateToProps = state => ({
    ...state.auth
});                 

const mapDispatchToProps = dispatch => ({
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED }),
    onChangeField: (keyName, value) =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: keyName, value }),
    onSubmit: (registerVM) =>
        dispatch({ type: REGISTER, payload: agent.Auth.registerOrUpdateUser(registerVM) })
});

class Register extends React.Component {

    state = {
        confirmDirty: false,
        callingCode: '',
        selectedPhoneNumber: '',
        defaultCountry: '',
        defaultPhoneNumber: '',
        isInValidNumber: true
    }

    onChangeHandler = (value) => {
        var isInValidNumber = (value.phoneNumber.length > 8 && value.phoneNumber.length < 14) ? false : true;
        this.setState({ callingCode: value.callingCode, selectedPhoneNumber: value.phoneNumber, isInValidNumber: isInValidNumber });
    }

    componentWillMount() {
        this.props.onUnload();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const registerVM = {
            UserName: this.props.userName,
            Email: this.props.email,
            Password: this.props.password,
            PhoneNumber: "9999988885",
            PhoneNumberExtension: "+91",
            IsVerified: true,
            IsInValidNumber: false ,
            AccountType: "Customer",
            IsTermsAndConditionsAccepted: true
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onSubmit(registerVM);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    }

    checkEmail = (rule, value, callback) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) {
            agent.Auth.verifyEmail(value).then(function (response) {
                if (!response.success)
                    callback("Email already exist.");
                else
                    callback();
            });
        }
        else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <div className="register-page">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-6 offset-sm-3 offset-md-3">
                                <Card>
                                    <div className="col-12">
                                        <h3 className="text-center red-color">Sign Up</h3>
                                        <div className="text-center">
                                            <span>
                                                Already have an account?
                                        </span>
                                        </div>
                                    </div>
                                    <Form onSubmit={this.handleSubmit}>
                                        <div className="col-12 col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                            <FormItem label="User Name">
                                                {getFieldDecorator('userName', {
                                                    initialValue: this.props.userName,
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{ required: true, message: 'Please input your User Name!' }]
                                                })(
                                                    <Input prefix={<span className="fa fa-user"></span>} placeholder="User Name" />
                                                    )}
                                            </FormItem>
                                            <FormItem label="E-mail">
                                                {getFieldDecorator('email', {
                                                    initialValue: this.props.email,
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{
                                                        type: 'email', message: 'The input is not valid E-mail!',
                                                    }, {
                                                        required: true, message: 'Please input your E-mail!',
                                                    },
                                                    {
                                                        validator: this.checkEmail,
                                                    }]
                                                })(
                                                    <Input prefix={<span className="fa fa-envelope"></span>} placeholder="Email Address" />

                                                    )}
                                            </FormItem>
                                            <FormItem label="Password">
                                                {getFieldDecorator('password', {
                                                    initialValue: this.props.password,
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{
                                                        required: true, message: 'Please input minimum 6 characters!', min: 6
                                                    }, {
                                                        validator: this.checkConfirm,
                                                    }]
                                                })(
                                                    <Input type="password" prefix={<span className="fa fa-lock pre-icon"></span>} placeholder="Password" />
                                                    )}
                                            </FormItem>
                                            <FormItem label="Confirm Password">
                                                {getFieldDecorator('confirmPassword', {
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    initialValue: this.props.confirmPassword,
                                                    rules: [{
                                                        required: true, message: 'Please confirm your password!',
                                                    }, {
                                                        validator: this.checkPassword,
                                                    }]
                                                })(
                                                    <Input type="password" prefix={<span className="fa fa-lock pre-icon"></span>} placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
                                                    )}
                                            </FormItem>
                                            <div className="text-center">
                                                <Button type="primary" htmlType="submit" disabled={false} icon="user-add">Create Account</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register = Form.create({
    onValuesChange(props, values) {
        for (const key in values) {
            props.onChangeField(key, values[key]);
        }
    }
})(Register);

export default connect(mapStateToProps, mapDispatchToProps)(Register);