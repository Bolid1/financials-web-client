import { FieldArray, Form } from 'formik'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CurrencySelector from '../Control/CurrencySelector'
import IssuerSelector from '../Control/IssuerSelector'
import FieldGroup from '../Element/FieldGroup'
import FieldInfo from '../Element/FieldInfo'
import Input from '../Element/Input'
import CouponsList from './CouponsList'

const messages = defineMessages(
  {
    issuerDescription: 'Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.',
    ISINDescription: 'Международный идентификационный код ценной бумаги',
    nameDescription: 'Название облигации',
    currencyDescription: 'Валюта, в которой происходят торги по данным облигациям',
    faceValueDescription: 'Номинал - это сумма, которую получит держатель облигации в день выкупа облигации эмитентом.',
    quantityDescription: 'Количество облигаций в обращении',
    maturityDescription: 'Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала',
    offerEndDescription: 'Дата, в которую завершается приём заявок на досрочный выкуп облигаций по номинальной стоимости',
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
      <FormattedMessage {...messages.maturityDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="maturity"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.offerEndDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="date" name="offerEnd"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.priceDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input type="number" name="price" step={0.01} min={0}/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.coupons}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <FieldArray
        name="coupons"
        component={CouponsList}
      />
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.save}>
        {text => <button type="submit">{text}</button>}
      </FormattedMessage>
    </FieldGroup>
  </Container>
}

export default BondEdit
