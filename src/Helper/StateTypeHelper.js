export default class StateTypeHelper {
  static isIdentifier (property) {
    return /^(identifier|identifierNumber)$/.test(property.name)
  }
}
