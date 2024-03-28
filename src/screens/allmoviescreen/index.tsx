import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { OnboardingItem } from '../../utils/constant';
import MovieCategoryCard from '../../components/cards/MovieCategoryCard';
import BottomHeight from '../../components/BottomHeight';

const { width } = Dimensions.get('screen');

const AllMovieCategoryWise = ({ route, navigation }: { route: any, navigation: any }) => {
    const { categorytitle } = route?.params;
    return (
        <View style={styles.container}>
            <View style={styles.statusbar} />
            <View style={[styles.header]} >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.backbuton} >
                    <Icon name="angle-left" size={30} color={'#fff'} />
                    <Text style={styles.backtext} >{categorytitle}</Text>
                </TouchableOpacity>
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
            {/* <View style={styles.bottomwidth} /> */}
        </View>
    );
};

export default AllMovieCategoryWise;

const styles = StyleSheet.create({
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
    },
});
