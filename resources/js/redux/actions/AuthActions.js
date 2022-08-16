import axios from 'axios'
import * as AuthActionTypes from '../types/AuthActionTypes'
import {BASE_URL, getWithTokenOptions, postOption} from '../options'

export const RegisterAction = (formData, setHide, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_URL}/register`, formData, postOption()).then(res => {
        dispatch({type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data})
        setHide(false)
        setTimeout(() => {
            history.push('/login')
        }, 5000)
    }).catch(error => {
        dispatch({type: AuthActionTypes.REGISTER_ERROR, error})
        setHide(false)
    })
}

export const LoginAction = (formData, setHide, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_URL}/login`, formData, postOption()).then(res => {
        if (res.data.hasOwnProperty('success') && res.data.success === true) {
            dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data})
            localStorage.setItem('email-verified', res.data.data.email_verified_at)
            localStorage.setItem('user-token', res.data.token)
            setHide(false)
            history.push('/user/profile')
        } else {
            dispatch({type: AuthActionTypes.EMAIL_VERIFICATION_ERROR, payload: res.data})
            setHide(false)
        }
    }).catch(error => {
        dispatch({type: AuthActionTypes.LOGIN_ERROR, payload: error.response})
        setHide(false)
    })
}

export const ViewProfileAction = (token) => async (dispatch) => {
    dispatch({type: AuthActionTypes.IS_PROFILE_FETCHING})
    await axios.get(`${BASE_URL}/profile`, getWithTokenOptions(token)).then(res => {
        dispatch({type: AuthActionTypes.FETCH_PROFILE_SUCCESS, payload: res.data.data})
    }).catch(error => {
        dispatch({type: AuthActionTypes.FETCH_PROFILE_ERROR, error})
    })
}

export const LogoutAction = (token) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.get(`${BASE_URL}/logout`, getWithTokenOptions(token)).then(res => {
        dispatch({type: AuthActionTypes.LOGOUT_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: AuthActionTypes.LOGOUT_ERROR, error})
    })
}

export const ForgotPasswordAction = (formData, setHide) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_URL}/password/forgot-password`, formData, postOption()).then(res => {
        dispatch({type: AuthActionTypes.PASSWORD_VERIFIED_SUCCESS, payload: res.data})
        setHide(true)
    }).catch(error => {
        dispatch({type: AuthActionTypes.PASSWORD_VERIFIED_ERROR, payload: error.response})
        setHide(true)
    })
}

export const GetPasswordResetToken = () => async (dispatch) => {
    await axios.get(`${BASE_URL}/password-reset-token`).then(res => {
        dispatch({type: AuthActionTypes.GET_PASSWORD_RESET_TOKEN, payload: res})
        localStorage.setItem('reset-token', res.data)
    })
}

export const ResetPasswordAction = (formData, setHide) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_URL}/password/reset`, formData, postOption()).then(res => {
        dispatch({type: AuthActionTypes.RESET_PASSWORD_SUCCESS, payload: res})
        setHide(true)

    }).catch(error => {
        dispatch({type: AuthActionTypes.RESET_PASSWORD_ERROR, payload: error.response})
        setHide(true)
    })
}
