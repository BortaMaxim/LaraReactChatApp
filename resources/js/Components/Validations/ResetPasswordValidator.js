import React from 'react';
import PropTypes from "prop-types";

export const ResetPasswordValidator = ({successResponse, errorResponse}) => (
    <div>
        {
            errorResponse.status === 422
                && <div className="alert alert-danger" role="alert">
                    {
                        errorResponse.data.message
                    }
                </div>
        }
        {
            successResponse.status === 200
            && <div className="alert alert-success" role="alert">
                {
                    successResponse.data.message
                }
            </div>
        }
    </div>
);

ResetPasswordValidator.propTypes = {
    successResponse: PropTypes.object,
    errorResponse: PropTypes.object,
}
