import PropTypes from 'prop-types'
import {propTypesValidation} from "../propTypesValidation";

const propTypes = {
    loading: PropTypes.bool,
    isFetching: PropTypes.bool,
    profile: PropTypes.object,
    successResponse: PropTypes.object,
    errorResponse: PropTypes.object,
}

export const authPropsValidation = propTypesValidation(propTypes)
