import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Pressable, StyleSheet, TextInput, ToastAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from "../contexts/AuthContext";
import { profileStyles, avatarStyle, textStyle, checkboxStyle, buttonStyle } from '../styles/ProfileStyles';

export default function ProfileScreen({ route, navigation }) {
    // const { paramName, paramEmail } = route.params != undefined
    //     ? route.params
    //     : {paramEmail: '', paramName: ''}

    const { signOut } = React.useContext(AuthContext);
    const { loginData } = React.useContext(AuthContext);
    const { updateUserData } = React.useContext(AuthContext);

    // const [name, setName] = useState(paramName);
    const [name, setName] = useState(loginData.name);
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState(paramEmail);
    const [email, setEmail] = useState(loginData.email);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);

    const [notifications, setNotifications] = useState({
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    });

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const clearImage = () => {
        setImage(null);
    }

    const saveChanges = () => {
        saveData()
        updateUserData({
            image: image, 
            name: name, 
            lastName: lastName
        })
    }

    const discardChanges = () => {
        setName('')
        setLastName('')
        setEmail('')
        setPhoneNumber('')
        setImage(null)
        setNotifications({
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
        })
    }

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            let storedValue
            let stringValue

            storedValue = await AsyncStorage.getItem('NAME')
            stringValue = storedValue !== null 
                ? storedValue
                : name
            setName(stringValue)

            storedValue = await AsyncStorage.getItem('EMAIL')
            stringValue = storedValue !== null 
                ? storedValue
                : email
            setEmail(stringValue)

            storedValue = await AsyncStorage.getItem('LAST-NAME')
            stringValue = storedValue !== null 
                ? storedValue
                : ''
            setLastName(stringValue)

            storedValue = await AsyncStorage.getItem('PHONE-NUMBER')
            stringValue = storedValue !== null 
                ? storedValue
                : ''
            setPhoneNumber(stringValue)

            storedValue = await AsyncStorage.getItem('IMAGE')
            const objectValue = storedValue != null 
                ? JSON.parse(storedValue) 
                : null
            setImage(objectValue)

            // values = await AsyncStorage.multiGet([
            //     'NAME',
            //     'LAST-NAME',
            //     'EMAIL',
            //     'PHONE-NUMBER',
            //     'IMAGE',
            // ]) // Returns: [ ['NAME','value'], ['LAST-NAME','value'], ... ]

            const values = await AsyncStorage.multiGet(
                    Object.keys(notifications) // [orderStatuses, passwordChanges, specialOffers, newsletter]
            ) // Returns: [ ['orderStatuses','value'], ['passwordChanges','value'], ... ]
            const initialState = values.reduce((accumulator, currentValue) => {
                accumulator[currentValue[0]] = JSON.parse(currentValue[1]); // accumulator['orderStatuses'] = 'value'
                return accumulator;
            }, {});
            setNotifications(initialState);

        } catch(e) {
            console.error(e);
        }
    }
      
    const saveData = async () => {
        try {
            // await AsyncStorage.setItem('NAME', name)
            // await AsyncStorage.setItem('LAST-NAME', lastName)
            // await AsyncStorage.setItem('EMAIL', email)
            // await AsyncStorage.setItem('PHONE-NUMBER', phoneNumber)
            // await AsyncStorage.setItem('IMAGE', JSON.stringify(image))
            await AsyncStorage.multiSet([
                ['NAME', name],
                ['LAST-NAME', lastName],
                ['EMAIL', email],
                ['PHONE-NUMBER', phoneNumber],
                ['IMAGE', JSON.stringify(image)],
            ])

            await AsyncStorage.multiSet(Object.entries(notifications).map((entry) => {
                return [entry[0], String(entry[1])]; // entry[0]: param name, entry[1]: param value
              }))
        } catch (e) {
            console.error(e);
        } finally {
            ToastAndroid.show('Data has been saved!', ToastAndroid.SHORT);
        }
    }

    const clearData = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            console.error(e);
        }
    }

    const logout = () => {
        discardChanges()
        clearData()
        signOut()
    }

    const toggleNotification = (key) => () =>
        setNotifications((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));


    return (
        <ScrollView contentContainerStyle={profileStyles.scrollView}>

            {/* Body */}
            <View style={profileStyles.body}>

                <Text style={textStyle.h1}>Personal information</Text>

                {/* Avatar */}
                <Text style={textStyle.h2}>Avatar</Text>
                <View style={profileStyles.avatarContainer}>
                    <View style={avatarStyle.container}>
                        {!image && 
                            <Text style={avatarStyle.placeholder}>{name.substr(0,1) + lastName.substr(0,1)}</Text>
                        }
                        {image && 
                            <Image
                                style={avatarStyle.image}
                                source={{uri: image}}
                                resizeMode="cover"
                            />
                        }
                    </View>
                    <Pressable 
                        style={buttonStyle.green}
                        onPress={pickImage}
                        >
                        <Text style={buttonStyle.textForGreen}>Change</Text>
                    </Pressable>
                    <Pressable 
                        style={buttonStyle.white}
                        onPress={clearImage}
                        >
                        <Text style={buttonStyle.textForWhite}>Remove</Text>
                    </Pressable>
                </View>

                {/* Info */}
                <View style={profileStyles.infoContainer}>
                    <Text style={textStyle.h2}>First name</Text>
                    <TextInput
                        style={profileStyles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder={'Type your name'}
                    />

                    <Text style={textStyle.h2}>Last name</Text>
                    <TextInput
                        style={profileStyles.textInput}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder={'Type your last name'}
                    />

                    <Text style={textStyle.h2}>Email</Text>
                    <TextInput
                        style={profileStyles.textInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Type your email'}
                        keyboardType={'email-address'}
                    />

                    <Text style={textStyle.h2}>Phone number</Text>
                    <MaskedTextInput
                        style={profileStyles.textInput}
                        value={phoneNumber}
                        mask="(999) 999-9999"
                        onChangeText={(text, rawText) => {
                            setPhoneNumber(rawText)
                            // console.log(text);
                            // console.log(rawText);
                        }}
                        placeholder={'Type your phone number'}
                        keyboardType={'numeric'}
                    />
                </View>

                <Text style={textStyle.h1}>Email notifications</Text>

                {/* Notifications */}
                <View style={profileStyles.notificationsContainer}>
                    <View style={checkboxStyle.switch}>
                        <Checkbox
                            style={checkboxStyle.checkbox}
                            color={notifications.orderStatuses ? '#495e57' : undefined}
                            value={notifications.orderStatuses}
                            onValueChange={toggleNotification('orderStatuses')}
                        />
                        <Text style={checkboxStyle.text}>Order statuses</Text>
                    </View>
                    <View style={checkboxStyle.switch}>
                        <Checkbox
                            style={checkboxStyle.checkbox}
                            color={notifications.passwordChanges ? '#495e57' : undefined}
                            value={notifications.passwordChanges}
                            onValueChange={toggleNotification('passwordChanges')}
                        />
                        <Text style={checkboxStyle.text}>Password changes</Text>
                    </View>
                    <View style={checkboxStyle.switch}>
                        <Checkbox
                            style={checkboxStyle.checkbox}
                            color={notifications.specialOffers ? '#495e57' : undefined}
                            value={notifications.specialOffers}
                            onValueChange={toggleNotification('specialOffers')}
                        />
                        <Text style={checkboxStyle.text}>Special offers</Text>
                    </View>
                    <View style={checkboxStyle.switch}>
                        <Checkbox
                            style={checkboxStyle.checkbox}
                            color={notifications.newsletter ? '#495e57' : undefined}
                            value={notifications.newsletter}
                            onValueChange={toggleNotification('newsletter')}
                        />
                        <Text style={checkboxStyle.text}>Newsletter</Text>
                    </View>
                </View>

                {/* Logout button */}
                <View style={profileStyles.logoutButtonContainer}>
                    <Pressable 
                        style={buttonStyle.yellow}
                        onPress={logout}
                        >
                        <Text style={buttonStyle.textForYellow}>Log out</Text>
                    </Pressable>
                </View>

                {/* Discard/Save buttons */}
                <View style={profileStyles.buttonsContainer}>
                    <Pressable 
                        style={buttonStyle.white}
                        onPress={discardChanges}
                        >
                        <Text style={buttonStyle.textForWhite}>Discard changes</Text>
                    </Pressable>
                    <Pressable 
                        style={buttonStyle.green}
                        onPress={saveChanges}
                        >
                        <Text style={buttonStyle.textForGreen}>Save changes</Text>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
      );
}