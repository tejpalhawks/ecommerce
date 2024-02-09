import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { withSwal } from 'react-sweetalert2';

//actions
import { resetAuth } from '../../redux/actions';
import { RootState, AppDispatch } from '../../redux/store';

// components
import {  FormInput } from '../../components/';

import AuthLayout from './AuthLayout';
import { ResetPasswordViaLink } from '../../helpers/api/APIs';





/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-white-50">
                    {t('Back to')}{' '}
                    <Link to={'/auth/login'} className="text-white ms-1">
                        <b>{t('Log in')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ResetPassword: React.FC = withSwal((props: any) => {
    const { swal } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const [resetToken, setToken] = useState<string | undefined>(undefined);
    

    const [formData, setFormData] = useState({
        password: '',
        rePassword: '',
        resetToken: ''
      });

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, passwordReset, resetPasswordSuccess, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    /*
     * form validation schema
     */
 

    /*
     * handle form submission
     */
    const handelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            resetToken: typeof resetToken === 'string' ? resetToken : '',
          });
    };

    

    const[passwordError,setPasswordError] = useState('')

    const onSubmit =(e:any)=>{
        
        e.preventDefault();
        if(formData.password === '' ){
            setPasswordError("New password field can't be empty")
        } else if(formData.password.length < 6){
            setPasswordError("New Password must be at least 6 characters long")
        }
        else if(formData.password !== formData.rePassword){
            setPasswordError("New Password must be same in  both fields")
        } else{
           ResetPasswordViaLink({formData})
                .then(data=>{
                    if(data.code === 200){
                        swal.fire({
                            title: 'Successful',
                            text: 'Password Reset Successfully.',
                            icon: 'success',
                        })
                        setFormData({
                            password: '',
                            rePassword: '',
                            resetToken: ''
                        })
                        setToken("")
                    }else{
                        swal.fire({
                            title: 'Error',
                            text: data.message,
                            icon: 'error',
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            setPasswordError('')
        }
    }

    useEffect(() => {
        const extractedToken =  window.location.pathname.split('/').pop();
        setToken(extractedToken);
        
      }, []);


    return (
        <>
            <AuthLayout
                helpText={t(
                    ""
                )}
                bottomLinks={<BottomLink />}
            >
                {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                {!passwordReset && (
                    <form onSubmit={onSubmit} >
                        <FormInput
                            label={t('Password')}
                            type="text"
                            name="password"
                            placeholder={t('Enter your new Password')}
                            containerClass={'mb-3'}
                            onChange={handelChange}
                            value={formData.password}
                        />
                        <FormInput
                            label={t('Confirm Password')}
                            type="text"
                            name="rePassword"
                            placeholder={t('Confirm New Password')}
                            containerClass={''}
                            onChange={handelChange}
                            value={formData.rePassword}
                        />
                        <label className='mb-3 text-danger mt-2'> {passwordError && passwordError} </label>

                        <div className="d-grid text-center">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {t('Reset Password')}
                            </Button>
                        </div>
                    </form>
                )}
            </AuthLayout>
        </>
    );
});

export default ResetPassword;
