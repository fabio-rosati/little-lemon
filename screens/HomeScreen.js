import * as React from 'react';
import { useUpdateEffect } from '../utils';
import { View, SafeAreaView, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import CachedImage from 'expo-cached-image';
import debounce from 'lodash.debounce';

import Hero from '../components/Hero';
import { HomeStyles, SearchBarStyle } from '../styles/HomeStyles';
import Filters from '../components/Filters';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../database/database';

const sections = ['starters', 'mains', 'desserts', 'drinks']
const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const HomeScreen = ({ navigation }) => {
    const [menu, setMenu] = React.useState([]);
    const [searchBarText, setSearchBarText] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [filterSelections, setFilterSelections] = React.useState(
      sections.map(() => false)
    );

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
            } catch (e) {
                console.error(e);
            }
        }

        bootstrapAsync();
    }, []);

    useUpdateEffect(() => {
        (async () => {
          const activeCategories = sections.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (filterSelections.every((item) => item === false)) {
              return true;
            }
            return filterSelections[i];
          });

          try {
            const menuItems = await filterByQueryAndCategories(
                query,
                activeCategories
            );

            setMenu(menuItems);
          } catch (e) {
            console.error(e);
          }
        })();
    }, [filterSelections, query]);

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
          let uuid = 1
          const response = await fetch(API_URL);
          const json =  await response.json();
          return json.menu.map(item => ({
              ...item,
              id: uuid++
            }))
        } catch (error) {
          console.error(error);
          return [];
        }
      }

    const lookup = React.useCallback((q) => {
        setQuery(q);
    }, []);
    
    const debouncedLookup = React.useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

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
                        color={'grey'}
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
            <FlatList
                ListHeaderComponent={
                    <>
                    {/* Hero */} 
                    <Hero />

                    {/* Search bar */}
                    {/* WARNING: Keep the search bar here to avoid rendering issues. Rendering it as
                    a fat arrow function would cause the keyboard to lose focus after each insertion. */}
                    <View style={[SearchBarStyle.container, {paddingTop: 0}]} >
                        <Searchbar
                            style={SearchBarStyle.searchBar}
                            placeholder="Search"
                            placeholderTextColor="black"
                            onChangeText={handleSearchChange}
                            value={searchBarText}
                            iconColor="black"
                            inputStyle={{ color: 'black' }}
                            elevation={0}
                        />
                    </View>

                    {/* Filters */}
                    <Filters
                        selections={filterSelections}
                        onChange={handleFiltersChange}
                        sections={sections}
                    />

                    {/* Separator */}
                    <View style={{height: 2, backgroundColor: '#cccccc', marginHorizontal: 15}} />
                    </>
                }
                data={menu}
                renderItem={renderMenuItem}
                ItemSeparatorComponent={Seperator}
                keyExtractor={item => item.id}
            />

        </SafeAreaView >
    );
};

export default HomeScreen;