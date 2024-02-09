import React from 'react';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';

// helpers
import { getHorizontalMenuItems } from '../../helpers/menu';

// components
import AppMenu from '../../layouts/Menu';

// interface NavbarProps {
//     isMenuOpened?: boolean;
// }
const navbarData = [
    {
        icon: 'home',
        label: 'Dashboard',
    }
]

const Navbar1 = () => {
    // change the inputTheme value to light for creative theme
    const inputTheme = 'light';

    return (
        <React.Fragment>
            <div className="topnav">
                <div className="container-fluid">
                    <nav className={classNames('navbar', 'navbar-expand-lg', 'topnav-menu', 'navbar-' + inputTheme)}>
                        {/* <Collapse in={isMenuOpened} className="navbar-collapse"> */}
                            <div id="topnav-menu-content" className='navbar-collapse collapse'>
                                <ul className="side-menu list-unstyled navbar-nav">
                                {navbarData.map((item, index) => (
                                    <li key={index} className='menu-item nav-link'>
                                        <FeatherIcon icon={item.icon} className="hori-icon me-1" />
                                        <span className='navbar-main-list'> {item.label} </span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        {/* </Collapse> */}
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar1;
