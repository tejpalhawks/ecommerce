import React, { useEffect, useRef , RefObject} from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';

// components
// import PageTitle from '../../../../components/PageTitle';
// import Messages from '../../../../components/Messages';

import UserBox from './UserBox';
import About from './About';
import TimeLine from './TimeLine';
import Settings from './Settings';

interface ProjectDetails {
    id: number;
    client: string;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
}

 

const UserProfile = () => {
    const projectDetails: ProjectDetails[] = [
        {
            id: 1,
            client: 'Halette Boivin',
            name: 'App design and development',
            startDate: '01/01/2015',
            dueDate: '10/05/2018',
            status: 'Work in Progress',
        },
        {
            id: 2,
            client: 'Durandana Jolicoeur',
            name: 'Coffee detail page - Main Page',
            startDate: '21/07/2016',
            dueDate: '12/05/2018',
            status: 'Pending',
        },
        {
            id: 3,
            client: 'Lucas Sabourin',
            name: 'Poster illustation design',
            startDate: '18/03/2018',
            dueDate: '28/09/2018',
            status: 'Done',
        },
        {
            id: 4,
            client: 'Donatien Brunelle',
            name: 'Drinking bottle graphics',
            startDate: '02/10/2017',
            dueDate: '07/05/2018',
            status: 'Work in Progress',
        },
        {
            id: 5,
            client: 'Karel Auberjo',
            name: 'Landing page design - Home',
            startDate: '17/01/2017',
            dueDate: '25/05/2021',
            status: 'Coming soon',
        },
    ];

    const tabRef:RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.click();
    }
  }, []);

    return (
        <>
            <h3 className='h-3 mt-2'>Profile</h3>
            <Row>
                <Col xl={4} lg={4}>
                    <UserBox />
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
