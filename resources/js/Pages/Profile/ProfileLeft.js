import React from 'react';
import {Tooltip} from "../../Components/CustomTooltip/Tooltip";
import avatarDefault from "../../../assets/default.png";

export const ProfileLeft = (props) => {
    const {profile, handleUpload, successResponse, fields, isUpload} = props
    console.log(profile.avatar)
    return (
        <div className="col">
            <h4 className="mt-5">Profile</h4>
            <div className="card shadow-lg p-3 mb-5 bg-body rounded position-relative w-100">
                <Tooltip text="upload avatar">
                    <label
                        htmlFor="upload_avatar"
                        style={{cursor: 'pointer'}}
                    >
                        {
                            isUpload === true
                                ? <img style={{width: '100%'}}
                                       src={profile.avatar === null ? avatarDefault : profile.avatar}
                                       className="card-img-top" alt={profile.name}
                                />
                                : <img style={{width: '100%'}}
                                       className="card-img-top"
                                       src={fields.avatar}
                                       alt={fields.avatar}
                                />
                        }
                    </label>
                    <input
                        accept="image/*"
                        name="avatar"
                        type="file"
                        hidden={true}
                        onChange={handleUpload}
                        id="upload_avatar"
                    />
                </Tooltip>
                <div className="card-body">
                    <h5 className="card-title">
                        {
                            successResponse.success === true
                                ? <>{successResponse.data.name}</>
                                : <>{profile.name}</>
                        }
                    </h5>
                    <p className="card-text">
                        {
                            successResponse.success === true
                                ? <>{successResponse.data.email}</>
                                : <>{profile.email}</>
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
