import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// store
import { RootState, AppDispatch } from "../../redux/store";

import { showRightSidebar, changeSidebarType } from "../../redux/actions";
// components
// import TopbarSearch from '../components/TopbarSearch';
import MaximizeScreen from "../../components/MaximizeScreen";
import NotificationDropdown from "../../components/NotificationDropdown";
import ProfileDropdown from "../../components/ProfileDropdown";

import profilePic from "../../assets/images/users/user-1.jpg";
import avatar4 from "../../assets/images/users/user-4.jpg";
import logoSm from "../../assets/images/logo-sm.png";
import logosample from "../../assets/images/main-logo-sample.png";
import { LayoutTypes, SideBarTypes } from "../../constants/layout";



export interface NotificationItem {
    id: number;
    text: string;
    subText: string;
    icon?: string;
    avatar?: string;
    bgColor?: string;
}

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
        label: "My Account",
        icon: "fe-user",
        redirectTo: "/userProfile",
    },
    {
        label: "Lock Screen",
        icon: "fe-lock",
        redirectTo: "/auth/lock-screen",
    },
    {
        label: "Logout",
        icon: "fe-log-out",
        redirectTo: "/login1",
    },
];

// dummy search results


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
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === "default" || leftSideBarType === "compact")
        dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
        if (leftSideBarType === "condensed")
        dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    };

    return (
        <React.Fragment>
        <div className={`navbar-custom ${navbarCssClasses}`}>
            <div className={containerCssClasses}>
            {!hideLogo && (
                <div className="logo-box">
                <Link to="/" className="logo logo-dark text-center">
                    <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                    <img
                        src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                            ? logosample
                            : logosample
                        }
                        alt=""
                        // height="20"
                        className="w-100 h-100"
                    />
                    </span>
                </Link>
                <Link to="/" className="logo logo-light text-center">
                    <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                    <img
                        src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                            ? logosample
                            : logosample
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
                <li className="dropdown d-none d-lg-inline-block">
                <MaximizeScreen />
                </li>
                <li className="dropdown notification-list topbar-dropdown">
                <NotificationDropdown notifications={Notifications} />
                </li>
                <li className="dropdown notification-list topbar-dropdown">
                <ProfileDropdown
                    profilePic={profilePic}
                    menuItems={ProfileMenus}
                    username={"Geneva"}
                    userTitle={"Founder"}
                />
                </li>
            </ul>
            </div>
        </div>
        </React.Fragment>
    );
};



export default Topbar;
