import React from 'react';
import {Link} from "react-router-dom";
import defaultAvatar from '../../../assets/default.png'
import {CustomSpinner} from "../Spinner/CustomSpinner";
import PropTypes from "prop-types";
import {URL} from "../../redux/options";

export const NavLinks = ({handleActive, id, verifiedToken, profileSelector}) => {
    const {isFetching, profile, successResponse} = profileSelector

    return (
        <>
            {
                verifiedToken !== null || successResponse.message === 'Login Successful'
                    ? <div className="d-flex justify-content-between align-items-center">
                        {
                            isFetching === true
                                ? <CustomSpinner text={'white'}/>
                                : <div className="d-flex justify-content-between align-items-center">
                                    {
                                        successResponse.success === true
                                        ? <span className="text-white">
                                                {successResponse.data.name}
                                        </span>
                                        :<span className="text-white">
                                            {profile.name}
                                        </span>
                                    }
                                    <img
                                        style={{width: '40px', heigth: '40px', marginLeft: '10px', borderRadius: '50%'}}
                                        src={profile.avatar === null ? defaultAvatar : `${URL}/avatars/${profile.avatar}`}
                                        alt={profile.name}
                                    />
                                </div>
                        }
                        <Link className="nav-link p-2" to="/user/profile" onClick={() => handleActive('profileLink1')}
                              style={{color: id === 'profileLink1' ? 'red' : 'white'}}
                        >
                            Profile
                        </Link>
                    </div>
                    : <div className="d-flex">
                        <Link className="nav-link p-2" to="/login" onClick={() => handleActive('link3')}
                              style={{color: id === 'link3' ? 'red' : 'white'}}>
                            Login
                        </Link>
                        <Link className="nav-link p-2" to="/register" onClick={() => handleActive('link2')}
                              style={{color: id === 'link2' ? 'red' : 'white'}}
                        >
                            Register
                        </Link>
                    </div>
            }
        </>
    )
}

NavLinks.propTypes = {
    handleActive: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    verifiedToken: PropTypes.any,
    profileSelector: PropTypes.object.isRequired,
}
