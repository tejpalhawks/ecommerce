import React, { useEffect, useState } from 'react';
import { Button,  Row, Col } from 'react-bootstrap';
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
import { SendForgetPasswordEmail } from '../../helpers/api/APIs';

// interface UserData {
//     email: string;
// }

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

const ForgetPassword = withSwal((props: any)=> {
    const { swal } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        email: '',
      });

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    /*
     * form validation schema
     */
    

    const handelChange = (e:any)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    /*
     * handle form submission
     */
    const[emailError, setEmailError] = useState(false)
    const onSubmit = (e:any) => {
        e.preventDefault();
        try {
            SendForgetPasswordEmail({formData})
            .then(data => {
                console.log(data);
                if(data.code === 200){
                    setEmailError(false)
                    swal.fire({
                        title: 'Successful',
                        text: 'A link to reset password sent to you mail.',
                        icon: 'success',
                    })
                    setFormData({
                        email: ''
                    })
                } else{
                    
                    setEmailError(data.message)
                }
            })
            .catch(error => {
                console.error(error);
            });
        } catch (error) {
            
        }
        console.log(formData);
    };

    return (
        <>
            <AuthLayout
                helpText={t('Enter your email address and password to access admin panel.')}
                bottomLinks={<BottomLink />}
            >
                

                <form onSubmit={onSubmit} >
                    
                    <FormInput
                        label={t('Email')}
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        containerClass={''}
                        onChange={handelChange}
                        value={formData.email}
                    />
                    <label className='mb-3 text-danger'> {emailError ? emailError : ""} </label>
                    
                    
                    

                    <div className="text-center d-grid">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </form>

                {/* <div className="text-center">
                    <h5 className="mt-3 text-muted">{t('Sign in with')}</h5>
                    <SocialLinks />
                </div> */}
            </AuthLayout>
        </>
    );
});

export default ForgetPassword;
