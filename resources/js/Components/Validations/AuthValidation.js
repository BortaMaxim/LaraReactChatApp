import React from 'react';
import PropTypes from "prop-types";

export const AuthValidation = ({errorResponse, successResponse}) => {

    return (
        <div>
            {
                errorResponse.status === 422
                    ? <div className="alert alert-danger" role="alert">
                        {
                            errorResponse.data.message
                        }
                    </div>
                    : null
            }
            {
                successResponse.success === true
                    ? <div className="alert alert-success" role="alert">
                        {
                            successResponse.message
                        }
                    </div>
                    : <div className="alert alert-danger" role="alert">
                        {
                            successResponse.message
                        }
                    </div>
            }
        </div>
    )
}

AuthValidation.propTypes = {
    errorResponse: PropTypes.object,
    successResponse: PropTypes.object,
}
