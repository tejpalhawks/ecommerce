import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Project } from '../helpers/api/projectData';

import {
    FaFacebook,
    FaTelegram,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube
} from "react-icons/fa";
// import  { FiYoutube } from "react-icons/fi";
import { ProjectDetails } from '../helpers/api/APIs';







// const SocialIcon = [
//     {
//         name: "Telegram",
//         icon: <FaTelegram />,
//         link: "https://google.com"
//     },
//     {
//         name: "Facebook",
//         icon: <FaFacebook />,
//         link: "https://google.com"
//     },
//     {
//         name: "Twitter",
//         icon: <FaTwitter />,
//         link: "https://google.com"
//     },
//     {
//         name: "Instagram",
//         icon: <FaInstagram />,
//         link: "https://google.com"
//     },
//     {
//         name: "Youtube",
//         icon: <FiYoutube />,
//         link: "https://google.com"
//     },
//     {
//         name: "Linkedin",
//         icon: <FaLinkedin />,
//         link: "https://google.com"
//     }
// ]

interface SocialMediaData {
    [key: string]: string;
  }



const Footer = () => {
    const currentYear = new Date().getFullYear();
    const[projectame, setProjectName] = useState()
    const[socialLinks, setSocialLinks] =useState<SocialMediaData>({});

    const iconMapping: { [key: string]: React.ReactNode } = {
        'instagram': <FaInstagram />,
        'fb': <FaFacebook />,
        'twitter': <FaTwitter />,
        'youtube': <FaYoutube />,
        'linkedin': <FaLinkedin />,
        'telegram': <FaTelegram />,
      };


    useEffect(()=>{
        ProjectDetails()
            .then(data => {
                const projectName = data.project_name
                const socialLinksData = data.social_media_link

                setProjectName(projectName)

                setSocialLinks(socialLinksData)
            })
            .catch(error => {
                console.error(error);
            });
    },[])

    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row mb-1>
                        <Col md={6}>
                            <p className='m-0 p-1'> {currentYear} &copy;<Link to="#"> {projectame} </Link> All Right Reserve</p>
                        </Col>

                        <Col md={6}>
                            <div className="text-md-end footer-icon-show d-flex gap-3 justify-content-end">
                            {Object.entries(socialLinks).map(([platform, url]) => (
                                url && (
                                    <div key={platform}>
                                    <a href={url} target='_blank' rel="noreferrer"><div  className='footer-social-icon-box'>
                                    {iconMapping[platform]}
                                        </div></a>
                                </div>
                                )
                            ))}
                            </div>
                            
                        </Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
