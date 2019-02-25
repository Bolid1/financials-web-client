import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CurrencySelector from '../Control/CurrencySelector'
import CheckBox from '../Element/CheckBox'
import FieldGroup from '../Element/FieldGroup'
import FieldInfo from '../Element/FieldInfo'
import InputDate from '../Element/InputDate'
import InputNumber from '../Element/InputNumber'
import InputsGroup from '../Element/InputsGroup'
import InputText from '../Element/InputText'
import IssuerSelector from '../Control/IssuerSelector'

const messages = defineMessages(
  {
    issuerDescription: 'Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.',
    ISINDescription: 'Международный идентификационный код ценной бумаги',
    nameDescription: 'Название облигации',
    currencyDescription: 'Валюта, в которой происходят торги по данным облигациям',
    faceValueDescription: 'Номинал - это сумма, которую получит держатель облигации в день выкупа облигации эмитентом.',
    quantityDescription: 'Количество выпущенных облигаций',
    placementDateDescription: 'Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок',
    maturityDescription: 'Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала',
    earlyRepaymentAvailableDescription: 'Доступна ли возможность досрочного погашения',
    offerStartDescription: 'Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости',
    offerEndDescription: 'Дата, в которую завершается приём заявок на выкуп облигаций по номинальной стоимости',
    redemptionDateDescription: 'В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой стоимости или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все предъявленные инвесторами облигации.',
    priceDescription: 'Текущая стоимость облигации',
    coupons: 'Купоны - выплаты держателяем облигаций',
    save: 'Сохранить',
  },
)

const Container = styled.form`
  padding: 0 0 20px 0;
`

/**
 * @param {Bond} bond
 * @returns {*}
 * @constructor
 */
function BondEdit ({bond}) {
  return <Container onSubmit={
    event => {
      event.preventDefault()
      console.debug(bond.toJSON())
    }
  }>
    <FieldGroup>
      <FormattedMessage {...messages.issuerDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <IssuerSelector selected={bond.issuer} onChange={issuer => bond.setIssuer(issuer)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.ISINDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputText value={bond.ISIN} onChange={event => bond.setISIN(event.target.value)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.nameDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputText value={bond.name} onChange={event => bond.setName(event.target.value)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.currencyDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <CurrencySelector selected={bond.currency} onChange={currency => bond.setCurrency(currency)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.faceValueDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.faceValue} step={0.01} min={0}
                   onChange={event => bond.setFaceValue(event.target.value)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.quantityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.quantity} min={0} onChange={event => bond.setQuantity(event.target.value)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.placementDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.placementDate}
                 onChange={event => bond.setPlacementDate(new Date(event.target.value))}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.maturityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.maturity}
                 onChange={event => bond.setMaturity(new Date(event.target.value))}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.earlyRepaymentAvailableDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <CheckBox checked={bond.earlyRepaymentAvailable} disabled={true}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.offerStartDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.offerStart}
                 onChange={event => bond.setOfferStart(new Date(event.target.value))}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.offerEndDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.offerEnd}
                 onChange={event => bond.setOfferEnd(new Date(event.target.value))}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.redemptionDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputDate value={bond.redemptionDate}
                 onChange={event => bond.setRedemptionDate(new Date(event.target.value))}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.priceDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <InputNumber value={bond.price} step={0.01} min={0} onChange={event => bond.setPrice(event.target.value)}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.coupons}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      {bond.coupons.map(coupon => <InputsGroup key={coupon.id || 'add'}>
        <InputDate readOnly={true}/>
        <InputNumber readOnly={true}/>
      </InputsGroup>)}
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.save}>
        {text => <button type="submit">{text}</button>}
      </FormattedMessage>
    </FieldGroup>
  </Container>
}

BondEdit.propTypes = {
  bond: PropTypes.object.isRequired,
}

export default observer(BondEdit)
