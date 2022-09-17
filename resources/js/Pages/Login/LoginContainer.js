import React, {useState, useEffect} from 'react';
import {AuthForm} from "../../Components/Auth/AuthForm";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {LoginAction} from "../../redux/actions/AuthActions";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";
import {echo} from '../../echo'

export const LoginContainer = () => {
    const history = useHistory()
    const [hide, setHide] = useState(null)
    const authSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        successResponse: state.auth.successResponse,
        errorResponse: state.auth.errorResponse,
    })))

    const {fields, handleChange, handleSubmit} = useForm({
        email: '',
        password: '',
    })
    const login = (e) => {
        handleSubmit(e,LoginAction,  fields, setHide, history)
        setTimeout(() => {
            setHide(true)
        }, 3000)
    }

    return (
        <AuthForm
            title='Login'
            fields={fields}
            hide={hide}
            submit={login}
            handleChange={handleChange}
            authSelector={authSelector}
        />
    )
};

