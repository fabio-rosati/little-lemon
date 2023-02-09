import { StyleSheet } from 'react-native';

const OnboardingStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    // header: {
    //     backgroundColor: 'white',
    //     justifyContent: 'center', // Vertical
    //     alignItems: 'center', // Horizontal
    //     paddingVertical: 10,
    // },
    body: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    // image: {
    //     // width: 200,
    //     // height: 200,
    // },
    text: {
        alignSelf: 'flex-start',
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
    button: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 5,
        backgroundColor: '#cbd2d9',
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: '#344854',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
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

export default OnboardingStyles;