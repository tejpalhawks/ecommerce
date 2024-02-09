import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Captcha from 'react-captcha-code';
import refreshIcon from '../../assets/images/icons/refresh.svg';

// actions
import { resetAuth, loginUser, signupUser } from '../../redux/actions';

import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';

interface UserData {
    username: string;
    loginpassword: string;
    password: string;
    fullname: string;
    email: string;
    captcha: string;
}

const SignInSignUp = () => {
    const captchaRef = useRef<any>(null);
    const [captchaDetails, setCaptchaDetails] = useState();
    // const [captchaError, setCaptchaError] = useState<string | null>(null);
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { user, userSignUp, loading, error } = useSelector((state: RootState) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const handleChange = useCallback((captcha) => {
        setCaptchaDetails(captcha);

    }, []);
    
    const captchaRefresh = () => {
        const currentCaptcha = captchaRef.current;
        if (currentCaptcha) {
            const captchshow = currentCaptcha.refresh();
            setCaptchaDetails(captchshow);
        }
    };

    const loginSchema = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            loginpassword: yup.string().required(t('Please enter Password')),
            captcha: yup.string().required(t('Please enter valid Captcha')),
        })
    );

    const signUpSchema = yupResolver(
        yup.object().shape({
            password: yup.string().required(t('Please enter Password')),
            fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            captcha: yup.string().required(t('Please enter valid Captcha')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        if(formData.captcha === captchaDetails){
            console.log("true");
            dispatch(loginUser(formData['email'], formData['password'], formData['captcha']));
        }else{
            console.log("false");
            // setCaptchaError(t('Invalid Captcha. Please try again.'));
        }
    };

    const onSignUp = (formData: UserData) => {
            if(formData.captcha === captchaDetails){
                console.log("true");
                dispatch(signupUser(formData['fullname'], formData['email'], formData['password'], formData['captcha']));
            }else{
                console.log("false");
                // setCaptchaError(t('Invalid Captcha. Please try again.'));
            }
    };

    return (
        <>
            {user ? <Redirect to="/"></Redirect> : null}

            {userSignUp ? <Redirect to={'/auth/confirm'}></Redirect> : null}

            <AuthLayout isCombineForm={true}>
                <Row>
                    <Col lg={6}>
                        <div className="p-sm-3">
                            <h4 className="mt-0">{t('Sign In')}</h4>
                            <p className="text-muted mb-4">
                                {t('Enter your email address and password to access account.')}
                            </p>
                            {error && (
                                <Alert variant="danger" className="my-2">
                                    {error}
                                </Alert>
                            )}
                            <VerticalForm<UserData>
                                onSubmit={onSubmit}
                                resolver={loginSchema}
                                defaultValues={{ username: 'test', loginpassword: 'test' }}
                            >
                                <FormInput
                                    label="Username"
                                    type="text"
                                    name="username"
                                    placeholder="Enter your Username"
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="loginpassword"
                                    placeholder="Enter your password"
                                    containerClass={'mb-3'}
                                >
                                    <Link to="/auth/forget-password" className="text-muted float-end">
                                        <small>{t('Forgot your password?')}</small>
                                    </Link>
                                </FormInput>
                                <div className='d-flex align-items-center gap-3 mb-2'>
                                    <Captcha ref={captchaRef} charNum={6} onChange={handleChange} />
                                    <div>
                                        <button className='captch-refresh-btn' onClick={captchaRefresh}><img src={refreshIcon} alt="" /></button>
                                    </div>
                                </div>
                                <FormInput
                                    label={t('Captcha')}
                                    type="text"
                                    name="captcha"
                                    placeholder="Enter Correct Captcha"
                                    containerClass={'mb-3'}
                                ></FormInput>

                                <div className="mb-3">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="btn btn-primary btn-sm float-sm-end"
                                        disabled={loading}
                                    >
                                        {t('Log In')}
                                    </Button>
                                    <FormInput
                                        label="Remember me"
                                        type="checkbox"
                                        name="checkbox"
                                        containerClass={'pt-1'}
                                    />
                                </div>
                            </VerticalForm>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="p-sm-3">
                            <h4 className="mt-0">{t('Free Sign Up')}</h4>
                            <p className="text-muted mb-4">
                                {t("Don't have an account? Create your account, it takes less than a minute")}
                            </p>

                            <VerticalForm onSubmit={onSignUp} resolver={signUpSchema} defaultValues={{}}>
                                <FormInput
                                    label={t('Full Name')}
                                    type="text"
                                    name="fullname"
                                    placeholder={t('Enter your name')}
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label={t('Email address')}
                                    type="email"
                                    name="email"
                                    placeholder={t('Enter your email')}
                                    containerClass={'mb-3'}
                                />
                                <FormInput
                                    label={t('Password')}
                                    type="password"
                                    name="password"
                                    placeholder={t('Enter your password')}
                                    containerClass={'mb-3'}
                                />

                                <div className="mb-0">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        className="btn btn-success btn-sm float-sm-end"
                                        disabled={loading}
                                    >
                                        {t('Sign Up')}
                                    </Button>
                                    <FormInput
                                        label={t('I accept Terms and Conditions')}
                                        type="checkbox"
                                        name="checkboxsignup"
                                        containerClass={'pt-1'}
                                    />
                                </div>
                            </VerticalForm>
                        </div>
                    </Col>
                </Row>
            </AuthLayout>
        </>
    );
};

export default SignInSignUp;
