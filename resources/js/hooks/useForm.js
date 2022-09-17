import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

export const useForm = (initialState = {}) => {
    const [fields, setFields] = useState(initialState)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }
    const handleUpload = (e) => {
        let files = e.target.files

        setFields({
            ...fields,
            [e.target.name]: files[0]
        })
    }

    const clear = () => {
        setFields(initialState)
    }

    const handleSubmit = (e, action, formData, setHide , history = null) => {
        e.preventDefault()
        dispatch(action(formData, setHide, history))
        clear()
    }

    return {fields, handleUpload, handleChange, clear, handleSubmit, setFields}
}
