/**
 * @interface Map
 * @memberOf observable
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
}