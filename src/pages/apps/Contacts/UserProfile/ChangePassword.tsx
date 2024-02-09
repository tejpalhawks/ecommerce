import React, {  useState } from 'react';
import {  Col, Row } from 'react-bootstrap';
import { FormInput } from '../../../../components';
// import { MdLockReset } from "react-icons/md";
// import AuthLayout from '../pages/auth/AuthLayout';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { withSwal } from 'react-sweetalert2';
import { UserPasswordReset } from '../../../../helpers/api/APIs';


const ChangePassword = withSwal((props: any) => {
    const { swal } = props;
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      };

      const [formData, setFormData] = useState({
        oldPassword: '',
        Password: '',
        rePassword: ''
      });

      const[passMiss, setPassMiss]= useState(false)

      const handleFormSubmit = (e:any) => {
        e.preventDefault();
        if(formData.Password === '' ){
            window.alert("New password field can't be empty")
        } else if(formData.oldPassword === '' ){
            window.alert("Old password required")
        } else if(formData.Password.length < 6){
            window.alert("New Password must be at least 6 characters long")
        }
        else if(formData.Password !== formData.rePassword){
            window.alert("New Password must be same in  both fields")
            setPassMiss(true)
        } else{
            setPassMiss(false)
            UserPasswordReset({formData})
            .then(data => {
                console.log(data);
                if(data.code === 400){
                    swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                    })
                }
                else{
                    swal.fire({
                        title: 'Password Reset!',
                        text: 'Password Reset Successfully !',
                        icon: 'success',
                    })
                    setFormData({
                        oldPassword: '',
                        Password: '',
                        rePassword: ''
                    })
                }
            })
            .catch(error => {
                console.error(error);
            });
            
            
        }
      };

      var headers = new Headers();
      headers.append("X-CSCAPI-KEY", "API_KEY");

      
    return (
        <>
            <form onSubmit={handleFormSubmit}>
            <Row>
                <Col md={6}>
                    <FormInput
                        label="Old Password"
                        type="text"
                        name="oldPassword"
                        placeholder="Enter Old Password"
                        containerClass={'mb-3'}
                        key="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                    /> 
                </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <FormInput
                        label="New Password"
                        type="text"
                        name="Password"
                        placeholder="Enter New Password"
                        containerClass={`mb-3 ${passMiss ? 'text-danger' : ''}`}
                        key="newPassword"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <FormInput
                        label="Re-Enter New Password"
                        type="text"
                        name="rePassword"
                        placeholder="Re-Enter New Password"
                        containerClass={`mb-3 ${passMiss ? 'text-danger' : ''}`}
                        key="reNewPassword"
                        value={formData.rePassword}
                        onChange={handleInputChange}
                    />
                </Col>
                </Row>
                <Row md={4} className='d-flex justify-content-center'>
                <button type='submit'  className='btn btn-success mb-2'>
                    Save
                </button>
                </Row>
            </form>
        </>
    );
});

export default ChangePassword;