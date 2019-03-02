/**
 * @interface Map
 * @memberOf observable
 * @extends observableMap
 * @implements IMapType
 * @implements Map
 * @implements IterableIterator
 */

/**
 *
 */
export default class ObservableMapHelper {
  /**
   * @param {observable.Map} items
   * return {any[]}
   */
  static toArray (items) {
    return Array.from(items.values())
  }

  /**
   * @param {observable.Map} items
   * @param {function(value, index, array)} func
   * @return {any[]}
   */
  static map (items, func) {
    return ObservableMapHelper.toArray(items).map(func)
  }

  /**
   * @param {observable.Map} items
   * @return {any | null}
   */
  static first (items) {
    return ObservableMapHelper.toArray(items)[0] || null
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
