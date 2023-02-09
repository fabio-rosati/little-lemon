import { View, ScrollView, Pressable, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeStyles from '../styles/HomeStyles';
import { captFirstLetter } from '../utils';

const Filters = ({ onChange, selections, sections }) => {
    return(
        <View style={HomeStyles.container.filters}>
            <Text style={HomeStyles.text.filterTitle}>ORDER FOR DELIVERY!</Text>
            <ScrollView 
                style={{paddingTop: 15}}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                >

                {sections.map((section, index) => (
                    <TouchableOpacity key={index}
                        style={[
                            HomeStyles.button.filter, 
                            selections[index] && HomeStyles.button.selected,
                            {flex: 1 / sections.length}
                        ]}
                        onPress={() => { onChange(index) }}
                        >
                        <View>
                            <Text style={[
                                HomeStyles.text.filter,
                                selections[index] && HomeStyles.text.selected
                            ]}>{captFirstLetter(section)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    filtersContainer: {
      backgroundColor: 'green',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
  });

export default Filters