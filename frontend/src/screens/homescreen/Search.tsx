import { View, StyleSheet, StatusBar, Dimensions, FlatList, TextInput } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { OnboardingItem } from '../../utils/constant';
import MovieCategoryCard from '../../components/cards/MovieCategoryCard';
import BottomHeight from '../../components/BottomHeight';

const { width } = Dimensions.get('screen');

const Search = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statusbar} />
      <View style={[styles.header]} >
        <View style={styles.inputview} >
          <Icon name="search" style={styles.iconstyle} size={20} />
          <TextInput placeholder="Search" style={styles.searchinput} />
        </View>
        <View style={styles.spacewidth} />
        <View style={styles.filtericon} >
          <Icon name="filter" size={30} />
        </View>
      </View>
      <FlatList
        data={OnboardingItem}
        numColumns={2}
        ListFooterComponent={BottomHeight}
        showsVerticalScrollIndicator={false}
        style={styles.flatliststyle}
        columnWrapperStyle={styles.flatlistcolumnWrapperStyle}
        renderItem={({ item, index }) => {
          return <MovieCategoryCard image={item.image} navigation={navigation} index={index} key={index} />;
        }}
      />
      {/*  */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  iconstyle: {
    marginLeft: 14,
  },
  spacewidth: {
    width: 10,
  },
  inputview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
  },
  filtericon: {
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
  searchinput: {
    fontSize: 20,
    color: 'grey',
    paddingHorizontal: 10,
    flex: 1,
  },
  bottomwidth: {
    height: 50,
  },
  flatliststyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  flatlistcolumnWrapperStyle: {
    justifyContent: 'space-between',
  },
  backbuton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    left: 15,
  },
  backtext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 20,
  },
  container: {
    flex: 1,
  },
  statusbar: {
    height: StatusBar.currentHeight,
    width,
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
