import React, {useEffect, useState} from 'react';
import {Profile} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {ViewProfileAction} from "../../redux/actions/AuthActions";
import {useForm} from "../../hooks/useForm";
import {UpdateProfileAction} from "../../redux/actions/ProfileAction";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";
import {useHistory} from "react-router-dom";
import {echo} from "../../echo";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const token = localStorage.getItem('user-token')
    const [hide, setHide] = useState(null)

    const profileSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        isFetching: state.auth.isFetching,
        profile: state.auth.profile,
        errorResponse: state.auth.errorResponse,
        successResponse: state.auth.successResponse,
    })))

    const {fields, handleChange, handleUpload, setFields} = useForm({
        name: '',
        email: '',
        avatar: ''
    })

    useEffect(() => {
        setFields(profileSelector.profile)
    }, [profileSelector.profile])

    useEffect(() => {
        echo.channel('user-status')
            .listen('LoggedInEvent', (data) => {
            console.log(data)
            console.log('Echo channel')
        })
    }, [])

    const updateProfile = (e) => {
        let formData = new FormData()
        formData.append('name', fields.name)
        formData.append('email', fields.email)
        formData.append('avatar', fields.avatar)
        dispatch(UpdateProfileAction(formData, setHide, token, history))
        setTimeout(() => {
            setHide(false)
        }, 3000)
    }

    useEffect(() => {
        if (token) {
            dispatch(ViewProfileAction(token))
        }
    }, [dispatch, token])

    return (
        <Profile
            profileSelector={profileSelector}
            handleChange={handleChange}
            handleUpload={handleUpload}
            updateProfile={updateProfile}
            fields={fields}
            hide={hide}
        />
    )
}
