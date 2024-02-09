import React, {  useState } from 'react';
import {  Col, Row } from 'react-bootstrap';
import { FormInput } from '../components';
// import { MdLockReset } from "react-icons/md";
// import AuthLayout from '../pages/auth/AuthLayout';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { withSwal } from 'react-sweetalert2';


const ResetPassword = withSwal((props: any) => {
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
        newPassword: '',
        reNewPassword: ''
      });

      const[passMiss, setPassMiss]= useState(false)

      const handleFormSubmit = (e:any) => {
        e.preventDefault();
        if(formData.newPassword === ''){
            window.alert("All fields are required")
        }
        else if(formData.newPassword !== formData.reNewPassword){
            window.alert("New Password must be same in  both fields")
            setPassMiss(true)
        } else{
            setPassMiss(false)
            swal.fire({
                title: 'Password Reset!',
                text: 'Password Reset Successfully !',
                icon: 'success',
            })
            console.log('Form data:', formData);
            setFormData({
            oldPassword: '',
            newPassword: '',
            reNewPassword: ''
        })
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
                        type="password"
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
                        name="newPassword"
                        placeholder="Enter New Password"
                        containerClass={`mb-3 ${passMiss ? 'text-danger' : ''}`}
                        key="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <FormInput
                        label="Re-Enter New Password"
                        type="text"
                        name="reNewPassword"
                        placeholder="Re-Enter New Password"
                        containerClass={`mb-3 ${passMiss ? 'text-danger' : ''}`}
                        key="reNewPassword"
                        value={formData.reNewPassword}
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

export default ResetPassword;