export default class DateTimeHelper {
  /**
   * @param {Date} date
   */
  static toSQL (date) {
    if (!(date instanceof Date)) {
      throw new Error(`Invalid argument type ${typeof date}, expected Date`)
    }

    const YYYY = date.getFullYear()
    const MM = ('0' + (date.getMonth() + 1)).slice(-2)
    const DD = ('0' + date.getDate()).slice(-2)

    return `${YYYY}-${MM}-${DD}`
  }
}
