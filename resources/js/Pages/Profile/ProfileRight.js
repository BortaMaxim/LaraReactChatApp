import React from 'react';

export const ProfileRight = (props) => {
    return (
        <div className="w-60 ">
            <h4 className="mt-5">update profile</h4>
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="mb-3">
                    <label htmlFor="update_name" className="form-label">name</label>
                    <input className="form-control" type="text" id="update-name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="update_email" className="form-label">email</label>
                    <input className="form-control" type="email" id="update-email" name="email"/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-outline-primary">
                        submit
                    </button>
                </div>
            </div>
        </div>
    )
}
