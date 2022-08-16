import React from 'react';
import PropTypes from "prop-types";

export const ForgotPasswordValidator = ({successResponse}) => (
    <div>
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
);

ForgotPasswordValidator.propTypes = {
    successResponse: PropTypes.object
}
