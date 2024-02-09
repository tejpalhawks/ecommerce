import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import classNames from 'classnames';
import Captcha from 'react-captcha-code';
import refreshIcon from '../../assets/images/icons/refresh.svg';
import { withSwal } from 'react-sweetalert2';

//actions
import { resetAuth } from '../../redux/actions';

import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';
// import { signup } from '../../helpers';
// import axios from 'axios';
import { base } from '../../API/api';
import { ProjectDetails } from '../../helpers/api/APIs';

interface UserData {
    fullname: string;
    email: string;
    password: string;
    regcaptcha: string;
    checkboxsignup: boolean;
    contact: number;
    confirmpassword: string;
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

const Register = withSwal((props: any) => {
    const { swal } = props;
    const refCaptchaRef = useRef<any>(null);
    const [captchaDetails, setCaptchaDetails] = useState();
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const [isOtpShow, setIsOtpShow] = useState(false)
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);


    const handleChange = useCallback((captcha) => {
        setCaptchaDetails(captcha);
        console.log(captcha);

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
            confirmpassword: yup.string().required(t('Please confirm Password')),
            contact: yup.string().required(t('Please enter valid contact Info')),
            // regcaptcha: yup.string().required(t('Please enter valid Captcha')),
        })
    );

    
    const[registerSuccessful,setRegisterSuccessful] = useState(false)
    const[userEmail, setUserEmail] = useState('')

    const onSubmit = async( formData: UserData) => {
        setUserEmail(formData.email)
        try {
            await fetch(`${base.API_URL}user/signup`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: formData.email,
                  password: formData.password,
                  name: formData.fullname,
                  mobile: formData.contact
                }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(response => {
                    if(response.code === 201){
                        console.log('Register successful', response);
                        // setRegisterSuccessful(true)
                        setIsOtpShow(true)
                    }else if(response.code === 400){
                        swal.fire({
                            title: 'Failed',
                            text: 'This email has already been used',
                            icon: 'error',
                        })
                        console.log("already email taken");
                    }else{
                        console.log(response);
                    }
                })
                .catch(error => {
                  console.error('There was an error with the fetch operation:', error);
                });
        } catch (error) {
            console.error('There was an error with the fetch operation:', error);
        }
    };


    const verifyOTP =async()=>{
        const otpElement = document.getElementById('otp');
        const otp = otpElement ? (otpElement as HTMLInputElement).value : undefined;

        console.log(otp);
        try {
            await fetch(`${base.API_URL}user/otp-verify`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userEmail,
                  otp: otp
                }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(response => {
                    if(response.code === 200){
                        console.log('Otp verified', response);
                        setRegisterSuccessful(true)
                    }else if(response.code !== 200){
                        swal.fire({
                            title: 'Failed',
                            text: response.message,
                            icon: 'error',
                        })
                    }else{
                        console.log(response);
                    }
                })
                .catch(error => {
                  console.error('There was an error with the fetch operation:', error);
                });
        } catch (error) {
            console.error('There was an error with the fetch operation:', error);
        }
    }


    // captch setting
    const[isCaptcha, setIsCaptcha] = useState(Boolean)
    useEffect(()=>{
        ProjectDetails()
            .then(data => {
                const captchData  = data.captcha_settings.customer
                if(captchData === 1){
                    setIsCaptcha(true)
                }else{
                    setIsCaptcha(false)
                }
            })
            .catch(error => {
                console.error(error);
            });
        

    },[])

  

    return (
        <>
            {registerSuccessful ? <Redirect to={'/auth/confirm'}></Redirect> : null}

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

                {isOtpShow ? 
                    <div>
                        <FormInput
                        label={t('Enter OTP')}
                        type="text"
                        name="otp"
                        placeholder={t('Enter otp')}
                        containerClass={'mb-2'}
                        id="otp"
                    /> 
                    <Button type='button' onClick={verifyOTP}>Submit</Button>
                    </div> : <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('Full Name')}
                        type="text"
                        name="fullname"
                        placeholder={t('Enter your name')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Email address')}
                        type="email"
                        name="email"
                        placeholder={t('Enter your email')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Contact No.')}
                        type="number"
                        name="contact"
                        placeholder={t('Enter your contact number')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('Confirm Password')}
                        type="password"
                        name="confirmpassword"
                        placeholder={t('Enter your confirm password')}
                        containerClass={'mb-2'}
                    />
                    <div className={`d-flex align-items-center gap-3 mb-2 ${isCaptcha ? "" : "d-none"}` }>
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
                        containerClass={`mb-2 ${isCaptcha ? "" : "d-none"}`}
                    />
                     <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-2'}
                    />


                    <div className="text-center d-grid">
                        <Button variant="success" type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>}

                

                {/* <div className="text-center">
                    <h5 className="mt-3 text-muted">{t('Sign up using')}</h5>
                    <SocialLinks />
                </div> */}
            </AuthLayout>
        </>
    );
});

export default Register;
