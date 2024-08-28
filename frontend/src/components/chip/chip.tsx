import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {commonColor} from '../../utils/colors';

const Chip = ({name}: {name: string}) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'rgba(255,159,11,0.3)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  text: {
    color: commonColor.primaryyellow,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '900',
  },
});
