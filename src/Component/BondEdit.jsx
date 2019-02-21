import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CheckBox from '../Element/CheckBox'
import FieldInfo from '../Element/FieldInfo'
import InputDate from '../Element/InputDate'
import InputNumber from '../Element/InputNumber'
import InputText from '../Element/InputText'
import Select from '../Element/Select'
import Bond from '../Entity/Bond'
import Currency from '../Entity/Currency'
import Issuer from '../Entity/Issuer'
import DateTimeHelper from '../Helper/DateTimeHelper'

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

const Container = styled.form`
  padding: 0 0 20px 0;
`

/**
 * @param {Bond} bond
 * @param {Issuer[]} issuers
 * @param {Currency[]} currencies
 * @returns {*}
 * @constructor
 */
function BondEdit ({bond, issuers, currencies}) {
  return <Container>
    <div>
      <FormattedMessage {...messages.issuerDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Select
        value={bond.issuer.identifier}
        onChange={
          event => bond.issuer = issuers.find(
            issuer => issuer.identifier === Number(event.target.value),
          )
        }
      >
        {
          issuers.map(
            issuer => <option key={issuer.identifier} value={issuer.identifier}>
              {issuer.name}
            </option>,
          )
        }
      </Select>
    </div>

    <div>
      <FormattedMessage {...messages.ISINDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputText value={bond.ISIN} onChange={event => bond.ISIN = event.target.value}/>
    </div>

    <div>
      <FormattedMessage {...messages.currencyDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Select
        value={bond.currency.identifier}
        onChange={
          event => bond.currency = currencies.find(
            currency => currency.identifier === Number(event.target.value),
          )
        }
      >
        {
          currencies.map(
            currency => <option key={currency.identifier} value={currency.identifier}>
              {currency.sign}
            </option>,
          )
        }
      </Select>
    </div>

    <div>
      <FormattedMessage {...messages.faceValueDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.faceValue} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.quantityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.quantity} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.placementDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.placementDate} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.maturityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={DateTimeHelper.toSQL(bond.maturity)} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.earlyRepaymentAvailableDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <CheckBox checked={bond.earlyRepaymentAvailable} disabled={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.offerStartDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.offerStart} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.offerEndDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.offerEnd} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.redemptionDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.redemptionDate} readOnly={true}/>
    </div>

    <div>
      <FormattedMessage {...messages.priceDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.price} readOnly={true}/>
    </div>
  </Container>
}

BondEdit.propTypes = {
  bond: PropTypes.instanceOf(Bond).isRequired,
  issuers: PropTypes.arrayOf(PropTypes.instanceOf(Issuer)).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.instanceOf(Currency)).isRequired,
}

export default observer(BondEdit)
