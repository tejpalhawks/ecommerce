import React, { useEffect, useState } from 'react';
// import {  FieldErrors, Control } from 'react-hook-form';
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { countries } from '../../../../pages/apps/Ecommerce/Checkout/data';
import { withSwal } from 'react-sweetalert2';
import { useLocation, useHistory  } from 'react-router-dom';
import { GetAllCountries, GetCitiesByState, GetStateByCountry, UserProfileEdit } from '../../../../helpers/api/APIs';


// components
import { FormInput } from '../../../../components/';
import { MdLockReset } from 'react-icons/md';
import ChangePassword from './ChangePassword';
// import { number } from 'yup';

// interface SocialInfo {
//     label: string;
//     icon: string;
//     placeholder: string;
// }

// interface FormInputProps {
//     register: any;
//     errors: FieldErrors;
//     control: Control<any>;
// }

const Settings = withSwal((props: any) => {
    const { swal } = props;
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        password: '',
        country: '',
        state: '',
        city: '',
        address: '',
        mobile: '',
        image : ''
      });

    //   const newNoti = () => toast("Wow so easy!");

    // const[countryId,setCountryId] = useState()
    
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        // Check if the value is not an empty string before updating formData
        if (value.trim() !== "") {
          setFormData({
            ...formData,
            [name]: value,
          });
          if (name === "country") {
            const otherValue = e.target.options[e.target.selectedIndex].getAttribute('data-additional-value');
            setFormData({
                ...formData,
                [name]: otherValue,
              });
            // setCountryId(value);
            fatchStates(value)
          } else if(name === "state"){
            const otherValue = e.target.options[e.target.selectedIndex].getAttribute('data-additional-value');
            fatchCities(value)
            setFormData({
                ...formData,
                [name]: otherValue,
              });
          }
        }
      };
      

      

     
      
      const handleFormSubmit = async(e:any) => {
        e.preventDefault();
        
        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== '')
          );
          console.log(filteredFormData);
        
        if( formData.name === '' && formData.address === '' && formData.bio === ''  && formData.country === '' && formData.state === '' && formData.city === '' && formData.address === '' && formData.mobile === ''){
            swal.fire({
                title: '',
                text: 'Please fill any field to update your profile',
                icon: 'question',
            })
        }
        else{
            UserProfileEdit({filteredFormData})
            .then(data => {
                console.log(data);
                if(data.message === "User updated successfully"){
                    swal.fire({
                        title: 'Success',
                        text: 'Profile updated successfully',
                        icon: 'success',
                    })
                    
                }
            })
            .catch(error => {
                console.error(error);
            });
           
            console.log('Form data:', formData);
            setFormData({
            name: '',
            bio: '',
            password: '',
            country: '',
            state: '',
            city: '',
            address: '',
            mobile: '',
            image: ''
        })
        }
      };

      

      const[activeTab, setActiveTab] = useState('tab1')
      const handelTabChange = (tab:any) =>{
        setActiveTab(tab)
      }

      const location = useLocation();
      const history = useHistory();

      useEffect(()=>{
        if (location.pathname === '/profile/resetPassword') {
            setActiveTab('tab2');
          }

      },[location.pathname])

      useEffect(() => {
        if (activeTab === 'tab1') {
          history.push('/profile');
        }
      }, [activeTab, history]);

      const[allCountries,setAllCountries] = useState([])
      useEffect(() => {
        const fatchCountries = async () => {
            try {
                const data = await GetAllCountries();
                setAllCountries(data.data);
            } catch (error) {
                console.log("An error occurred while fetching data.");
            } finally {
                console.log();
            }
        };
    
        
        fatchCountries();
      }, []);


      
      const[allStates,setAllStates] = useState<any>()

      const fatchStates = async (countryId:any) => {
        try {
            const data = await GetStateByCountry({countryId});
            if(data?.length){
                setAllStates(data);
               
            }
            
        } catch (error) {
            console.log("An error occurred while fetching data.");
        } finally {
            console.log(false);
        }
      };


      const[allCities,setAllCities] = useState<any>()
      const fatchCities = async (stateId:any) => {
        try {
            const data = await GetCitiesByState({stateId});
            if(data?.length){
                setAllCities(data);
               
            }
            
        } catch (error) {
            console.log("An error occurred while fetching data.");
        } finally {
            console.log(false);
        }
      };
      
      


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
                        <option value="" disabled selected>
                        --select--
                        </option>
                        {allCountries && allCountries.map((item:any) => (
                            <option  value={item.id}  data-additional-value={item.name}>
                                {item.name}
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
                        {allStates && allStates.map((item:any) => (
                            <option  value={item.id} label={item.name} data-additional-value={item.name}>
                                {item.name}
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
                        {allCities && allCities.map((city:any) => (
                            <option  >
                                {city.name}
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
                        // value={formData.email}
                        // onChange={handleInputChange}
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
                        disabled
                        not-allowed
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
            {activeTab === 'tab2' && <div> <ChangePassword/> </div>}
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
