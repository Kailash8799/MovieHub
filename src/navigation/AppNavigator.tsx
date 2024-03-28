// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/homescreen';
import AuthScreen from '../screens/authscreen';
import { StatusBar, useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../utils/theme';
import Onboardingscreen from '../screens/onboardingscreen/Onboardingscreen';
import InitialScreen from '../screens/initialscreen';
import MovieDetailsScreen from '../screens/moviedetailscreen';
import AllMovieCategoryWise from '../screens/allmoviescreen';
import PlayMovie from '../screens/movieplay';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme} >
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#222632' : '#fff'}
        animated={true} showHideTransition={'slide'}
        networkActivityIndicatorVisible={true}
        translucent
      />
      <Stack.Navigator
        initialRouteName="initialscreen"
        screenOptions={{ headerShown: false, gestureEnabled: true }} >
        <Stack.Screen name="initialscreen" component={InitialScreen} />
        <Stack.Screen name="onboardingscreen" component={Onboardingscreen} />
        <Stack.Screen name="homescreen" options={{ animation: 'default' }} component={HomeScreen} />
        <Stack.Screen name="moviedetails" options={{ animation: 'default' }} component={MovieDetailsScreen} />
        <Stack.Screen name="movies" options={{ animation: 'default' }} component={AllMovieCategoryWise} />
        <Stack.Screen name="playmovie" options={{ animation: 'default' }} component={PlayMovie} />
        <Stack.Screen name="authscreen" component={AuthScreen} options={{ animation: 'ios' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
