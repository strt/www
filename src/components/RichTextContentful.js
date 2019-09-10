/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {}

const RichText = ({ document }) => {
  return documentToReactComponents(document, options)
}

RichText.propTypes = {
  document: PropTypes.object,
}

export default RichText
