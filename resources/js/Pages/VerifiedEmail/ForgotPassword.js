import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ForgotPasswordAction} from "../../redux/actions/AuthActions";
import {CustomSpinner} from "../../Components/Spinner/CustomSpinner";
import {ForgotPasswordValidator} from "../../Components/Validations/ForgotPasswordValidator";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";

export const ForgotPassword = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const forgotPasswordSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        successResponse: state.auth.successResponse,
        errorResponse: state.auth.errorResponse,
    })))

    const [field, setField] = useState({
        email: ''
    })
    const [hide, setHide] = useState(null)

    const handleChange = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(ForgotPasswordAction(field, setHide))
        setTimeout(() => {
            setHide(false)
        }, 3000)
    }
    return (
        <div className="container-sm mt-5 p-5">
            <button className="btn btn-sm btn-outline-primary" onClick={() => history.goBack()}>
                back
            </button>
            <div className="card shadow-lg p-3 mb-5 bg-body rounded mt-3" style={{width: '30rem'}}>
                <form className="mt-2" onSubmit={handleSubmit}>
                    {
                        hide === true
                            ? <>
                                {
                                    forgotPasswordSelector.errorResponse.status === 422
                                    && <div className="alert alert-danger" role="alert">
                                        {
                                            forgotPasswordSelector.errorResponse.data.message
                                        }
                                    </div>
                                }
                            </>
                            : null
                    }
                    {
                        hide === true
                            ? <ForgotPasswordValidator
                                successResponse={forgotPasswordSelector.successResponse}
                            />
                            : null
                    }
                    <div className="mb-3">
                        <label htmlFor="forgotPasswordEmail" className="form-label">Forgot password</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="forgotPasswordEmail"
                            aria-describedby="emailPasswordForgot"
                            value={field.email}
                            onChange={handleChange}
                        />
                        <div id="emailPasswordForgot" className="form-text">write your email</div>
                    </div>
                    {
                        forgotPasswordSelector.loading === true
                            ? <CustomSpinner text="success"/>
                            : <button className="btn btn-sm btn-outline-success" type="submit">
                                Confirm
                            </button>
                    }
                </form>
            </div>
        </div>
    )
};
