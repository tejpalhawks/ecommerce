import React, { useRef,  useState, RefObject } from 'react';
import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { PiUploadSimpleBold } from "react-icons/pi";

// import profileImg from '../../../../assets/images/users/user-1.jpg';
import { UploadProfileimage } from '../../../../helpers/api/APIs';
import { withSwal } from 'react-sweetalert2';



const UserBox =  withSwal((props: any) => {
    const userData = props.userData
    const { swal } = props;
    const [selectedImage, setSelectedImage] = useState('');
    const hiddenChooseImage: RefObject<HTMLInputElement> = useRef(null);
    // const [image, setImage]= useState('')

    const uploadImage = () => {
        
        if (hiddenChooseImage.current) {
          hiddenChooseImage.current.click();
        }
      };
    
    const handleImageChange = (event:any) => {
        
        const file = event.target.files[0];
        // upload image and get url-----
        UploadProfileimage(file)
            .then(data => {
                if(data.code === 200){
                    swal.fire({
                        title: 'Success',
                        text: data.message,
                        icon: 'success',
                    })
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

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        
      };

      reader.readAsDataURL(file);
    }
    }

  
    

    // const[userDetail,setUserData] = useState()
    

    return (
        <Card className="text-center">
            <Card.Body>
                {selectedImage ? <img src={selectedImage} alt="Selected" className="rounded-circle avatar-xl  img-thumbnail "  /> : userData && <img src={userData.image} alt="Selected" className="rounded-circle avatar-xl img-thumbnail "  /> }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    className='hidden'
                    ref={hiddenChooseImage}
                    />
                <div className='cursor-pointer'><PiUploadSimpleBold onClick={()=>uploadImage()} className='text-black'/></div>
                <div className='cursor-pointer'>
                </div>
                <h4 className="mb-0"> {userData && userData.name} </h4>
                {/* <p className="text-muted">@webdesigner</p> */}
                {/* <button type="button" className="btn btn-success btn-xs waves-effect mb-2 waves-light">
                    Follow
                </button>{' '}
                <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light">
                    Message
                </button> */}
                <div className="text-start mt-3">
                    {/* <h4 className="font-13 text-uppercase">About Me :</h4> */}
                    <p className="text-muted font-13 mb-3">
                    {userData && userData.bio}
                    </p>
                    <p className="text-muted mb-2 font-13">
                        <strong>Full Name :</strong>
                        <span className="ms-2">{userData && userData.name}</span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Mobile :</strong>
                        <span className="ms-2">{userData && userData.mobile}</span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Email :</strong>
                        <span className="ms-2 ">{userData && userData.email}</span>
                    </p>

                    <p className="text-muted mb-1 font-13">
                        <strong>Address :</strong>
                        <span className="ms-2">{userData &&  userData.state} { " ,"} {userData &&  userData.address}</span>
                    </p>
                </div>
                
            </Card.Body>
        </Card>
    );
});

export default UserBox;
