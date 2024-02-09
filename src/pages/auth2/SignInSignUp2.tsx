import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Alert, Nav, Tab } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
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

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('2018 - ' + new Date().getFullYear() + ' © UBold theme by')}{' '}
                <Link to="#" className="text-muted">
                    {t('Coderthemes')}
                </Link>
            </p>
        </footer>
    );
};

/* social links */
// const SocialLinks = () => {
//     const socialLinks = [
//         {
//             variant: 'primary',
//             icon: 'facebook',
//         },
//         {
//             variant: 'danger',
//             icon: 'google',
//         },
//         {
//             variant: 'info',
//             icon: 'twitter',
//         },
//         {
//             variant: 'secondary',
//             icon: 'github',
//         },
//     ];
//     return (
//         <>
//             <ul className="social-list list-inline mt-3 mb-0">
//                 {(socialLinks || []).map((item, index) => {
//                     return (
//                         <li key={index} className="list-inline-item">
//                             <Link
//                                 to="#"
//                                 className={classNames(
//                                     'social-list-item',
//                                     'border-' + item.variant,
//                                     'text-' + item.variant
//                                 )}
//                             >
//                                 <i className={classNames('mdi', 'mdi-' + item.icon)}></i>
//                             </Link>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </>
//     );
// };

const SignInSignUp2 = () => {
    const captchaRef = useRef<any>(null);
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
        console.log('captcha:', captcha);
    }, []);

    const captchaRefresh = () => {
        (captchaRef as any).current.refresh();
    };
    /*
    form validation schema
    */
    const loginSchema = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            loginpassword: yup.string().required(t('Please enter Password')),
            captcha: yup.string().test('matchCaptcha', t('Captcha does not match'), function (value) {
                // Access the other form values using 'this.parent'
                const { username, password } = this.parent;
                // Check if any field is empty or captcha doesn't match
                if (!username || !password || !value || value !== captchaRef.current?.getCaptchaValue()) {
                return false;
                }
                return true;
            }),
        })
    );

    const signUpSchema = yupResolver(
        yup.object().shape({
            password: yup.string().required(t('Please enter Password')),
            fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['username'], formData['loginpassword'] ,  formData['loginpassword']));
    };

    const onSignUp = (formData: UserData) => {
        dispatch(signupUser(formData['fullname'], formData['email'], formData['password'], formData['captcha'] ));
    };

    return (
        <>
            {user ? <Redirect to="/"></Redirect> : null}

            {userSignUp ? <Redirect to={'/auth/confirm2'}></Redirect> : null}

            <AuthLayout isCombineForm={true} bottomLinks={<BottomLink />}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                    <Nav variant="tabs" className="nav-bordered">
                        <Nav.Item as="li">
                            <Nav.Link className="cursor-pointer" eventKey="login">
                                {t('Log In')}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link className="cursor-pointer" eventKey="signup">
                                {t('Sign Up')}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* login form */}
                        <Tab.Pane eventKey="login">
                            <p className="text-muted mb-3">
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

                                <FormInput
                                    label="Remember me"
                                    type="checkbox"
                                    name="checkbox"
                                    containerClass={'mb-3'}
                                />


                                <div className="d-grid mb-0 text-center">
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {t('Log In')}
                                    </Button>
                                </div>

                                {/* social links */}
                                {/* <div className="text-center mt-4">
                                    <p className="text-muted font-16">{t('Sign in with')}</p>
                                    <SocialLinks />
                                </div> */}
                            </VerticalForm>
                        </Tab.Pane>

                        {/* sign up form */}
                        <Tab.Pane eventKey="signup">
                            <p className="text-muted mb-3">
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
                                <FormInput
                                    label={t('I accept Terms and Conditions')}
                                    type="checkbox"
                                    name="checkboxsignup"
                                    containerClass={'mb-3 text-muted'}
                                />

                                <div className="mb-0 d-grid text-center">
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {t('Sign Up')}
                                    </Button>
                                </div>

                                {/* social links */}
                                {/* <div className="text-center mt-4">
                                    <p className="text-muted font-16">{t('Sign up with')}</p>
                                    <SocialLinks />
                                </div> */}
                            </VerticalForm>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </AuthLayout>
        </>
    );
};

export default SignInSignUp2;
