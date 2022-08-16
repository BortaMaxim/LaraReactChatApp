import React from 'react';
import ReactDOM from 'react-dom';
import {PublicRoutes} from "./routes/PublicRoutes";
import {BrowserRouter} from 'react-router-dom'
import {NavBar} from "./Components/Nav/NavBar";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function RootApp() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <PublicRoutes />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default RootApp;

if (document.getElementById('root')) {
    ReactDOM.render(<RootApp />, document.getElementById('root'));
}
