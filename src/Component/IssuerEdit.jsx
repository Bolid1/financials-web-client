import { Field, Form } from 'formik'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import FieldGroup from '../Element/FieldGroup'
import FieldInfo from '../Element/FieldInfo'
import Input from '../Element/Input'
import Select from '../Element/Select'

const messages = defineMessages(
  {
    nameDescription: 'Название облигации',
    typeDescription: 'Тип эмитента',
    typeCorporate: 'Компания',
    typeMunicipal: 'Муниципалитет',
    typeState: 'Государство',
    save: 'Сохранить',
  },
)

const Container = styled(Form)`
  padding: 0 0 20px 0;
`

function IssuerEdit () {
  return <Container>
    <FieldGroup>
      <FormattedMessage {...messages.nameDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Input name="name"/>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.typeDescription}>
        {text => <FieldInfo>{text}</FieldInfo>}
      </FormattedMessage>
      <Field component={Select} name="type">
        <FormattedMessage {...messages.typeCorporate}>
          {text => <option value="corporate">{text}</option>}
        </FormattedMessage>
        <FormattedMessage {...messages.typeMunicipal}>
          {text => <option value="municipal">{text}</option>}
        </FormattedMessage>
        <FormattedMessage {...messages.typeState}>
          {text => <option value="state">{text}</option>}
        </FormattedMessage>
      </Field>
    </FieldGroup>

    <FieldGroup>
      <FormattedMessage {...messages.save}>
        {text => <button type="submit">{text}</button>}
      </FormattedMessage>
    </FieldGroup>
  </Container>
}

export default IssuerEdit
