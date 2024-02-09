import React, { useEffect, useRef , RefObject, useState} from 'react';
import { Row, Col, Card, Tab } from 'react-bootstrap';
import { UserDetails } from '../../../../helpers/api/APIs';

// components
// import PageTitle from '../../../../components/PageTitle';
// import Messages from '../../../../components/Messages';

import UserBox from './UserBox';
// import About from './About';
// import TimeLine from './TimeLine';
import Settings from './Settings';

// interface ProjectDetails {
//     id: number;
//     client: string;
//     name: string;
//     startDate: string;
//     dueDate: string;
//     status: string;
// }
 
 

const UserProfile = () => {
   
    const tabRef:RefObject<HTMLInputElement> = useRef(null);

    const[userData,setUserData] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            if (tabRef.current) {
                tabRef.current.click();
            }
    
            try {
                const data = await UserDetails();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);
    
    

    return (
        <>
            <h3 className='h-3 mt-2'>Profile</h3>
            <Row>
                <Col xl={4} lg={4}>
                    <UserBox userData={userData}/>
                </Col>
                <Col xl={8} lg={8}>
                                
                    <Tab.Container defaultActiveKey="timeline">
                        <Card>
                            <Card.Body>
                                
                                <Settings />
                                    
                            </Card.Body>
                        </Card>
                        
                    </Tab.Container>
                    
                </Col>
            </Row>
        </>
    );
}; 

export default UserProfile;
