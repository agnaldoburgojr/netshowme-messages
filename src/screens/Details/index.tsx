import React, { useState, useEffect, useCallback } from 'react';
import { Platform, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Feather';
import { ContactItem, Button } from '../../components'
import colors from '../../styles/colors';
import { Container, BackButton, ContainerContact } from './styles'

export type Subscription = {
  remove: () => void;
};

export type RouteParams = {
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  avatarUri: string,
  date: string,
  sendNotification: string
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DetailsScreen:React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute();

  const routeParams = params as RouteParams;
  const [contact, setContact] = useState({} as RouteParams)

  const handleGoBack = useCallback(() => {
    navigation.navigate('main');
  }, [navigation]);

  const handlePress = useCallback(() => {
    navigation.navigate('contacts');
  }, [navigation]);

  useEffect(()=> {
    let active = true
    const sendMessage = async (title: string, body: string, data: RouteParams ) => {
      if(active) {
        await schedulePushNotification(title, body, data);
      }
    }

    if(routeParams) {
      setContact(routeParams)

      if(routeParams.sendNotification === 'true'){
        sendMessage(routeParams.name, routeParams.message, routeParams)
      }
    }

    return () => {
      active = false
    }
  }, [])

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Icon name="chevron-left" size={24} color={colors.black} />
      </BackButton>
      <ContainerContact>
        <ContactItem 
          id={contact.id}
          avatarUri={contact.avatarUri}
          name={contact.name}
          message={contact.message}
          email={contact.email}
          phone={contact.phone}
          date={contact.date}
        />
      </ContainerContact>
      <Button onPress={handlePress}>Ver todos os registros</Button>
    </Container> 
  );
}

async function schedulePushNotification(title: string, body: string, data: RouteParams) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `📬 ${title}` ,
      body,
      data,
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.accent,
    });
  }
  return token;
}

export default DetailsScreen