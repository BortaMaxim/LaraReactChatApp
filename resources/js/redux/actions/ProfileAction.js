import axios from 'axios'
import * as ProfileActionTypes from '../types/ProfileActionTypes'
import {BASE_URL, uploadWithTokenOptions} from '../options'

export const UpdateProfileAction = (formData, setHide, token) => async (dispatch) => {
        dispatch({type: ProfileActionTypes.UPDATING})
    await axios.post(`${BASE_URL}/update-profile`, formData, uploadWithTokenOptions(token)).then(res => {
        dispatch({type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS, payload: res.data})
        setHide(true)
    }).catch(error => {
        dispatch({type: ProfileActionTypes.UPDATE_PROFILE_ERROR, payload: error.response})
        setHide(true)
    })
}
