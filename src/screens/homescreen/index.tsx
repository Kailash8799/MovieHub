import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';
import Home from './Home';
import Search from './Search';
import MyList from './MyList';
import Profile from './Profile';
import { darkThemeColor, lightThemeColor } from '../../utils/colors';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const theme = useColorScheme();
  return (
    <Tab.Navigator initialRouteName="home" backBehavior="history" screenOptions={{ tabBarLabel: '', tabBarStyle: { height: 65, paddingTop: 7, backgroundColor: theme === 'dark' ? darkThemeColor.secondary : lightThemeColor.quinary }, headerShown: false, tabBarHideOnKeyboard: true }} >
      <Tab.Screen name="home" options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" color={color} size={size} />;
        },
      }} component={Home} />
      <Tab.Screen name="search" options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          return <Icon name="search" color={color} size={size} />;
        },
      }} component={Search} />
      <Tab.Screen name="mylist" options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          return <Icon name="bookmark" color={color} size={size} />;
        },
      }} component={MyList} />
      <Tab.Screen name="profile" options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          return <Icon name="person" color={color} size={size} />;
        },
      }} component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
