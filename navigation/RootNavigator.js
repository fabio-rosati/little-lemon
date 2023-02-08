// import { useState, useEffect } from 'react';
import * as React from 'react';

import { Text, Image, View, TouchableOpacity } from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from '../screens/HomeScreen';

import { AuthContext } from "../contexts/AuthContext";
import { profileStyles, avatarStyle } from '../styles/ProfileStyles';
import OnboardingStyles from '../styles/OnboardingStyles';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [loginData, setLoginData] = React.useState({name: '', email: ''});
    const [userData, setUserData] = React.useState({image: '', name: '', lastName: ''});
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            // Restore token stored in `SecureStore` or any other encrypted storage
            userToken = await SecureStore.getItemAsync('userToken');
          } catch (e) {
              // Restoring token failed
              console.error(error);
          } finally {
            if (userToken != null ) {
              // User is logged in. Retrieve info to render the header.
              let storedValue = await AsyncStorage.getItem('IMAGE')
              const imageValue = storedValue != null 
                  ? JSON.parse(storedValue) 
                  : null
              storedValue = await AsyncStorage.getItem('NAME')
              const nameValue = storedValue !== null 
                  ? storedValue
                  : ''
              storedValue = await AsyncStorage.getItem('LAST-NAME')
              const lastNameValue = storedValue !== null 
                  ? storedValue
                  : ''

              setUserData({
                image: imageValue, 
                name: nameValue, 
                lastName: lastNameValue
              })
            }
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);

    const authContext = React.useMemo(
      () => ({
          loginData,
          setLoginData,
          userData,
          setUserData,

          updateUserData: async (data) => {
            setUserData(data);
          },
          signIn: async (data) => {
              // In a production app, we need to send some data (usually username, password) to server and get a token
              // We will also need to handle errors if sign in failed
              // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
              // In the example, we'll use a dummy token
              setLoginData(data)
              setUserData({image: '', name: data.name, lastName: ''});
              const userToken = 'dummy-auth-token'
              await SecureStore.setItemAsync('userToken', userToken);
              await AsyncStorage.setItem('NAME', data.name)
              await AsyncStorage.setItem('EMAIL', data.email)
              dispatch({ type: 'SIGN_IN', token: userToken });
          },
          signOut: async () => { 
              setLoginData({name: '', email: ''})
              setUserData({image: '', name: '', lastName: ''});
              await SecureStore.deleteItemAsync('userToken');
              dispatch({ type: 'SIGN_OUT' })
          },
          signUp: async (data) => {
              // In a production app, we need to send user data to server and get a token
              // We will also need to handle errors if sign up failed
              // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
              // In the example, we'll use a dummy token
              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
      }),
      [loginData, userData]
    );

    const HeaderTitle = () => {
      return (
          <View style={profileStyles.header}>
              <Image
                  source={require('../assets/little-lemon-logo-and-title.png')}
                  resizeMode="cover"
              />
          </View>
      )
    }

    const HeaderRight = (navigation) => {
      return(
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={[avatarStyle.container, {width: 50, height: 50}]}>
            {!userData.image && 
                <Text style={[avatarStyle.placeholder, {fontSize: 16}]}>
                  {userData.name.substr(0,1) + userData.lastName.substr(0,1)}
                </Text>
            }
            {userData.image && 
                <Image
                    style={avatarStyle.image}
                    source={{uri: userData.image}}
                    resizeMode="cover"
                />
            }
        </View>
        </TouchableOpacity>
      )
    }

    const HeaderLeft = (navigation) => {
      return(
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <View style={[avatarStyle.container, {width: 40, height: 40, padding: 10, backgroundColor: '#495e57'}]}>
            <Image
                style={avatarStyle.image}
                source={require('../assets/back-arrow.png')}
                resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading ? (
                    // We haven't finished checking for the token yet
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false
                      }}
                    >
                      <Stack.Screen name="Splash" component={SplashScreen} />
                    </Stack.Navigator>
                ) : state.userToken == null ? (
                    // No token found, user isn't signed in
                    <Stack.Navigator
                      screenOptions={() => ({
                        headerTitleAlign: 'center',
                        headerTitle: () => <HeaderTitle />,
                      })}
                    >
                      <Stack.Screen
                          name="Onboarding"
                          component={OnboardingScreen}
                          options={{
                              title: 'Sign in',
                              // When logging out, a pop animation feels intuitive
                              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                          }}
                      />
                    </Stack.Navigator>
                ) : (
                    // User is signed in
                    <Stack.Navigator
                        screenOptions={({ route, navigation }) => ({
                          // headerStyle: {
                          //   height: 50, // Specify the height of your custom header
                          // },
                          headerTitleAlign: 'center',
                          headerBackVisible: false,
                          headerTitle: () => <HeaderTitle />,
                          headerRight: () => <HeaderRight {...navigation} />,
                          headerLeft: navigation.canGoBack()
                            ? () => <HeaderLeft {...navigation} />
                            : null
                      })}
                    >
                      <Stack.Screen 
                        name="Home" 
                        component={HomeScreen}
                      />
                      <Stack.Screen 
                          name="Profile" 
                          component={ProfileScreen}
                      />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default RootNavigator;