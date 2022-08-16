import React from 'react';
import PropTypes from 'prop-types'
import {AuthValidation} from "../Validations/AuthValidation";
import {CustomSpinner} from "../Spinner/CustomSpinner";
import {Link} from "react-router-dom";

export const AuthForm = (props) => {
    const {fields, handleChange, authSelector, submit, title, hide} = props
    const {loading, successResponse, errorResponse, verificationError} = authSelector

    return (
        <div className="container-sm d-flex justify-content-center">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded" style={{width: '30rem'}}>
                <form className="mt-5" onSubmit={submit}>
                    <h3>{title}</h3>
                    {
                        hide === false
                            ? <AuthValidation
                                errorResponse={errorResponse}
                                successResponse={successResponse}
                            />
                            : null
                    }
                    {
                        title === 'Registration'
                            ? <div className="mb-3">
                                <label htmlFor="exampleInputName1" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="exampleInputName1"
                                    aria-describedby="nameHelp"
                                    value={fields.name}
                                    onChange={handleChange}
                                />
                                <div id="nameHelp" className="form-text">write your name</div>
                            </div>
                            : null
                    }
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={fields.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">write your email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            aria-describedby="passwordHelp"
                            value={fields.password}
                            onChange={handleChange}
                        />
                        <div id="passwordHelp" className="form-text">write your password</div>
                    </div>
                    {
                        title === 'Registration'
                            ? <div className="mb-3">
                                <label htmlFor="exampleInputPasswordConfirmed1" className="form-label">Password
                                    confirm
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="form-control"
                                    id="exampleInputPasswordConfirmed1"
                                    aria-describedby="passwordConfirmHelp"
                                    value={fields.password_confirmation}
                                    onChange={handleChange}
                                />
                                <div id="passwordConfirmHelp" className="form-text">confirm password</div>
                            </div>
                            : null
                    }
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            loading === true
                                ? <CustomSpinner text="primary"/>
                                : <button type="submit" className="btn btn-outline-primary">
                                    Submit
                                </button>
                        }
                        {
                            title === 'Login'
                            && <Link to="/forgot-password">
                                Forgot password
                            </Link>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
};

AuthForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    authSelector: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.any,
}

