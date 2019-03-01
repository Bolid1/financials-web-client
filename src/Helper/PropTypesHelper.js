export default class PropTypesHelper {
  static getPropType (type) {
    if (type === 'function') {
      return 'func'
    }
    if (type === 'boolean') {
      return 'bool'
    }
    if (type === 'undefined') {
      return 'any'
    }

    return type
  }

  static propsConvert (props) {
    const printed = Object.keys(props).map(
      key => `  ${key}: PropTypes.${PropTypesHelper.getPropType(typeof props[key])},`
    )
    console.info(`.propTypes = {\n${printed.join('\n')}\n}\n`)
  }
}
