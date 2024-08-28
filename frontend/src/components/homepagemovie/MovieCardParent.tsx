import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {OnboardingItem} from '../../utils/constant';
import MovieCard from '../cards/MovieCard';
import {commonColor} from '../../utils/colors';

const {width} = Dimensions.get('screen');

const MovieCardParent = ({
  navigation,
  categoryname,
  categorytitle,
}: {
  navigation: any;
  categoryname: any;
  categorytitle: any;
}) => {
  return (
    <View>
      <View style={styles.movietitle}>
        <Text style={styles.text}>{categorytitle}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('movies', {
              categoryname: categoryname,
              categorytitle,
            });
          }}>
          <Text style={[styles.text, {color: commonColor.primaryyellow}]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.movielist}>
        <Animated.FlatList
          nestedScrollEnabled
          data={OnboardingItem}
          horizontal={true}
          contentContainerStyle={styles.flatlistpadding}
          showsHorizontalScrollIndicator={false}
          renderItem={({index, item}) => {
            return (
              <MovieCard
                key={categoryname + index.toString()}
                index={index}
                navigation={navigation}
                image={item.image}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default MovieCardParent;

const styles = StyleSheet.create({
  statusbarheight: {
    height: StatusBar.currentHeight,
  },
  headerwithstatusbar: {
    width,
    position: 'absolute',
    flex: 1,
    zIndex: 500,
  },
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
