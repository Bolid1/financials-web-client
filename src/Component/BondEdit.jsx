import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import InputDate from '../Element/InputDate'
import InputNumber from '../Element/InputNumber'
import InputText from '../Element/InputText'
import Bond from '../Entity/Bond'

const messages = defineMessages(
  {
    issuerDescription: 'Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.',
    ISINDescription: 'Международный идентификационный код ценной бумаги',
    currencyDescription: 'Валюта, в которой происходят торги по данным облигациям',
    faceValueDescription: 'Номинал - это сумма, которую получит держатель облигации в день выкупа облигации эмитентом.',
    quantityDescription: 'Количество выпущенных облигаций',
    placementDateDescription: 'Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок',
    maturityDescription: 'Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала',
    earlyRepaymentAvailableDescription: 'Доступна ли возможность досрочного погашения',
    offerStartDescription: 'Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости',
    offerEndDescription: 'В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой стоимости или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все предъявленные инвесторами облигации.',
    redemptionDateDescription: 'В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой стоимости или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все предъявленные инвесторами облигации.',
    priceDescription: 'Текущая стоимость облигации',
  },
)

export default function BondEdit ({bond}) {
  return <form>
    <div>
      <FormattedMessage {...messages.issuerDescription}/>
      typeof 'Issuer'
      issuer
    </div>

    <div>
      <FormattedMessage {...messages.ISINDescription}/>
      typeof 'String'
      <InputText value={bond.ISIN} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.currencyDescription}/>
      typeof 'Currency'
      currency
    </div>

    <div>
      <FormattedMessage {...messages.faceValueDescription}/>
      faceValue
      <InputNumber/>
    </div>

    <div>
      <FormattedMessage {...messages.quantityDescription}/>
      quantity
      <InputNumber/>
    </div>

    <div>
      <FormattedMessage {...messages.placementDateDescription}/>
      placementDate
      <InputDate/>
    </div>

    <div>
      <FormattedMessage {...messages.maturityDescription}/>
      maturity
      <InputDate/>
    </div>

    <div>
      <FormattedMessage {...messages.earlyRepaymentAvailableDescription}/>
      typeof 'Boolean'
      earlyRepaymentAvailable
    </div>

    <div>
      <FormattedMessage {...messages.offerStartDescription}/>
      offerStart
      <InputDate/>
    </div>

    <div>
      <FormattedMessage {...messages.offerEndDescription}/>
      offerEnd
      <InputDate/>
    </div>

    <div>
      <FormattedMessage {...messages.redemptionDateDescription}/>
      redemptionDate
      <InputDate/>
    </div>

    <div>
      <FormattedMessage {...messages.priceDescription}/>
      price
      <InputNumber/>
    </div>
  </form>
}

BondEdit.propTypes = {
  bond: PropTypes.instanceOf(Bond).isRequired,
}
