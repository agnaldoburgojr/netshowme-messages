import React, { useRef, useCallback, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Input } from '../../components'
import { emptyFormData, ChangeDataType, FormDataType } from './data'
import { Container, Title } from './styles'

const MainScreen: React.FC = () => {
  const [data, setData] = useState<FormDataType>(emptyFormData)
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const messageInputRef = useRef<TextInput>(null);

  const submitForm = useCallback(()=> {
    console.log(data)
  }, [data])

  const handleChange = useCallback(({value, fieldname}: ChangeDataType)=> {
    setData((prevState) => ({...prevState, [fieldname]: {...prevState[fieldname], value}}))
  }, [])

  return (
    <Container>
      <View>
        <Title>Nova mensagem</Title>
      </View>
      <View>
        <Input
          placeholder="Nome"
          value={data.name.value}
          onChangeText={(value)=> handleChange({value, fieldname: 'name'})}
          returnKeyType="next"
          ref={nameInputRef}
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
          autoCapitalize="words"
          error={data.name.error}
        />
        <Input
          placeholder="E-mail"
          value={data.email.value}
          onChangeText={(value)=> handleChange({value, fieldname: 'email'})}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          ref={emailInputRef}
          onSubmitEditing={() => {
            phoneInputRef.current?.focus();
          }}
        />
        <Input
          placeholder="Celular"
          value={data.phone.value}
          onChangeText={(value)=> handleChange({value, fieldname: 'phone'})}
          keyboardType="phone-pad"
          returnKeyType="next"
          ref={phoneInputRef}
          onSubmitEditing={() => {
            messageInputRef.current?.focus();
          }}
        />
        <Input
          placeholder="Mensagem"
          value={data.message.value}
          onChangeText={(value)=> handleChange({value, fieldname: 'message'})}
          ref={messageInputRef}
          onSubmitEditing={submitForm}
        />
      </View>
      <Button 
        onPress={submitForm}>Entrar</Button>
    </Container>
  )
}

export default MainScreen;