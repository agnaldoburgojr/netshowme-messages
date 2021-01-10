import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen, ContactsScreen, DetailsScreen } from '../screens'

const Tab = createBottomTabNavigator();

const Tabs = () =>  {
  return (
    <Tab.Navigator>
      <Tab.Screen name='main' component={MainScreen} />
      <Tab.Screen name='details' component={DetailsScreen} />
      <Tab.Screen name='contacts' component={ContactsScreen} />
    </Tab.Navigator>
  );
}

export default Tabs