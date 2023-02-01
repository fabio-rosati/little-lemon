import * as React from "react";
import { View, Image, StyleSheet } from 'react-native';

export default function OnboardingScreen() {
  
    return (
        <View style={styles.container}>
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
});