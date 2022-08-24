import React, {useEffect, useState} from 'react';
import {Profile} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {ViewProfileAction} from "../../redux/actions/AuthActions";
import {useForm} from "../../hooks/useForm";
import {UpdateProfileAction} from "../../redux/actions/ProfileAction";
import {authPropsValidation} from "../../propTypes/Auth/authPropsValidation";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('user-token')
    const [hide, setHide] = useState(null)

    const profileSelector = authPropsValidation(useSelector(state => ({
        loading: state.auth.loading,
        isFetching: state.auth.isFetching,
        profile: state.auth.profile,
        errorResponse: state.auth.errorResponse,
        successResponse: state.auth.successResponse,
    })))

    console.log(profileSelector)
    const {fields, handleChange, handleUpload, setFields, isUpload} = useForm({
        name: '',
        email: '',
        avatar: ''
    })

    // console.log(fields.avatar)

    useEffect(() => {
        setFields(profileSelector.profile)
    }, [profileSelector.profile])

    const updateProfile = (e) => {
        let formData = new FormData()
        formData.append('name', fields.name)
        formData.append('email', fields.email)
        formData.append('avatar', fields.avatar)
        dispatch(UpdateProfileAction(formData, setHide, token))
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
            isUpload={isUpload}
            hide={hide}
        />
    )
}
