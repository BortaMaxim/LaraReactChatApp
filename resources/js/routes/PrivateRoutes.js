import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {ProfileContainer} from "../Pages/Profile/ProfileContainer";
import {ChatContainer} from "../Pages/Chat/ChatContainer";

export const PrivateRoutes = (props) => {

    return (
        <Switch>
            <Route exact path={`${props.match.path}/profile`}>
                <ProfileContainer />
            </Route>
            <Route exact path={`${props.match.path}/chat`}>
                <ChatContainer />
            </Route>
            <Route exact path={props.match.path} render={props => (
                <Redirect to={{pathname: `${props.match.path}/profile`}}/>
            )}/>
        </Switch>
    )
}
