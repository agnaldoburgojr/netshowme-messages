import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen, ContactsScreen, DetailsScreen } from '../screens'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="details" component={DetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const TabNavigator = () =>  {
  return (
    <Tab.Navigator>
      <Tab.Screen name='stack' component={StackNavigator} />
      <Tab.Screen name='contacts' component={ContactsScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator