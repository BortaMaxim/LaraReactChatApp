import React, {useState, useEffect} from 'react';
import {NavLinks} from "./NavLinks";
import {ToolBar} from "./ToolBar";
import {useDispatch, useSelector} from "react-redux";
import {LogoutAction, ViewProfileAction} from "../../redux/actions/AuthActions";
import {useHistory} from "react-router-dom";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";

export const NavBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const profileSelector = authPropsValidation(useSelector(state => ({
        isFetching: state.auth.isFetching,
        profile: state.auth.profile,
        successResponse: state.auth.successResponse,
    })))

    const verifiedToken = localStorage.getItem('email-verified')
    const token = localStorage.getItem('user-token')
    const [id, setID] = useState('');
    const handleActive = (id) => {
        setID(id);
    }

    useEffect(() => {
        if (verifiedToken !== null && token !== null) {
            dispatch(ViewProfileAction(token))
        }
    }, [verifiedToken, token, dispatch])

    const logout = () => {
        dispatch(LogoutAction(token))
        localStorage.clear()
        history.push('/login')
    }
    return (
        <nav className="navbar bg-secondary fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler btn-close-white" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLinks
                    handleActive={handleActive}
                    profileSelector={profileSelector}
                    id={id}
                    verifiedToken={verifiedToken}
                />
                <ToolBar
                    handleActive={handleActive}
                    id={id}
                    verifiedToken={verifiedToken}
                    logout={logout}
                />
            </div>
        </nav>
    )
}
