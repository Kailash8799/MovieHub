import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const MovieCard = ({ navigation, image, index }: { navigation: any, image: any, index: number }) => {
    const onClick = () => {
        navigation.navigate('moviedetails', { image, index }); // Replace 'ScreenName' with the actual name of the screen to navigate to
    };
    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.5} style={styles.container}>
            <Animated.Image style={styles.image} source={image} />
        </TouchableOpacity>
    );
};

export default MovieCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    image: {
        flex: 1,
        width: 140,
        zIndex: 1,
        borderRadius: 10,
    },
});
