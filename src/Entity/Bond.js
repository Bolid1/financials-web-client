export default class Bond {
  /**
   * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который
   *   от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.
   * @member {Issuer}
   */
  issuer

  /**
   * @description Номинал - это сумма, которую получит держатель облигации в день
   *   выкупа облигации эмитентом {@see issuer}.
   * @member {Number}
   */
  faceValue

  /**
   * @description Купон - это сумма, которая выплачивается держателю акций каждые {@see couponFrequency} дней
   * @member {Number}
   */
  coupon

  /**
   * @description Частота, с которой выплачивается сумма купона {@see coupon}
   */
  couponFrequency

  /**
   * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see faceValue}
   * @member {Date}
   */
  maturity

  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по номиналу {@see faceValue}
   *   или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все предъявленные инвесторами
   *   облигации.
   * @member {Date}
   */
  offer

  /**
   * @description Освобождена ли облигация от уплаты НДФЛ
   * @member {Boolean}
   */
  taxFree

  /**
   * @description Текущая стоимость облигации
   * @member {Number}
   */
  price

  /**
   * @description Количество выпущенных облигаций
   * @member {Number}
   */
  quantity
}
