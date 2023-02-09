import { View, Text, Image } from 'react-native';
import { HeroStyle } from '../styles/HomeStyles';

const Hero = () => {
    return(
        <View style={HeroStyle.container}>
            <Text style={HeroStyle.title}>Little Lemon</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                    <Text style={HeroStyle.city}>Chicago</Text>
                    <Text style={HeroStyle.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <Image
                    style={[HeroStyle.image, {flex: 2}]}
                    source={require('../img/upperpanelimage.jpg')}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default Hero