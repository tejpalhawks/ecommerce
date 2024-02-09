import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
// import classNames from 'classnames';
import Captcha from 'react-captcha-code';
import refreshIcon from '../../assets/images/icons/refresh.svg';
import { withSwal } from 'react-sweetalert2';


// actions
import { resetAuth } from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

import AuthLayout from './AuthLayout';
// import axios, { AxiosResponse } from 'axios';
import { base } from '../../API/api';
import { ProjectDetails, UserLogin } from '../../helpers/api/APIs';

interface LocationState {
    from?: Location;
}

interface UserData {
    email: string;
    password: string;
    captcha: string;
}

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p>
                    <Link to={'/auth/forget-password'} className="text-white-50 ms-1">
                        {t('Forgot your password?')}
                    </Link>
                </p>
                <p className="text-white-50">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/auth/register'} className="text-white ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = withSwal((props: any) =>{
    const { swal } = props;
    const refCaptchaRef = useRef<any>(null);
    const [captchaDetails, setCaptchaDetails] = useState();
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { user, userLoggedIn, loading, error } = useSelector((state: RootState) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    
    
    
    const handleChange = useCallback((captcha) => {
        setCaptchaDetails(captcha);
        console.log(captcha);
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
            email: yup.string().required(t('Please enter Email')),
            password: yup.string().required(t('Please enter Password')),
            // captcha: yup.string().required(t('Please enter valid Captcha')),
            // captcha: yup.string().required(t('Please enter valid Captcha')),
        })
    );

    /*
    handle form submission
    */
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
 
    const onSubmit = async(formData: UserData) => {
        try {
            await UserLogin({formData})
            .then(response => {
              if (response.code !== 200) {
                swal.fire({
                    title: 'error',
                    text: response.message,
                    icon: 'error',
                })
                throw new Error('Network response was not ok');
              }
              console.log('Login successful', response);
                    sessionStorage.setItem("AUTH_SESSION_KEY", response.token)
                    window.location.href = '/dashboard-1';
            })
            .catch(error => {
              console.error('There was an error with the fetch operation:', error);
            });
        } catch (error) {
            console.error('There was an error with the fetch operation:', error);
        }
    };

    // const jsonData = {
    //     email: 'ghhhf@gmail.com',
    //     password: 'aman7333',
    //   };

    

    const location = useLocation<LocationState>();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';

    return (
        <>
            {(userLoggedIn || user) && <Redirect to={redirectUrl}></Redirect>}

            <AuthLayout
                helpText={t('Enter your email address and password to access.')}
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

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ }}
                >
                    <FormInput
                        label={t('Email')}
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        containerClass={'mb-3'}
                    ></FormInput>
                    <div className={`d-flex align-items-center gap-3 mb-2 ${isCaptcha ? "" : "d-none"}`}>
                        <Captcha ref={refCaptchaRef} charNum={6} onChange={handleChange} />
                        <div>
                            <button className='captch-refresh-btn' onClick={captchaRefresh}><img src={refreshIcon} alt="" /></button>
                        </div>
                    </div>
                    <FormInput
                        label={t('Captcha')}
                        type="text"
                        name="captcha"
                        placeholder="Enter Correct Captcha"
                        containerClass={`mb-3 ${isCaptcha ? "" : "d-none"}`}
                    ></FormInput>

                    <div className="text-center d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>

                {/* <div className="text-center">
                    <h5 className="mt-3 text-muted">{t('Sign in with')}</h5>
                    <SocialLinks />
                </div> */}
            </AuthLayout>
        </>
    );
});

export default Login;
