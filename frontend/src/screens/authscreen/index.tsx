import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './Signin';
import Signup from './Signup';

const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="signin" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="signin" component={Signin} options={{animation:'none'}} />
      <Stack.Screen name="signup" component={Signup} options={{animation:'none'}} />
    </Stack.Navigator>
  );
};

export default AuthScreen;
