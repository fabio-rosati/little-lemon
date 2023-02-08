import * as React from 'react';
import { View, ScrollView, SafeAreaView, Text, Image, Pressable, FlatList, ActivityIndicator } from 'react-native';
import CachedImage from 'expo-cached-image';
import uuid from 'react-native-uuid';

import HomeStyles from '../styles/HomeStyles';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../database/database';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

// const MenuItemComponent = (item) => {
//     return (
//         <View style={{flexDirection: 'row'}}>
//             <View style={{flex: 4, marginEnd: 15}}>
//                 <Text style={HomeStyles.text.dishName}>{item.name}</Text>
//                 <Text style={HomeStyles.text.dishDescription} numberOfLines={2}>{item.description}</Text>
//                 <Text style={HomeStyles.text.dishPrice}>{item.price}</Text>
//             </View>
//             <Image
//                 style={HomeStyles.image.dish}
//                 source={item.image}
//                 resizeMode='contain'
//             />
//         </View>
//     )
// }

const HomeScreen = ({ navigation }) => {
    const [menu, setMenu] = React.useState([]);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                // Get the menu from the db
                await createTable();
                let menuItems = await getMenuItems();

                // If the db is empty...
                if (!menuItems.length) {
                    // ...fetch data from remote...
                    menuItems = await fetchMenu()
                    // ...and save it to db.
                    saveMenuItems(menuItems);
                }

                // Update menu state
                setMenu(menuItems)
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        bootstrapAsync();
    }, []);

    const fetchMenu = async() => {      
        // {
        //     "menu": [
        //       {
        //         "name": "Greek Salad",
        //         "price": 12.99,
        //         "description": "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.",
        //         "image": "greekSalad.jpg",
        //         "category": "starters"
        //       },
        try {
          const response = await fetch(API_URL);
          const json = await response.json();
          return json.menu.map(item => ({
              ...item,
              id: uuid.v4()
            }))
        } catch (error) {
          console.error(error);
          return [];
        }
      }

    const Header = () => {
        return(
            <View style={HomeStyles.container.header}>
                <Text style={HomeStyles.text.title}>Little Lemon</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <Text style={HomeStyles.text.city}>Chicago</Text>
                        <Text style={HomeStyles.text.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                        <Image
                            style={HomeStyles.image.search}
                            source={require('../assets/search.png')}
                            resizeMode='contain'
                        />
                    </View>
                    <Image
                        style={HomeStyles.image.header}
                        source={require('../img/upperpanelimage.jpg')}
                        resizeMode='contain'
                    />
                </View>
            </View>
        )
    }

    const Filters = () => {
        return(
            <View style={HomeStyles.container.filters}>
                <Text style={HomeStyles.text.filterTitle}>ORDER FOR DELIVERY!</Text>
                <ScrollView 
                    style={{paddingTop: 15}}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                    <Pressable 
                        style={HomeStyles.button.filter}
                        // onPress={}
                        >
                        <Text style={HomeStyles.text.filter}>Starters</Text>
                    </Pressable>
                    <Pressable 
                        style={HomeStyles.button.filter}
                        // onPress={}
                        >
                        <Text style={HomeStyles.text.filter}>Mains</Text>
                    </Pressable>
                    <Pressable 
                        style={HomeStyles.button.filter}
                        // onPress={}
                        >
                        <Text style={HomeStyles.text.filter}>Desserts</Text>
                    </Pressable>
                    <Pressable 
                        style={HomeStyles.button.filter}
                        // onPress={}
                        >
                        <Text style={HomeStyles.text.filter}>Drinks</Text>
                    </Pressable>
                </ScrollView>
            </View>
        )
    }

    const renderMenuItem = ({ item }) => (
        <View style={{flexDirection: 'row', padding: 15}}>
            <View style={{flex: 4, marginEnd: 15}}>
                <Text style={HomeStyles.text.dishName}>{item.name}</Text>
                <Text style={HomeStyles.text.dishDescription} numberOfLines={2}>{item.description}</Text>
                <Text style={HomeStyles.text.dishPrice}>{'$' + item.price}</Text>
            </View>
            <CachedImage
                source={{ 
                    uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`, // (required) -- URI of the image to be cached
                    // headers: `Authorization: Bearer ${token}`, // (optional)            
                    // expiresIn: 2_628_288, // 1 month in seconds (optional), if not set -- will never expire and will be managed by the OS
                }}
                cacheKey={`${item.id}-thumb`} // (required) -- key to store image locally
                placeholderContent={( // (optional) -- shows while the image is loading
                    <ActivityIndicator // can be any react-native tag
                        color={
                            'grey'
                        }
                        size="small"
                        style={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                        />
                )} 
                resizeMode="cover" // pass-through to <Image /> tag 
                style={              // pass-through to <Image /> tag 
                    HomeStyles.image.dish
                }
            />
        </View>
    );

    const Seperator = () => {
        return (
            <View style={{
                marginHorizontal: 15,
                height: 1,
                backgroundColor: '#eff0f0'}} />
        )
    }

    return (
        <SafeAreaView  style={HomeStyles.container.screen}>
                {/* <MenuItemComponent
                    name={'Greek Salad'}
                    description={'The famous greek salad of crispy lettuce, peppers, olives and our Chicago sauce'}
                    price={'$12.99'}
                    image={require('../assets/search.png')}
                /> */}

                <FlatList
                    ListHeaderComponent={
                        <>
                        <Header />
                        <Filters />
                        <View style={{height: 2, backgroundColor: '#cccccc', marginHorizontal: 15}} />
                        </>
                    }
                    data={menu}
                    renderItem={renderMenuItem}
                    ItemSeparatorComponent={Seperator}
                    keyExtractor={item => item.name}
                />

        </SafeAreaView >
    );
};

export default HomeScreen;