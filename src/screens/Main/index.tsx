import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import * as Yup from 'yup'
import { Button, Input } from '../../components'
import getValidationErrors from '../../utils/getValidationErrors';
import contactService from '../../services/contacts'
import { getImage, saveImage } from '../../utils/imageManager'
import { ChangeDataType, FormDataType } from './data'
import { Container, Title, UserAvatarButton, UserAvatar, ImageError } from './styles'
import schema from './schema'

export type Subscription = {
  remove: () => void;
};

const Main: React.FC = () => {
  const emptyValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
  const [imageUri, setImageUri] = useState('');
  const [imageError, setImageError] = useState('');
  const [hasCameraPermission, setCameraPermission] = useState(false)
  const [data, setData] = useState<FormDataType>(emptyValues)
  const [errors, setErrors] = useState<FormDataType>(emptyValues)
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const messageInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
      const contact = response.notification.request.content.data
      navigation.navigate('details',  {...contact, sendNotification: 'false'})
    });
    return () => {
      Notifications.removeNotificationSubscription(responseListener as unknown as Subscription);
    };
  }, [])

  const getPermissions = useCallback(async () => {
    if (Platform.OS !== 'web' || !hasCameraPermission) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {
        setCameraPermission(true)
        return
      }
      setImageError('Você não tem permissões de acesso às imagens. Veja as configurações do aplicativo em de seu dispositivo.');
    }
  }, [hasCameraPermission])

  const submitForm = useCallback(async ()=> {
    if(!imageUri) {
      setImageError('Você não carregou sua imagem. Clique no ícone para carregar!')
      return
    }
    try { 
      await schema.validate(data, { abortEarly: false });
      const avatarUri = await saveImage(imageUri)
      const contact = await contactService.save({ ...data, avatarUri })
      setData(emptyValues)
      setErrors(emptyValues)
      setImageError('')
      setImageUri('')
      navigation.navigate('details', {...contact, date: contact.date.toString(), sendNotification: 'true'})
    } catch(error) {
      if(error instanceof Yup.ValidationError){
        const fieldErrors = getValidationErrors(error);
        setErrors({...errors, ...fieldErrors })
      }
      return;
    }
  }, [data, errors, navigation, imageUri, contactService])

  const handleChange = useCallback(({value, fieldname}: ChangeDataType)=> {
    setData((prevState) => ({...prevState, [fieldname]: value}))
    setErrors((prevState) => ({...prevState, [fieldname]: ''}))
  }, [])

  const handleUpdateAvatar = useCallback(async() => {
    setImageError('')
    await getPermissions()
    const { isError, uri } = await getImage()

    if(isError){
      return setImageError('Um erro aconteceu ao carregar a imagem! Verifique o formato (PNG ou JPG) e tente novamente')
    }

    if(uri){
      setImageUri(uri)
    }
  }, []);

  useEffect(() => {
    getPermissions()
  }, []);

  return (
    <Container>
      <View>
        <Title>Nova mensagem</Title>
      </View>
      <View>
        <UserAvatarButton onPress={handleUpdateAvatar}>
          <UserAvatar source={!imageUri ? {} : { uri: imageUri }} />
        </UserAvatarButton>
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
      <Button onPress={submitForm}>Salvar</Button>
      <ImageError>{imageError}</ImageError>
    </Container>
  )
}

export default Main;