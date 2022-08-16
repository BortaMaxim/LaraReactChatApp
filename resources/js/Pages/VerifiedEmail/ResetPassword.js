import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GetPasswordResetToken, ResetPasswordAction} from "../../redux/actions/AuthActions";
import {CustomSpinner} from "../../Components/Spinner/CustomSpinner";
import {useForm} from "../../hooks/useForm";
import {Link} from "react-router-dom";
import {ResetPasswordValidator} from "../../Components/Validations/ResetPasswordValidator";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const [hide, setHide] = useState(null)
    const resetToken = localStorage.getItem('reset-token')

    useEffect(() => {
        dispatch(GetPasswordResetToken())
    }, [dispatch])

    const {fields, handleSubmit, handleChange} = useForm({
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        localStorage.getItem(resetToken)
        return () => localStorage.clear()
    }, [])
    fields.token = resetToken

    const resetPasswordSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        successResponse: state.auth.successResponse,
        errorResponse: state.auth.errorResponse,
    })))

    const resetPassword = (e) => {
        handleSubmit(e, ResetPasswordAction, fields, setHide)
        setTimeout(() => {
            setHide(false)
        }, 3000)
    }

    return (
        <div className="container-sm mt-5 p-5">
            <h1>Reset password!</h1>
            <div className="card p-2" style={{width: '30rem'}}>
                {
                    hide === true
                        ? <ResetPasswordValidator
                            errorResponse={resetPasswordSelector.errorResponse}
                            successResponse={resetPasswordSelector.successResponse}
                        />
                        : null
                }
                <form onSubmit={resetPassword}>
                    <input
                        name="token"
                        type="hidden"
                        value={fields.token || ''}
                    />
                    <div className="mb-3">
                        <label htmlFor="resetEmailPassword" className="form-label">Email</label>
                        <input
                            id="resetEmailPassword"
                            type="email"
                            name="email"
                            className="form-control"
                            value={fields.email}
                            onChange={handleChange}
                        />
                        <div className="form-text">write your email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resetPassword" className="form-label">Password</label>
                        <input
                            id="resetPassword"
                            type="password"
                            name="password"
                            className="form-control"
                            value={fields.password}
                            onChange={handleChange}
                        />
                        <div className="form-text">write your password</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resetPasswordConfirm" className="form-label">Password confirm</label>
                        <input
                            id="resetPasswordConfirm"
                            type="password"
                            name="password_confirmation"
                            className="form-control"
                            value={fields.password_confirmation}
                            onChange={handleChange}
                        />
                        <div className="form-text">confirm your password</div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        {
                            resetPasswordSelector.loading === true
                                ? <CustomSpinner text="success"/>
                                : <button className="btn btn-outline-success" type="submit">
                                    Submit
                                </button>
                        }
                        <Link to="/login">
                            Go to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
