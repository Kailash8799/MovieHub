import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Signin = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
