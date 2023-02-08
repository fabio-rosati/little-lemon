import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        screen: {
            backgroundColor: 'white',
            flex: 1,
        },
        header: {
            backgroundColor: '#495e57',
            padding: 15,
        },
        filters: {
            paddingVertical: 30,
            paddingHorizontal: 15,
        },
    },
    text: {
        title: {
            alignSelf: 'flex-start',
            fontWeight: '500',
            fontSize: 50,
            color: '#f4ce14',
        },
        city: {
            alignSelf: 'flex-start',
            fontWeight: '400',
            fontSize: 30,
            color: '#edefee',
        },
        description: {
            alignSelf: 'flex-start',
            fontWeight: '300',
            fontSize: 18,
            color: '#edefee',
            textAlign: 'left',
            marginTop: 20,
            marginBottom: 20,
            marginEnd: 15,
        },
        filterTitle: {
            fontWeight: '700',
            fontSize: 20,
        },
        filter: {
            color: '#495e57',
            fontWeight: '700',
            fontSize: 18,
        },
        dishName: {
            fontWeight: '600',
            fontSize: 20,
            marginBottom: 10,
        },
        dishDescription: {
            fontSize: 16,
            marginBottom: 10,
            numberOfLines: 2,
        },
        dishPrice: {
            fontWeight: '600',
            fontSize: 20,
            marginBottom: 10,
        },
        
    },
    image: {
        header: {
            flex: 2,
            width: '100%',
            height: '100%',
            aspectRatio: 1,
            borderRadius: 15,
            marginTop: 20,
        },
        search: {
            width: 60,
            height: 60,
        },
        dish: {
            flex: 2,
            width: '100%',
            height: '100%',
        },
    },
    button: {
        filter: {
            justifyContent: 'center',
            padding: 10,
            marginEnd: 25,
            backgroundColor: '#edefee',
            borderRadius: 20,
        }
    },
});

export default HomeStyles;