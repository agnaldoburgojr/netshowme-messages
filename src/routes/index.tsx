import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen, ContactsScreen, DetailsScreen } from '../screens'
import Icon from 'react-native-vector-icons/Feather'
import colors from '../styles/colors'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="details" component={DetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const TabNavigator = () =>  {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name='stack' component={StackNavigator} options={mainOptions} />
      <Tab.Screen name='contacts' component={ContactsScreen} options={contactsOptions}/>
    </Tab.Navigator>
  );
}

const tabBarOptions = {
  activeTintColor: colors.accent,
  inactiveTintColor: colors.lightGrey,
}

const mainOptions={
  tabBarLabel: 'Cadastro',
  tabBarIcon: ({ color }: any) => (
    <Icon name="file-plus" color={color} size={26} />
  ),
}

const contactsOptions = { 
  tabBarLabel: 'Listagem',
  tabBarIcon: ({color} : any) => (
    <Icon name="list" color={color} size={26} />
  ),
}

export default TabNavigator