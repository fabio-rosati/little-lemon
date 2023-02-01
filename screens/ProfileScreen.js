import * as React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome</Text>
            <Image
                style={styles.image}
                source={require('../assets/little-lemon-logo-and-title.png')}
                resizeMode="cover"
                accessible={true}
                accessibilityLabel={'Little Lemon Logo'}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dee3e9',
        justifyContent: 'center', // Vertical
        alignItems: 'center', // Horizontal
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
});