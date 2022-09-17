import React from 'react';
import {Route, Switch} from "react-router-dom";
import {RegisterContainer} from "../Pages/Register/RegisterContainer";
import {LoginContainer} from "../Pages/Login/LoginContainer";
import {ChatContainer} from "../Pages/Chat/ChatContainer";
import {NoMatch} from "../Components/NoMatch/NoMatch";
import {GuardRoutes} from "./GuardRoutes";
import {PrivateRoutes} from "./PrivateRoutes";
import {EmailVerifiedSuccess} from "../Pages/VerifiedEmail/EmailVerifiedSuccess";
import {ForgotPassword} from "../Pages/VerifiedEmail/ForgotPassword";
import {ResetPassword} from "../Pages/VerifiedEmail/ResetPassword";

export const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path="/reset-password">
                <ResetPassword />
            </Route>
            <Route exact path="/email-verified-success">
                <EmailVerifiedSuccess />
            </Route>
            <Route exact path="/forgot-password">
                <ForgotPassword />
            </Route>
            <Route exact path="/register">
                <RegisterContainer />
            </Route>
            <Route exact path="/login">
                <LoginContainer />
            </Route>
            <GuardRoutes
                path={'/user'}
                tokenVerified={'email-verified'}
                routeRedirect={'/login'}
                component={PrivateRoutes}
            />
            <Route exact path="*">
                <NoMatch />
            </Route>
        </Switch>
    )
};
