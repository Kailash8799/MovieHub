import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const MovieCategoryCard = ({ navigation, image, index }: { navigation: any, image: any, index: number }) => {
    const onClick = () => {
        navigation.navigate('moviedetails', { image, index });
    };
    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.5} style={styles.container}>
            <Animated.Image style={styles.image} source={image} />
        </TouchableOpacity>
    );
};

export default MovieCategoryCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5,
    },
    image: {
        flex: 1,
        width: width / 2.3,
        height: 200,
        zIndex: 1,
        borderRadius: 10,
    },
});
