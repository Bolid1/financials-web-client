import { Form } from 'formik'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CurrencySelector from '../Control/CurrencySelector'
import IssuerSelector from '../Control/IssuerSelector'
import FieldGroup from '../Element/FieldGroup'
import FieldInfo from '../Element/FieldInfo'
import Input from '../Element/Input'

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

const Container = styled(Form)`
  padding: 0 0 20px 0;
`

function BondEdit () {
  return <Container>
    <FieldGroup>
      <FormattedMessage {...messages.issuerDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <IssuerSelector name="issuer"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.ISINDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input name="ISIN"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.nameDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input name="name"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.currencyDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <CurrencySelector name="currency"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.faceValueDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="number" name="faceValue" step={0.01} min={0}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.quantityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="number" name="quantity" min={0}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.placementDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="placementDate"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.maturityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="maturity"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.earlyRepaymentAvailableDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="checkbox" name="earlyRepaymentAvailable" disabled={true}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.offerStartDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="offerStart"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.offerEndDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="offerEnd"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.redemptionDateDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="redemptionDate"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.priceDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="number" name="price" step={0.01} min={0}/>
    </FieldGroup>

    {/*<FieldGroup>
      <FormattedMessage {...messages.coupons}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      {bond.coupons.map(coupon => <InputsGroup key={coupon.id || 'add'}>
        <Input type="date" readOnly={true}/>
        <Input type="number" readOnly={true}/>
      </InputsGroup>)}
    </FieldGroup>*/}

    <FieldGroup>
      <FormattedMessage {...messages.save}>
        {text => <button type="submit">{text}</button>}
      </FormattedMessage>
    </FieldGroup>
  </Container>
}

export default BondEdit
