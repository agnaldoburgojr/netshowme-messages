import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'
import { Button, Input } from '../../components'
import getValidationErrors from '../../utils/getValidationErrors';
import contactService from '../../services/contacts'
import { ChangeDataType, FormDataType } from './data'
import { Container, Title, UserAvatarButton, UserAvatar, ImageError } from './styles'
import schema from './schema'

type ImageResponse = {
  uri: string,
  isError: boolean,
}


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

  const validateFormat = (uri: string ): Boolean => {
    const fileExtension = uri.substr(-3)
    return fileExtension === 'jpg' || fileExtension === 'png'
  }

  const getImage = async (): Promise<ImageResponse> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const isValidateFormat = validateFormat(result.uri)
      if(!isValidateFormat) return { isError: true, uri: '' }
      return { isError: false, uri: result.uri }
    }
    return { isError: false, uri: '' }
  };

  const saveImage = async (uri: string): Promise<string> =>{
    const imageResized = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: {width: 500, height: 500} }]
    );

    const asset = await MediaLibrary.createAssetAsync(imageResized.uri)
    return asset.uri
  }

  const submitForm = useCallback(async ()=> {
    if(!imageUri) {
      setImageError('Você não carregou sua imagem. Clique no ícone para carregar!')
      return
    }
    try { 
      await schema.validate(data, { abortEarly: false });
      const avatarUri = await saveImage(imageUri)
      await contactService.save({ ...data, avatarUri })
      setData(emptyValues)
      setErrors(emptyValues)
      setImageError('')
      setImageUri('')
      navigation.navigate('contacts')
    } catch(error) {
      if(error instanceof Yup.ValidationError){
        const fieldErrors = getValidationErrors(error);
        setErrors({...errors, ...fieldErrors })
      }
      console.log(error)
      return;
    }
  }, [data, errors, navigation, imageUri])

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
      <Button onPress={submitForm}>Entrar</Button>
      <ImageError>{imageError}</ImageError>
    </Container>
  )
}

export default Main;