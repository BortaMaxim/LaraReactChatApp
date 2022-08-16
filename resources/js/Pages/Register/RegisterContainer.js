import React, {useState} from 'react';
import {AuthForm} from "../../Components/Auth/AuthForm";
import {useForm} from "../../hooks/useForm";
import {useSelector} from "react-redux";
import {RegisterAction} from "../../redux/actions/AuthActions";
import {useHistory} from "react-router-dom";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";

export const RegisterContainer = () => {
    const history = useHistory()
    const [hide, setHide] = useState(null)

    const authSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        successResponse: state.auth.successResponse,
        errorResponse: state.auth.errorResponse,
    })))

    const {fields, handleChange, handleSubmit} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const registration = (e) => {
        handleSubmit(e, RegisterAction, fields, setHide, history)
        setTimeout(() => {
            setHide(true)
        }, 3000)
    }
    return (
        <AuthForm
            title='Registration'
            fields={fields}
            hide={hide}
            submit={registration}
            handleChange={handleChange}
            authSelector={authSelector}
        />
    )
};

