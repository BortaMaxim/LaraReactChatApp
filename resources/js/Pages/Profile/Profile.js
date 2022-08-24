import React from 'react';
import {CustomSpinner} from "../../Components/Spinner/CustomSpinner";
import {ProfileLeft} from "./ProfileLeft";
import {ProfileRight} from "./ProfileRight";

export const Profile = React.memo((props) => {
    const {profileSelector, handleChange, handleUpload, updateProfile, fields, hide, isUpload} = props
    const {profile, isFetching, successResponse} = profileSelector

    return (
        <div className="container-sm p-5 text-center">
            {
                isFetching === true && profile !== {}
                    ? <div className="d-flex justify-content-center mt-5 p-4">
                        <CustomSpinner text={'primary'}/>
                    </div>
                    : <div className="row">
                        <ProfileLeft
                            profile={profile}
                            fields={fields}
                            isUpload={isUpload}
                            successResponse={successResponse}
                            handleUpload={handleUpload}
                        />
                        <ProfileRight
                            handleChange={handleChange}
                            profileSelector={profileSelector}
                            fields={fields}
                            hide={hide}
                            updateProfile={updateProfile}
                        />
                    </div>
            }
        </div>
    )
}, (prevProps, currentProps) => {
    if (currentProps.profileSelector.isFetching === false) {
        return false
    }else {
        return true
    }
})
