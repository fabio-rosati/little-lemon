import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
    // Containers
    scrollView: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    header: {
        justifyContent: 'center', // Vertical
        alignItems: 'center', // Horizontal
        paddingVertical: 15,
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#344854',
    },
    avatarContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // justifyContent: 'flex-end',
        // justifyContent: 'center',
        justifyContent: 'space-between',
        // justifyContent: 'space-around',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    infoContainer: {
        flexDirection: 'column',
        // alignItems: 'stretch',
        // alignItems: 'flex-start',
    },
    notificationsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoutButtonContainer: {
        marginVertical: 30,
    },

    // TextInput
    textInput: {
        justifyContent: 'center',
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        fontSize: 20,
        placeholderTextColor: 'grey',
        borderRadius: 10,
        borderColor: '#344854',
        // backgroundColor: '#EDEFEE',
    },
});

const avatarStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        backgroundColor: '#62d6c4'
    },
    image: {
        // width: 100,
        // height: 100,
        width: '100%',
        height: '100%',
    },
    placeholder: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 32,
        color: '#ffffff',
    },
});

const textStyle = StyleSheet.create({
    h1: {
        alignSelf: 'flex-start',
        fontWeight: '700',
        fontSize: 18,
        color: '#344854',
        textAlign: 'center',
        marginBottom: 15,
    },
    h2: {
        alignSelf: 'flex-start',
        fontWeight: '300',
        fontSize: 12,
        color: '#344854',
        textAlign: 'center',
    },
});

const checkboxStyle = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 16,
        alignItems: 'center',
    },
    checkbox: {
        
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: '#344854',
        textAlign: 'center',
        marginStart: 10,
    },
});

const buttonStyle = StyleSheet.create({
    green: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 10,
        backgroundColor: '#495e57',
        borderRadius: 10,
        borderColor: '#495e57',
        borderWidth: 2,
    },
    textForGreen: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
    },

    white: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#495e57',
        borderWidth: 2,
    },
    textForWhite: {
        color: '#495e57',
        textAlign: 'center',
        fontSize: 18,
    },

    yellow: {
        justifyContent: 'center',
        fontSize: 22,
        padding: 10,
        backgroundColor: '#f4ce14',
        borderRadius: 10,
    },
    textForYellow: {
        fontWeight: '700',
        color: '##2f2804',
        textAlign: 'center',
        fontSize: 18,
    },
});

export { 
    profileStyles,
    avatarStyle,
    textStyle,
    checkboxStyle,
    buttonStyle
}