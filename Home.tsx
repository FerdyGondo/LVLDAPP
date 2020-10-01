import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  Dimensions,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { Ionicons } from 'react-native-vector-icons';

import { Icon } from 'react-native-elements';
import Home from './Home';

const Tab = createBottomTabNavigator();
const window = Dimensions.get('window');

const options = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Main') {
      iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'ios-list-box' : 'ios-list';
    }

    // You can return any component that you like here!
    return <Icon name={iconName} size={size} color={color} />;
  },
});

export default () => (
  <View style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Image
                          source={ require('./assets/icons/HomeScreen.jpg') }
                          style={{
                            width: window.width,
                            height: window.height+90,
                          }}
                    />
  </View>
)
