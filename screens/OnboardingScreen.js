import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TextInput, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils';
import { validateName } from '../utils';

const OnboardingScreen = ({ navigation }) => {
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
  
    const updateIsBoarded = async (value) => {
        try {
            const boardedJson = JSON.stringify(value)
            console.log(boardedJson)
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
        navigation.navigate('Profile')
    //   Platform.OS === 'web'
    //     ? alert('Thanks for subscribing, stay tuned!')
    //     : Alert.alert('', 'Thanks for subscribing, stay tuned!')
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../assets/little-lemon-logo-and-title.png')}
                    resizeMode="cover"
                    accessible={true}
                    accessibilityLabel={'Little Lemon Logo'}
                />
            </View>

            {/* Body */}
            <View style={styles.body}>
                <Text style={styles.text1}>Let us get to know you</Text>

                <Text style={styles.text}>First Name</Text>
                <TextInput
                    style={styles.inputBox}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder={'Type your name'}
                />

                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder={'Type your email'}
                    keyboardType={'email-address'}
                />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Pressable 
                    disabled={!validValues}
                    style={
                        validValues 
                            ? styles.buttonEnabled
                            : styles.buttonDisabled
                    }
                    onPress={nextScreen}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        // height: 90,
        backgroundColor: '#dee3e9',
        justifyContent: 'center', // Vertical
        alignItems: 'center', // Horizontal
        paddingVertical: 10,
    },
    body: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 40,
        justifyContent: 'center',
        backgroundColor: '#cbd2d9'
    },
    footer: {
        paddingHorizontal: 40,
        paddingVertical: 40,
        backgroundColor: '#f1f4f7',
    },
    image: {
        // width: 200,
        // height: 200,
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        color: '#344854',
        textAlign: 'center',
    },
    text1: {
        fontWeight: '500',
        fontSize: 20,
        color: '#344854',
        textAlign: 'center',
        marginBottom: 50,
    },
    buttonEnabled: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 5,
        backgroundColor: '#cbd2d9',
        borderRadius: 10,
    },
    buttonDisabled: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 5,
        backgroundColor: '#cbd2d9',
        borderRadius: 10,
        opacity: 0.4,
    },
    buttonText: {
        color: '#344854',
        textAlign: 'center',
        fontSize: 20,
    },
    inputBox: {
        justifyContent: 'center',
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        fontSize: 20,
        placeholderTextColor: 'grey',
        borderRadius: 10,
        borderColor: '#344854',
        // backgroundColor: '#EDEFEE',
    },
});