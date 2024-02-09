import React, { useEffect, useState } from 'react';
import { useForm, FieldErrors, Control } from 'react-hook-form';
import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { countries } from '../../pages/apps/Ecommerce/Checkout/data';
import { withSwal } from 'react-sweetalert2';

// components
import { FormInput } from '../../components/';
import { MdLockReset } from 'react-icons/md';
import ResetPassword from '../ResetPassword';

interface SocialInfo {
    label: string;
    icon: string;
    placeholder: string;
}

interface FormInputProps {
    register: any;
    errors: FieldErrors;
    control: Control<any>;
}

const Settings = withSwal((props: any) => {
    const { swal } = props;
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        email: '',
        password: '',
        country: '',
        state: '',
        city: '',
        address: '',
        mobile: ''
      });

    //   const newNoti = () => toast("Wow so easy!");

    
    
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const citiesArray = [
        { value: '-- Select  --', label: '-- Select  --' },
        { value: 'new-york', label: 'New York' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        // Add more cities as needed
      ];

    
      
      const handleFormSubmit = (e:any) => {
        e.preventDefault();
        if(formData.name == '' && formData.address == '' && formData.bio == '' && formData.email == '' && formData.country == '' && formData.state == '' && formData.city == '' && formData.address == '' && formData.mobile == ''){
            swal.fire({
                title: '',
                text: 'Please fill any field to update your profile',
                icon: 'question',
            })
        }
        else{
            
            swal.fire({
                title: 'Updated',
                text: 'Profile updated successfully',
                icon: 'success',
            })
            console.log('Form data:', formData);
            setFormData({
            name: '',
            bio: '',
            email: '',
            password: '',
            country: '',
            state: '',
            city: '',
            address: '',
            mobile: '',
        })
        }
      };

      

      const[activeTab, setActiveTab] = useState('tab1')
      const handelTabChange = (tab:any) =>{
        setActiveTab(tab)
      }

      useEffect(()=>{
        console.log(countries);
      },[])


    return (
        <>
            <h5 className="mb-4 text-uppercase">
                <i className="mdi mdi-account-circle me-1"></i> Personal Info
            </h5>
            
            {activeTab === 'tab1' && <>
            <form onSubmit={handleFormSubmit}>
            <Row>
                <Col md={6}>
                    <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        containerClass={'mb-3'}
                        key="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col md={6}>
                    <FormInput
                        label="Address"
                        type="text"
                        name="address"
                        placeholder="Your Address"
                        // rows="4"
                        containerClass={'mb-3'}
                        key="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormInput
                        label="Bio"
                        type="text"
                        name="bio"
                        placeholder="Write something..."
                        // rows="4"
                        containerClass={'mb-3'}
                        key="userbio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </Col>
                
            </Row>
            {/* address fieldds dropdown */}
            <Row>
                <Col>
                    <FormInput
                        label="Country"
                        type="select"
                        name="country"
                        placeholder="Write something..."
                        containerClass={'mb-3'}
                        key="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        {countries.map((city:any) => (
                            <option  >
                                {city.label}
                            </option>
                        ))}
                    </FormInput>
                </Col>
                <Col>
                <FormInput
                        label="State"
                        type="select"
                        name="state"
                        placeholder="Write something..."
                        containerClass={'mb-3'}
                        key="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    >
                        {citiesArray.map((city:any) => (
                            <option  >
                                {city.value}
                            </option>
                        ))}
                    </FormInput>
                </Col>
                <Col>
                    <FormInput
                        label="City"
                        type="select"
                        name="city"
                        placeholder="Your Address"
                        // rows="4"
                        containerClass={'mb-3'}
                        key="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    >
                        {citiesArray.map((city:any) => (
                            <option  >
                                {city.value}
                            </option>
                        ))}
                    </FormInput>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                    <FormInput
                        label="Email Address"
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        key="useremail"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                        not-allowed
                        className='cursor-na'
                    />
                    {/* <span className="form-text text-muted">
                        <small>
                            If you want to change email please <Link to="#">click</Link> here.
                        </small>
                    </span> */}
                </Col>
                <Col md={6} className="mb-3">
                    <FormInput
                        label="Mobile"
                        type="number"
                        name="mobile"
                        placeholder="Enter Your Mobile Number"
                        key="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                    {/* <span className="form-text text-muted">
                        <small>
                            If you want to change password please <Link to="#">click</Link> here.
                        </small>
                    </span> */}
                </Col>
            </Row>
            <Row md={4} className='d-flex justify-content-center'>
                <button type='submit'  className='btn btn-success mb-2'>
                    Save
                </button>
            </Row>
            </form>
            </>}
            {activeTab === 'tab2' && <div> <ResetPassword/> </div>}
            <div className="text-end d-flex justify-content-end bg-secondary-subtle">

                    {activeTab === 'tab1' && <button type='button' className="btn btn-light mt-2 mx-2" onClick={()=>handelTabChange('tab2')}>
                        <MdLockReset /> {" "}Reset Password
                    </button>}
                    {activeTab === 'tab2' && <button type='button' className="btn btn-light mt-2 mx-2" onClick={()=>handelTabChange('tab1')}>
                        <MdLockReset /> {" "}Edit Profile
                    </button>}
                    
                    
                </div>
            
            
        </>
    );
});







export default Settings;
