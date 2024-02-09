import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Captcha from 'react-captcha-code';
import refreshIcon from '../../assets/images/icons/refresh.svg';

//actions
import { resetAuth, signupUser } from '../../redux/actions';

import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components';

import AuthLayout from '../../pages/auth/AuthLayout';

interface UserData {
    fullname: string;
    email: string;
    password: string;
    regcaptcha: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-white-50">
                    {t('Already have account?')}{' '}
                    <Link to={'/auth/login'} className="text-white ms-1">
                        <b>{t('Sign In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
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

const RegisterNew = () => {
    const refCaptchaRef = useRef<any>(null);
    const [captchaDetails, setCaptchaDetails] = useState();
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, userSignUp, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    console.log(captchaDetails,"captcha");

    const handleChange = useCallback((captcha) => {
        setCaptchaDetails(captcha);

    }, []);
    
    const captchaRefresh = () => {
        const currentCaptcha = refCaptchaRef.current;
        if (currentCaptcha) {
            const captchshow = currentCaptcha.refresh();
            setCaptchaDetails(captchshow);
        }
    };
    const schemaResolver = yupResolver(
        yup.object().shape({
            fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required(t('Please enter Password')),
            regcaptcha: yup.string().required(t('Please enter valid Captcha')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        console.log('singuop')
        if(formData.regcaptcha == captchaDetails){
            console.log("true");
            dispatch(signupUser(formData['fullname'], formData['email'], formData['password'], formData['regcaptcha'] ));
        }else{
            console.log("false");
            setCaptchaError(t('Invalid Captcha. Please try again.'));
        }
       
    };

    return (
        <>
            {userSignUp ? <Redirect to={'/mainDashboard'}></Redirect> : null}

            <AuthLayout
                helpText={t("Don't have an account? Create your account, it takes less than a minute")}
                bottomLinks={<BottomLink />}
            >
                 {captchaError && (
                    <Alert variant="danger" className="my-2">
                        {captchaError}
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
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
                    <div className='d-flex align-items-center gap-3 mb-2'>
                        <Captcha ref={refCaptchaRef} charNum={6} onChange={handleChange} />
                        <div>
                            <button className='captch-refresh-btn' onClick={captchaRefresh}><img src={refreshIcon} alt="" /></button>
                        </div>
                    </div>
                    <FormInput
                        label={t('Captcha')}
                        type="text"
                        name="regcaptcha"
                        placeholder="Enter Correct Captcha"
                        containerClass={'mb-3'}
                    />
                     <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3'}
                    />


                    <div className="text-center d-grid">
                        <Button variant="success" type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>

                {/* <div className="text-center">
                    <h5 className="mt-3 text-muted">{t('Sign up using')}</h5>
                    <SocialLinks />
                </div> */}
            </AuthLayout>
        </>
    );
};

export default RegisterNew;
