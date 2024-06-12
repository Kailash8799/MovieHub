import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { OnboardingCardType } from '../../utils/types';

const { height, width } = Dimensions.get('screen');

const Onboardingcard = ({ image, title, description }: OnboardingCardType) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <LinearGradient style={styles.gradient}
                colors={['transparent', 'rgba(0,0,0,0.0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.87)', 'black']}
            />
            <View style={styles.box} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.description} >{description}</Text>
            </View>
        </View>
    );
};

export default Onboardingcard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: height,
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
        bottom: 100,
        left: 0,
        right: 0,
        flex: 1,
        zIndex: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        color: '#fff',
        textAlign:'center',
    },
    description: {
        fontSize: 15,
        fontWeight: '200',
        color: '#fff',
        textAlign:'center',
        paddingVertical:10,
    },
});
