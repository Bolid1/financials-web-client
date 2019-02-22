export default class DateTimeHelper {
  /**
   * @param {Date} date
   * @param {boolean} throwOnInvalid
   */
  static toSQL (date, throwOnInvalid = false) {
    if (!(date instanceof Date)) {
      if (throwOnInvalid) {
        throw new Error(`Invalid argument type ${typeof date}, expected Date`)
      }

      return ''
    }

    const YYYY = date.getFullYear()
    const MM = ('0' + (date.getMonth() + 1)).slice(-2)
    const DD = ('0' + date.getDate()).slice(-2)

    return `${YYYY}-${MM}-${DD}`
  }

  static fromSQL (date) {
    return new Date(date)
  }
}
