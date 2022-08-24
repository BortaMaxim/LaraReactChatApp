import * as AuthActionTypes from '../types/AuthActionTypes'
import * as ProfileActionTypes from "../types/ProfileActionTypes";

const initialState = {
    loading: false,
    isFetching: false,
    profile: {},
    successResponse: {},
    errorResponse: {},
    resetToken: {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.IS_PROFILE_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.error.response
            }
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.EMAIL_VERIFICATION_ERROR:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                profile: action.payload
            }
        case AuthActionTypes.FETCH_PROFILE_ERROR:
            return {
                ...state,
                isFetching: false,
                profile: action.error
            }
        case AuthActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                successResponse: action.error
            }
        case AuthActionTypes.PASSWORD_VERIFIED_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.PASSWORD_VERIFIED_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.GET_PASSWORD_RESET_TOKEN:
            return {
                ...state,
                resetToken: action.payload
            }
        case AuthActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.RESET_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case ProfileActionTypes.UPDATING:
            return {
                ...state,
                loading: true
            }
        case ProfileActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case ProfileActionTypes.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        default:
            return state
    }
}
