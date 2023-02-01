import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [isReady, setIsReady] = useState(false);
    const [isBoarded, setIsBoarded] = useState(false);

    useEffect(() => {
        const restoreState = async () => {
          try {
            const boardedJson = await AsyncStorage.getItem('ONBOARDED');
            const boarded = boardedJson != null ? JSON.parse(boardedJson) : null;
            console.log(boardedJson)
            if (boarded !== null) {
                setIsBoarded(boarded);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsReady(true);
          }
        };
    
        if (!isReady) {
          restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        // We haven't finished reading from AsyncStorage yet
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator>
            {isBoarded ? (
                // Onboarding completed, user is signed in
                <Stack.Screen name="Profile" component={ProfileScreen} />
            ) : (
                // User is NOT signed in
                <>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
