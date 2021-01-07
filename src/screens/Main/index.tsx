import React, { useRef, useCallback, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Input } from '../../components'
import { ChangeDataType, FormDataType } from './data'
import { Container, Title } from './styles'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';
import schema from './schema'

const MainScreen: React.FC = () => {
  const emptyValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
  const [data, setData] = useState<FormDataType>(emptyValues)
  const [errors, setErrors] = useState<FormDataType>(emptyValues)
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const messageInputRef = useRef<TextInput>(null);

  const submitForm = useCallback(async ()=> {
    try {
      
      await schema.validate(data, { abortEarly: false });

      console.log('passou')
      setData(emptyValues)
      setErrors(emptyValues)
    } catch(error) {
      if(error instanceof Yup.ValidationError){
        const fieldErrors = getValidationErrors(error);
        setErrors({...errors, ...fieldErrors })
      }
      return;
    }
  }, [data, errors])

  const handleChange = useCallback(({value, fieldname}: ChangeDataType)=> {
    setData((prevState) => ({...prevState, [fieldname]: value}))
    setErrors((prevState) => ({...prevState, [fieldname]: ''}))
  }, [])

  return (
    <Container>
      <View>
        <Title>Nova mensagem</Title>
      </View>
      <View>
        <Input
          placeholder="Nome"
          value={data.name}
          onChangeText={(value)=> handleChange({value, fieldname: 'name'})}
          returnKeyType="next"
          ref={nameInputRef}
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
          autoCapitalize="words"
          error={errors.name}
        />
        <Input
          placeholder="E-mail"
          value={data.email}
          onChangeText={(value)=> handleChange({value, fieldname: 'email'})}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          ref={emailInputRef}
          onSubmitEditing={() => {
            phoneInputRef.current?.focus();
          }}
          error={errors.email}
        />
        <Input
          placeholder="Celular"
          value={data.phone}
          onChangeText={(value)=> handleChange({value, fieldname: 'phone'})}
          keyboardType="phone-pad"
          returnKeyType="next"
          ref={phoneInputRef}
          onSubmitEditing={() => {
            messageInputRef.current?.focus();
          }}
          error={errors.phone}
        />
        <Input
          placeholder="Mensagem"
          value={data.message}
          onChangeText={(value)=> handleChange({value, fieldname: 'message'})}
          ref={messageInputRef}
          onSubmitEditing={submitForm}
          error={errors.message}
        />
      </View>
      <Button 
        onPress={submitForm}>Entrar</Button>
    </Container>
  )
}

export default MainScreen;