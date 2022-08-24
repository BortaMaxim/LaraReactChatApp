import * as ProfileActionTypes from '../types/ProfileActionTypes'

const initialState = {
    loading: false,
    updated: {},
    error: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProfileActionTypes.UPDATING:
            return {
                ...state,
                loading: true
            }
        case ProfileActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                updated: action.payload
            }
        case ProfileActionTypes.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
