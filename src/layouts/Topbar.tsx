import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
// import { Collapse } from 'react-bootstrap';

// actions
import { changeSidebarType } from "../redux/actions";

// store
import { RootState, AppDispatch } from "../redux/store";


//constants
import { LayoutTypes, SideBarTypes } from "../constants/layout";

// components
// import TopbarSearch from '../components/TopbarSearch';
import MaximizeScreen from "../components/MaximizeScreen";
// import AppsDropdown from "../components/AppsDropdown/";
// import SearchDropdown from "../components/SearchDropdown";
// import LanguageDropdown from "../components/LanguageDropdown";
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";
// import CreateNew from "../components/CreateNew";
// import MegaMenu from "../components/MegaMenu";

import profilePic from "../assets/images/users/user-1.jpg";
import avatar4 from "../assets/images/users/user-4.jpg";
import mylogo from "../assets/images/mylogo.png"

// components
// import AppMenu from './Menu';
import { ProjectDetails, UserDetails } from "../helpers/api/APIs";
import { PiShoppingCartFill } from "react-icons/pi";
// import { error } from "console";

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
}

type userDetailType = {
    name: string;
    image: string | null |undefined
    // Other properties if there are any
};


const Navbar = React.lazy(() => import('../layouts/Horizontal/Navbar'));

// get the notifications
const Notifications: NotificationItem[] = [
  {
    id: 1,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    avatar: profilePic,
  },
  {
    id: 2,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 3,
    text: "Karen Robinson",
    subText: "Wow ! this admin looks good and awesome design",
    avatar: avatar4,
  },
  {
    id: 4,
    text: "New user registered.",
    subText: "5 hours ago",
    icon: "mdi mdi-account-plus",
    bgColor: "warning",
  },
  {
    id: 5,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "info",
  },
  {
    id: 6,
    text: "Carlos Crouch liked Admin",
    subText: "13 days ago",
    icon: "mdi mdi-heart",
    bgColor: "secondary",
  },
];

// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'fe-user',
        redirectTo: '/profile',
    },
    {
        label: 'My Cart',
        icon: 'fe-settings',
        redirectTo: '/shopping-cart',
    },
    {
        label: 'Orders',
        icon: 'fe-settings',
        redirectTo: '/profile/resetPassword',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];




// get mega-menu options
// const MegaMenuOptions = [
//   {
//     id: 1,
//     title: "UI Components",
//     menuItems: [
//       "Widgets",
//       "Nestable List",
//       "Range Sliders",
//       "Masonry Items",
//       "Sweet Alerts",
//       "Treeview Page",
//       "Tour Page",
//     ],
//   },
//   {
//     id: 2,
//     title: "Applications",
//     menuItems: [
//       "eCommerce Pages",
//       "CRM Pages",
//       "Email",
//       "Calendar",
//       "Team Contacts",
//       "Task Board",
//       "Email Templates",
//     ],
//   },
//   {
//     id: 3,
//     title: "Extra Pages",
//     menuItems: [
//       "Left Sidebar with User",
//       "Menu Collapsed",
//       "Small Left Sidebar",
//       "New Header Style",
//       "Search Result",
//       "Gallery Pages",
//       "Maintenance & Coming Soon",
//     ],
//   },
// ];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
}



const Topbar = ({
    hideLogo,
    navCssClasses,
    openLeftMenuCallBack,
    topbarDark,
    }: TopbarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    // const inputTheme = 'dark';

    const [isopen, setIsopen] = useState<boolean>(false);

    const navbarCssClasses: string = navCssClasses || "";
    const containerCssClasses: string = !hideLogo ? "container-fluid" : "";

    const { layoutType, leftSideBarType } = useSelector((state: RootState) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
    }));

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen(!isopen);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    // const handleRightSideBar = () => {
    //     dispatch(showRightSidebar());
    // };

    /**
     * Toggles the left sidebar width
     */
    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === "default" || leftSideBarType === "compact")
        dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
        if (leftSideBarType === "condensed")
        dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    };

    const[logo, setLogo] = useState()
    useEffect(()=>{
        ProjectDetails()
            .then(data => {
                const Logo = data.website_logo
                setLogo(Logo)
            })
            .catch(error => {
                console.error(error);
            });
    },[])

    const[userDetails,setUserDetails] = useState<userDetailType | null>(null);

    
    
    useEffect(()=>{
        UserDetails()
            .then(data=>{
                if(data){
                    setUserDetails(data)
                }
            })
            .catch(error=>{
                console.log(error);
            })
    },[])

    
    

    return (
        <React.Fragment>
        <div className={`navbar-custom ${navbarCssClasses}`}>
            <div className={containerCssClasses}>
            {!hideLogo && (
                <div className="logo-box">
                <Link to="/dashboard-1" className="logo logo-dark text-center">
                    <span className="logo-sm">
                    <img src={mylogo} alt=""   className="w-100 " />
                    </span>
                    <span className="logo-lg">
                    <img
                        src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                            ? mylogo
                            : mylogo
                        }
                        alt=""
                        // height="20"
                        className="w-100 h-100"
                    />
                    </span>
                </Link>
                <Link to="/dashboard-1" className="logo logo-light text-center">
                    <span className="logo-sm">
                    <img src={mylogo} alt=""  className="w-100 h-100" />
                    </span>
                    <span className="logo-lg">
                    <img
                        src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                            ? mylogo
                            : mylogo
                        }
                        alt=""
                        // height="20"
                        className="w-100 h-100"
                    />
                    </span>
                </Link>
                </div>
            )}

            <ul className="list-unstyled topnav-menu float-end mb-0">
                <li className="dropdown  d-lg-inline-block">
                </li>
                <li className="dropdown notification-list topbar-dropdown">
                <ProfileDropdown
                    profilePic={userDetails && userDetails.image}
                    menuItems={ProfileMenus}
                    username={userDetails && userDetails.name}
                    userTitle={"Founder"}
                />
                </li>
            </ul>

            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                {layoutType !== LayoutTypes.LAYOUT_HORIZONTAL && (
                <li>
                    <button
                    className="button-menu-mobile waves-effect waves-light d-none d-lg-block"
                    onClick={toggleLeftSidebarWidth}
                    >
                    <i className="fe-menu"></i>
                    </button>
                </li>
                )}

                <li>
                <button
                    className="button-menu-mobile open-left d-lg-none d-bolck waves-effect waves-light"
                    onClick={handleLeftMenuCallBack}
                >
                    <i className="fe-menu" />
                </button>
                </li>

                {/* Mobile menu toggle (Horizontal Layout) */}
                <li>
                <Link
                    to="#"
                    className={classNames("navbar-toggle nav-link", {
                    open: isopen,
                    })}
                    onClick={handleLeftMenuCallBack}
                >
                    <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </Link>
                </li>

                <li className="dropdown">
                {/* <CreateNew otherOptions={otherOptions} /> */}
                  <Navbar/>
                </li>
{/* 
                <li className="dropdown dropdown-mega">
                <MegaMenu subMenus={MegaMenuOptions} />
                </li> */}
            </ul>

            </div>
        </div>
        </React.Fragment>
    );
};


export default Topbar;
