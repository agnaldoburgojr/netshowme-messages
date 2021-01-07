import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen, MessageListScreen } from '../screens'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="List" component={MessageListScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs