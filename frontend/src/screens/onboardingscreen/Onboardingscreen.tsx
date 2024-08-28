import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Onboardingcard from '../../components/cards/Onboardingcard';
import {OnboardingItem} from '../../utils/constant';
import CustomButton from '../../components/buttons/Button';
import {StatusBar} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');

const Onboardingscreen = ({navigation}: {navigation: any}) => {
  const [sliderIndex, setsliderIndex] = useState(0);
  const [sliderScrolled, setsliderScrolled] = useState(0);
  const [buttontitle, setbuttontitle] = useState('Next');
  const ref = useRef<FlatList>(null);

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ind = Math.floor(e.nativeEvent.contentOffset.x / width);
    setsliderScrolled(e.nativeEvent.contentOffset.x);
    setsliderIndex(ind);
    if (ind === 2) {
      setbuttontitle('Continue');
    } else {
      setbuttontitle('Next');
    }
  };

  const NextCard = async () => {
    if (sliderIndex === 2) {
      await AsyncStorage.setItem('userisFirstTime', 'loginuser');
      // navigation.navigate('homescreen', {
      //   screen: 'home',
      //   initial: false,
      // });
      navigation.reset({
        index: 0,
        routes: [{name: 'homescreen'}],
      });
    } else {
      setbuttontitle('Next');
    }
    console.log(sliderIndex);
    ref.current?.scrollToOffset({
      offset: (sliderIndex + 1) * width,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'rgba(52, 52, 52, 0.0)'} translucent />
      <FlatList
        ref={ref}
        data={OnboardingItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleOnScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({index, item}) => {
          return (
            <Onboardingcard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          );
        }}
      />
      <View style={styles.bottomBox}>
        <Indicator scrollX={sliderScrolled} />
        <CustomButton
          title={buttontitle}
          borderRadius={10}
          onClick={NextCard}
        />
      </View>
    </View>
  );
};

const Indicator = ({scrollX}: {scrollX: number}) => {
  return (
    <Animated.View style={styles.dotbox}>
      {OnboardingItem.map((_, i) => {
        return <Dot key={i} scrollX={scrollX} index={i} />;
      })}
    </Animated.View>
  );
};

const Dot = ({scrollX, index}: {scrollX: number; index: number}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = interpolate(
    scrollX,
    inputRange,
    [0.8, 1.2, 0.8],
    Extrapolation.CLAMP,
  );
  const widthscale = interpolate(
    scrollX,
    inputRange,
    [0, 10, 0],
    Extrapolation.CLAMP,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 100,
      marginHorizontal: 5,
      height: 8,
      width: 13 + widthscale,
      backgroundColor: '#fff',
      transform: [{scale: scale}],
    };
  });

  return <Animated.View style={animatedStyle} />;
};

export default Onboardingscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  dotbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 15,
  },
});
