import React from 'react';
import avatarDefault from '../../../assets/default.png'
import {CustomSpinner} from "../../Components/Spinner/CustomSpinner";
import {Tooltip} from "../../Components/CustomTooltip/Tooltip";
import {ProfileLeft} from "./ProfileLeft";
import {ProfileRight} from "./ProfileRight";

export const Profile = ({profileSelector}) => {
    const {profile, isFetching} = profileSelector

    return (
        <div className="container-sm p-5">
            {
                isFetching === true && profile !== {}
                    ? <div className="d-flex justify-content-center mt-5 p-4">
                        <CustomSpinner text={'primary'}/>
                    </div>
                    : <div className="d-flex justify-content-center flex-wrap">
                        <ProfileLeft
                            profile={profile}
                        />
                        <ProfileRight />
                    </div>
            }
        </div>
    )
}
