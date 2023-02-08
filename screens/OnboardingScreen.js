import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateEmail } from '../utils';
import { validateName } from '../utils';
import { AuthContext } from "../contexts/AuthContext";
import OnboardingStyles from '../styles/OnboardingStyles';

const OnboardingScreen = ({ navigation }) => {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
  
    const { signIn } = React.useContext(AuthContext);

    const updateIsBoarded = async (value) => {
        try {
            const boardedJson = JSON.stringify(value)
            await AsyncStorage.setItem('ONBOARDED', boardedJson)
        } catch (error) {
            console.error(error);
        }
      }

    const validValues = validateEmail(email) && validateName(name)
  
    const nextScreen = () => {
        onChangeName('')
        onChangeEmail('')
        updateIsBoarded(true)
        signIn({ name: name, email: email })
    };

    return (
        <View style={OnboardingStyles.container}>
            {/* Body */}
            <View style={OnboardingStyles.body}>
                <Text style={OnboardingStyles.text1}>Let us get to know you</Text>

                <Text style={OnboardingStyles.text}>First Name</Text>
                <TextInput
                    style={OnboardingStyles.inputBox}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder={'Type your name'}
                />

                <Text style={OnboardingStyles.text}>Email</Text>
                <TextInput
                    style={OnboardingStyles.inputBox}
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder={'Type your email'}
                    keyboardType={'email-address'}
                />
            </View>

            {/* Footer */}
            <View style={OnboardingStyles.footer}>
                <Pressable 
                    disabled={!validValues}
                    style={
                        validValues 
                            ? OnboardingStyles.buttonEnabled
                            : OnboardingStyles.buttonDisabled
                    }
                    onPress={nextScreen}
                    >
                    <Text style={OnboardingStyles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default OnboardingScreen;