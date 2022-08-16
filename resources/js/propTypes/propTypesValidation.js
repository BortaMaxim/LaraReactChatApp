import PropTypes from 'prop-types'


export const propTypesValidation = (propTypes) => {
    return (props) => {
        PropTypes.checkPropTypes(propTypes, props, 'props', '')
        return props
    }
}
