import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreenSlider from '../../components/cards/HomeScreenSlider';
import { OnboardingItem } from '../../utils/constant';
import Animated, { useAnimatedScrollHandler, useSharedValue, withTiming } from 'react-native-reanimated';
import { ViewToken } from 'react-native';
import 'react-native-gesture-handler';
import { commonColor } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Entypo';
import MovieCard from '../../components/cards/MovieCard';


// const { width } = Dimensions.get('screen');
// import Icon from 'react-native-vector-icons/AntDesign';

// { navigation }: { navigation: any }
const Home = ({ navigation }: { navigation: any }) => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = withTiming(event.contentOffset.x);
      // flatListIndex.value = withTiming(event.contentOffset.x / width);
    },
  });

  const onViewableItemsChanged = ({ viewableItems }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
      <StatusBar backgroundColor={'rgba(52, 52, 52, 0.0)'} translucent />
      <View style={styles.container} >
        <View style={styles.flatlistview} >
          <Animated.FlatList
            nestedScrollEnabled
            // ref={ref}
            data={OnboardingItem}
            horizontal={true}
            pagingEnabled={true}
            onScroll={onScroll}
            onViewableItemsChanged={onViewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return <HomeScreenSlider
                key={index}
                x={x}
                index={flatListIndex}
                image={item.image}
                title={item.title}
                description={item.description}
              />;
            }}
          />
        </View>
        <View style={styles.bottombox} >
          <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.playbutton]} >
            <Icon name="controller-play" color={'#fff'} size={20} />
            <Text style={styles.text} >Play</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.tolistbutton]} >
            <Icon name="plus" color={commonColor.primaryyellow} size={20} />
            <Text style={[styles.text, { color: commonColor.primaryyellow }]} >ToList</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.movietitle}>
          <Text style={styles.text} >Top 10 movies this week</Text>
          <TouchableOpacity>
            <Text style={[styles.text, { color: commonColor.primaryyellow }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.movielist}>
          <Animated.FlatList
            nestedScrollEnabled
            data={OnboardingItem}
            horizontal={true}
            contentContainerStyle={styles.flatlistpadding}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return <MovieCard
                key={index}
                index={index}
                navigation={navigation}
                image={item.image}
              />;
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.movietitle}>
          <Text style={styles.text} >Top 10 movies this week</Text>
          <TouchableOpacity>
            <Text style={[styles.text, { color: commonColor.primaryyellow }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.movielist}>
          <Animated.FlatList
            nestedScrollEnabled
            data={OnboardingItem}
            horizontal={true}
            contentContainerStyle={styles.flatlistpadding}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return <MovieCard
                key={index}
                index={index}
                navigation={navigation}
                image={item.image}
              />;
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.movietitle}>
          <Text style={styles.text} >Top 10 movies this week</Text>
          <TouchableOpacity>
            <Text style={[styles.text, { color: commonColor.primaryyellow }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.movielist}>
          <Animated.FlatList
            nestedScrollEnabled
            data={OnboardingItem}
            horizontal={true}
            contentContainerStyle={styles.flatlistpadding}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return <MovieCard
                key={index}
                index={index}
                navigation={navigation}
                image={item.image}
              />;
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  movielist: {
    height: 200,
  },
  flatlistpadding: {
    paddingHorizontal: 8,
  },
  movietitle: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  container: {
    height: 400,
    backgroundColor: 'red',
  },
  flatlistview: {
    flex: 1,
  },
  bottombox: {
    position: 'absolute',
    bottom: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
    marginLeft: 13,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  tolistbutton: {
    borderWidth: 1,
    borderColor: commonColor.primaryyellow,
  },
  playbutton: {
    backgroundColor: commonColor.primaryyellow,
  },
});
