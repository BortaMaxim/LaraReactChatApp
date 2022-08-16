import React from 'react';
import {Tooltip} from "../../Components/CustomTooltip/Tooltip";
import avatarDefault from "../../../assets/default.png";

export const ProfileLeft = (props) => {
    const {profile} = props
    return (
        <div className="w-30">
            <h4 className="mt-5">Profile</h4>
            <div className="card shadow-lg p-3 mb-5 bg-body rounded position-relative">
                <Tooltip text="upload avatar">
                    <label
                        htmlFor="upload_avatar"
                        style={{cursor: 'pointer'}}
                    >
                        <img
                            src={profile.avatar === null ? avatarDefault: profile.avatar}
                            className="card-img-top" alt={profile.name}
                        />
                    </label>
                    <input
                        accept="image/*"
                        name="avatar"
                        type="file"
                        hidden={true}
                        id="upload_avatar"
                    />
                </Tooltip>
                <div className="card-body">
                    <h5 className="card-title">
                        {profile.name}
                    </h5>
                    <p className="card-text">
                        {profile.email}
                    </p>
                </div>
            </div>
        </div>
    )
}
