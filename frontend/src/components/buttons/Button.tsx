import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomButtonType} from '../../utils/types';
import {commonColor} from '../../utils/colors';

const CustomButton = ({onClick, title, borderRadius}: CustomButtonType) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.container, {borderRadius: borderRadius}]}
        onPress={onClick}>
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonColor.primaryyellow,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 11,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
});
