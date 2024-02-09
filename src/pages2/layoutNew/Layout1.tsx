import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// store
import { RootState, AppDispatch } from '../../redux/store';

// constants
import { LayoutTypes } from '../../constants/layout';

// utils
import { changeBodyAttribute } from '../../utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('../header1/Header'));
const Navbar = React.lazy(() => import('../navbar1/Navbar1'));
const Footer = React.lazy(() => import('../footer1/Footernew'));
const Dashboard = React.lazy(() => import('../dashboardNew/dashboard11'));

const loading = () => <div className="text-center"></div>;

interface HorizontalLayoutProps {
    children?: any;
}

const Layout1 = ({ children }: HorizontalLayoutProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    const { layoutColor, layoutWidth, menuPosition, topbarTheme, isOpenRightSideBar } = useSelector(
        (state: RootState) => ({
            layoutColor: state.Layout.layoutColor,
            layoutWidth: state.Layout.layoutWidth,
            menuPosition: state.Layout.menuPosition,
            topbarTheme: state.Layout.topbarTheme,
            isOpenRightSideBar: state.Layout.isOpenRightSideBar,
        })
    );

    /*
    layout defaults
    */
    useEffect(() => {
        changeBodyAttribute('data-layout-mode', LayoutTypes.LAYOUT_HORIZONTAL);
    }, [dispatch]);

    useEffect(() => {
        changeBodyAttribute('data-layout-color', layoutColor);
    }, [layoutColor]);

    useEffect(() => {
        changeBodyAttribute('data-layout-width', layoutWidth);
    }, [layoutWidth]);

    useEffect(() => {
        changeBodyAttribute('data-menu-position', menuPosition);
    }, [menuPosition]);

    useEffect(() => {
        changeBodyAttribute('data-topbar-color', topbarTheme);
    }, [topbarTheme]);

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened(!isMenuOpened);
        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.remove('sidebar-enable');
            } else {
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    return (
        <>
            <div id="wrapper">
                <Suspense fallback={loading()}>
                    <Topbar openLeftMenuCallBack={openMenu} topbarDark={false} />
                </Suspense>
                <Suspense fallback={loading()}>
                    <Navbar/>
                </Suspense>
                <div className="content-page">
                    <div className="content">
                        <Suspense fallback={loading()}  >
                            <Dashboard/>
                        </Suspense>
                    </div>
                    <Suspense fallback={loading()}>
                            <Footer />
                    </Suspense>
                </div>



            </div>
        </>
    );
};

export default Layout1;
