/**
 * @interface Map
 * @memberOf observable
 * @extends observableMap
 * @implements Map
 * @implements IterableIterator
 */

/**
 *
 */
export default class ObservableMapHelper {
  /**
   * @param {observable.Map} items
   * @param {function(value, index, array)} func
   * @return {any[]}
   */
  static map (items, func) {
    return Array.from(items.values()).map(func)
  }

  /**
   * @param {ObservableMap} entity
   * @param {object} [initialValue = {}]
   * @return {object}
   */
  static toForm (entity, initialValue = {}) {
    const result = entity.toJSON()

    return Object.keys(result)
      .reduce((prev, key) => {
        prev[key] = typeof result[key] === 'undefined' ? '' : result[key]

        return prev
      }, initialValue)
  }
}
