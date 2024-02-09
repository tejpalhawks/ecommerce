import React from 'react';
import { BrowserRouter, Switch , Route, Link } from 'react-router-dom';
import Login from '../pages2/authnew/LoginNew';
import Dashboard from '../pages2/dashboardNew/dashboard11';
import Layout from '../pages2/layoutNew/Layout1';
import Register2 from '../pages2/authnew/RegisterNew';
import UserProfile from '../pages2/UserProfile';
import ResetPassword from '../pages2/ResetPassword';

const Index = () => {
    return (
        <div className="w-screen h-screen ComfontFamily container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login1"><Login /></Route>
                    <Route exact path="/register1"><Register2 /></Route>
                    <Route exact path="/Dashboard1"><Dashboard /></Route>
                    <Route exact path="/mainDashboard"><Layout /></Route>
                    <Route exact path="/test"><div>hello</div></Route>
                    <Route exact path="/userprofile"> <UserProfile/> </Route>
                    <Route exact path="/resetPassword"> <ResetPassword/> </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Index;
