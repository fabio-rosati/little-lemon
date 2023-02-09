import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable, TextInput } from 'react-native';

import { validateEmail } from '../utils';
import { validateName } from '../utils';
import { AuthContext } from "../contexts/AuthContext";
import OnboardingStyles from '../styles/OnboardingStyles';
import Hero from '../components/Hero';

const OnboardingScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const { signIn } = React.useContext(AuthContext);

    const validValues = validateEmail(email) && validateName(name)
  
    const nextScreen = () => {
        signIn({ name: name, email: email })
    };

    return (
        <ScrollView style={OnboardingStyles.container}>
            <Hero />
            <View style={OnboardingStyles.body}>
                <Text style={OnboardingStyles.text}>Name *</Text>
                <TextInput
                    style={OnboardingStyles.inputBox}
                    value={name}
                    onChangeText={setName}
                    placeholder={'Type your name'}
                />

                <Text style={OnboardingStyles.text}>Email *</Text>
                <TextInput
                    style={OnboardingStyles.inputBox}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Type your email'}
                    keyboardType={'email-address'}
                />
                <Pressable 
                    disabled={!validValues}
                    style={[
                        OnboardingStyles.button,
                        validValues ? {backgroundColor: '#495e57'} : {opacity: 0.4}
                    ]}
                    onPress={nextScreen}
                    >
                    <Text style={[
                        OnboardingStyles.buttonText,
                        validValues && {color: '#edefee'}
                    ]}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default OnboardingScreen;