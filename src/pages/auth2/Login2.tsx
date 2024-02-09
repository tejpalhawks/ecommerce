import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Captcha from 'react-captcha-code';
import refreshIcon from '../../assets/images/icons/refresh.svg';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

import { useQuery } from '../../hooks/';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';

interface UserData {
    username: string;
    password: string;
    captcha: string;
}

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'/auth/register2'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
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

const Login2 = () => {
    const captchaRef = useRef<any>(null);
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const query = useQuery();
    const next = query.get('next');

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const handleChange = useCallback((captcha) => {
        console.log('captcha:', captcha);
    }, []);

    const captchaRefresh = () => {
        (captchaRef as any).current.refresh();
    };

    const { loading, userLoggedIn, user, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            password: yup.string().required(t('Please enter Password')),
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

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['username'], formData['password'],  formData['password'] ));
    };

    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}

            <AuthLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Sign In')}</h4>
                <p className="text-muted mb-4">{t('Enter your email address and password to access account.')}</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: 'test', password: 'test' }}
                >
                    <FormInput
                        label={t('Username')}
                        type="text"
                        name="username"
                        placeholder={t('Enter your Username')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    >
                        <Link to="/auth/forget-password2" className="text-muted float-end">
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

                    <FormInput label="Remember me" type="checkbox" name="checkbox" containerClass={'mb-3'} />

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
            </AuthLayout>
        </>
    );
};

export default Login2;
