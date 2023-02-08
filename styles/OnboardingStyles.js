import { StyleSheet } from 'react-native';

const OnboardingStyles = StyleSheet.create({
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

export default OnboardingStyles;