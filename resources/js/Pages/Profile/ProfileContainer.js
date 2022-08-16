import React, {useEffect, useState} from 'react';
import {Profile} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {ViewProfileAction} from "../../redux/actions/AuthActions";
import {echo} from "../../echo";
import {useForm} from "../../hooks/useForm";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('user-token')
    const profileSelector = useSelector(state => ({
        isFetching: state.auth.isFetching,
        profile: state.auth.profile,
    }))

    const {fields, handleChange, handleUpload, handleSubmit} = useForm({
        name: '',
        email: '',
        avatar: '',
    })

    useEffect(() => {
        if (token) {
            dispatch(ViewProfileAction(token))
        }
    }, [dispatch, token])

    return (
        <Profile
            profileSelector={profileSelector}
        />
    )
}
