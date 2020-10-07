import React from 'react';
import { 
  View, 
 
  Dimensions,
} from 'react-native';

import styled from 'styled-components/native'

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
  <Container>
    
    <ShadowContainer>
      <MainContainer>
        <ProfileContainer>
          <Profile source={require('../../assets/icons/profile.png')} />
          <MainText>Peter{" "}</MainText><SubText>Cho</SubText>
        </ProfileContainer>
        <MoneyContainer>
          <MoneyText>$1000</MoneyText>
          <IconContainer>
            <Icon name="plus" type={"antdesign"} size={10} />
          </IconContainer>
        </MoneyContainer>
      </MainContainer>
      </ShadowContainer>
  </Container>
)

const Text = styled.Text`
`

const Image = styled.Image``

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
const ShadowContainer = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-offset: 1px 2px;
  elevation: 20;
  padding: 1px;
  margin: 1px;
`

const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 20px;
`

const ProfileContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`

const Profile = styled.Image`
  margin-right: 10px;
  width: 30px;
  height: 30px;
`

const MoneyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 7px;
  border-radius: 20px;
`

const MoneyText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`

const IconContainer = styled.View`
  background-color: #d2a747;
  margin-left: 7px;
  width: 15px;
  height: 15px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`

const MainText = styled.Text`
  font-weight: bold;
`

const SubText = styled.Text`
  font-weight: 200;
`