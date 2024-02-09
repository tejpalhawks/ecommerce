import React, { useRef,  useState, RefObject } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PiUploadSimpleBold } from "react-icons/pi";

import profileImg from '../../assets/images/users/user-1.jpg';

const UserBox = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const hiddenChooseImage: RefObject<HTMLInputElement> = useRef(null);
    const [image, setImage]= useState('')

    const uploadImage = () => {
        if (hiddenChooseImage.current) {
          hiddenChooseImage.current.click();
        }
      };
    
    const handleImageChange = (event:any) => {
        const file = event.target.files[0];
        localStorage.setItem("profilPhoto", JSON.stringify({ file: selectedImage }))

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        
      };

      reader.readAsDataURL(file);
    }
    }

    return (
        <Card className="text-center">
            <Card.Body>
                {selectedImage ? <img src={selectedImage} alt="Selected" className="rounded-circle avatar-xl  img-thumbnail "  /> : <img src={profileImg} alt="Selected" className="rounded-circle avatar-xl img-thumbnail "  /> }
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
                <h4 className="mb-0">Geneva McKnight</h4>
                {/* <p className="text-muted">@webdesigner</p> */}
                {/* <button type="button" className="btn btn-success btn-xs waves-effect mb-2 waves-light">
                    Follow
                </button>{' '}
                <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light">
                    Message
                </button> */}
                <div className="text-start mt-3">
                    <h4 className="font-13 text-uppercase">About Me :</h4>
                    <p className="text-muted font-13 mb-3">
                        Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type.
                    </p>
                    <p className="text-muted mb-2 font-13">
                        <strong>Full Name :</strong>
                        <span className="ms-2">Geneva D. McKnight</span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Mobile :</strong>
                        <span className="ms-2">(123) 123 1234</span>
                    </p>

                    <p className="text-muted mb-2 font-13">
                        <strong>Email :</strong>
                        <span className="ms-2 ">user@email.domain</span>
                    </p>

                    <p className="text-muted mb-1 font-13">
                        <strong>Location :</strong>
                        <span className="ms-2">USA</span>
                    </p>
                </div>
                
            </Card.Body>
        </Card>
    );
};

export default UserBox;
