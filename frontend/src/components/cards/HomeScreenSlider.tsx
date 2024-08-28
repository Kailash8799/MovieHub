import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {HomeScreenSliderType} from '../../utils/types';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const HomeScreenSlider = ({
  image,
  title,
  description,
  x,
  index,
}: HomeScreenSliderType) => {
  const animatedStyle = useAnimatedStyle(() => {
    // console.log(index.value);
    const inputRange = [
      (index.value - 1) * width,
      index.value * width,
      (index.value + 1) * width,
    ];
    const outputRange = [0.1, 1, 0.1];
    const opacity = interpolate(
      x.value,
      inputRange,
      outputRange,
      Extrapolation.CLAMP,
    );
    console.log(opacity);
    return {
      opacity: opacity,
    };
  });
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <LinearGradient
        style={styles.gradient}
        colors={[
          'transparent',
          'rgba(0,0,0,0.0)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.87)',
          'black',
        ]}
      />
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </View>
  );
};

export default HomeScreenSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: width,
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 20,
    paddingHorizontal: 13,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
  description: {
    fontSize: 15,
    fontWeight: '200',
    color: '#fff',
    paddingVertical: 0,
  },
});
