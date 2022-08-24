import React from 'react';
import {AuthValidation} from "../../Components/Validations/AuthValidation";
import {CustomSpinner} from "../../Components/Spinner/CustomSpinner";

export const ProfileRight = (props) => {
    const {handleChange, updateProfile, fields, hide, profileSelector} = props
    const {loading, errorResponse, successResponse} = profileSelector
    return (
        <div className="col">
            <h4 className="mt-5">update profile</h4>
            {
                hide === true
                    ? <AuthValidation errorResponse={errorResponse} successResponse={successResponse}/>
                    : null
            }
            <div className="card shadow-lg p-3 mb-5 bg-body rounded w-100">
                <div className="mb-3">
                    <label htmlFor="update_name" className="form-label">name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="update-name"
                        name="name"
                        value={fields.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="update_email" className="form-label">email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="update-email"
                        name="email"
                        value={fields.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    {
                        loading === true
                            ? <CustomSpinner text="primary"/>
                            : <button className="btn btn-outline-primary" onClick={updateProfile}>
                                submit
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
