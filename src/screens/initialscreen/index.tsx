import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'react-native';
import { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialScreen = ({ navigation }: { navigation: any }) => {

    const _retrieveData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('userisFirstTime');
            if (value !== null) {
                navigation.reset({
                    index: 0,
                    // routes: [{ name: 'onboardingscreen' }],
                    routes: [{ name: 'homescreen' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'onboardingscreen' }],
                });
            }
        } catch (error) {
            // Error retrieving data
        }
    }, [navigation]);

    useEffect(() => {
        _retrieveData();
    }, [_retrieveData]);
    return (
        <View>
            <StatusBar backgroundColor={'rgba(52, 52, 52, 0.0)'} translucent animated showHideTransition={'slide'} />
            <Text>InitialScreen</Text>
        </View>
    );
};

export default InitialScreen;
