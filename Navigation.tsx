import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { 
  Alert,
  Text, 
  View, 
  Image,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  StatusBar,
  Platform
} from 'react-native';
import styled from 'styled-components';
import { 
  NavigationContainer
}      from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
const {width,height} = Dimensions.get("window")
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import deepLinking from './deepLinking';

import { Icon, Header }             from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LvldLogo from './assets/svg/LvldLogo';
import WelcomeScreen from './src/auth/welcome';
import SignInScreen  from './src/auth/signIn';
import SignUpScreen  from './src/auth/signUp';
import Home     from './src/home/index';
import Account  from './src/account/index';
import Content  from './src/content/index';
import Entries  from './src/entries/index';
import Sneaker  from './src/sneaker/index';
import Context  from './src/context/index';
import MenuIcon from './assets/svg/MenuIcon';
import NotificationIcon from './assets/svg/NotificationIcon';
import BackButton from './src/shared/components/BackButton';
import CenterButton from './src/shared/components/CenterButton';
import Confirmation from './src/confirmation'
import Lobby from './src/lobby'
import Placeholder from './src/placeholder'
import LeaderBoard from './src/leaderboard'
import Video from './src/video'
import Fund from './src/fund'
import Bank from './src/bank'
import Credit from './src/credit'
import Settings from './src/settings'
import Verification from './src/verification'
import UpdatePassword from './src/updatepassword'
import Personal from './src/personal'
import History from './src/history'
import Tutorial from './src/hamburger/tutorial'
import TermsOfUse from './src/hamburger/terms_of_use'
import Privacy from './src/hamburger/privacy'
import Faq from './src/hamburger/faq'
import Rules from './src/hamburger/rules'
import Support from './src/hamburger/support'
import Invite from './src/invite'
import Referrals from './src/referrals'
import {signOutAction} from './src/store/authActions';
import ContestTutorial from './src/hamburger/tutorial/contest'
import { geolocation } from './src/shared/geolocation';
import Hamburger from './src/hamburger'

const Stack     = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const LVLD_Navigation = ({navigation}) => {
  return(
    <NavigationContainer linking={deepLinking}>
      <AuthStackNavigator/>
    </NavigationContainer>
    )
}

const AuthStackNavigator = () => {
  return( <Stack.Navigator screenOptions={{ headerShown: false}} >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name ="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
          </Stack.Navigator> 
          )
        }

const BottomTabNavigator = ({navigation}) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return(
      <BottomTab.Navigator
              initialRouteName="HomeButton"
              screenOptions={ ({ route }) => ({
                  tabBarIcon : ({ focused, color }) => {
                    let iconName;
                    switch (route.name){
                      case 'HomeButton'     : iconName = require('./assets/icons/home.png');     break;
                      case "Content"  : iconName = require('./assets/icons/content.png');  break;
                      case "Entries"  : iconName = require('./assets/icons/entries.png');  break;
                    }
                    return <TabImage source={ iconName } colorProps={color} />
                    },
                  tabBarLabel : () => {
                        let tabLabel;
                        switch (route.name){
                          case 'HomeButton'     : tabLabel = 'Home';     break;
                          case "Content"  : tabLabel = 'Content';  break;
                          case "Entries"  : tabLabel = 'Entries';  break;
                        }
                        return <TabText>{tabLabel}</TabText> 
                    }
              }) }
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                activeBackgroundColor: '#ddd',
                inactiveBackgroundColor: '#fff',
                style: {height: Platform.OS === 'android' ? window.height/14 : window.height/11}
              }}
      >
        <BottomTab.Screen 
          name="HomeButton"     
          component={HomeStackNavigator}  
          listeners={({ navigation, route }) => ({
            tabPress: e => {
                if (route.state && route.state.routeNames.length > 0) {
                    navigation.navigate('HomeButton')
                }
            },
        })}
        />
        <BottomTab.Screen name="Content"  component={ContentStackNavigator} />
        <BottomTab.Screen name="Entries"  component={EntriesStackNavigator} />
      </BottomTab.Navigator>
  )
}

const HomeStackNavigator = ({navigation}) => {
  return( <Stack.Navigator  initialRouteName="home" >
            <Stack.Screen name = "home"    component = {Home} 
                options={{ 
                  header: (navigation) => 
                    <LVLD_Header 
                        props={navigation} 
                        leftProps={<NotificationIcon  width={20} />} 
                        centerProps={centerLogo(navigation)}
                    />
                  }}
              />
            <Stack.Screen name = "Account" component = {Account} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                    centerProps={centerLogo(navigation)}
                />
              }} />
              <Stack.Screen name = "Hamburger" component = {Hamburger} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<NotificationIcon  width={20} />} 
                    centerProps={centerLogo(navigation)}
                />
              }} />
            <Stack.Screen name = "Sneaker" component = {Sneaker} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'select size'} />}
                />
              }}/>
            <Stack.Screen name = "Context" component = {Context} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'live contests'} />}
                />
              }}/>
            <Stack.Screen name= "Confirmation" component={Confirmation} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'enter contest'} />}
                />
              }}/>
              <Stack.Screen name= "Lobby" component={Lobby} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'lobby'} />}
                />
              }}/>
              <Stack.Screen name= "Placeholder" component={Placeholder} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Placeholder'} />}
                />
              }}/>
              <Stack.Screen name= "LeaderBoard" component={LeaderBoard} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'LeaderBoard'} />}
                />
              }}/>
              <Stack.Screen name= "BuyCredit" component={Fund} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Buy Game Credits'} />}
                />
              }}/>
              <Stack.Screen name= "Bank" component={Bank} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Online Banking'} />}
                />
              }}/>
              <Stack.Screen name= "Credit" component={Credit} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Credit Card'} />}
                />
              }}/>
              <Stack.Screen name= "Settings" component={Settings} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Account Settings'} />}
                />
              }}/>
              <Stack.Screen name= "Verification" component={Verification} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Two-Step Verification'} size={14} />}
                />
              }}/>
              <Stack.Screen name= "UpdatePassword" component={UpdatePassword} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Update Password'} />}
                />
              }}/>
              <Stack.Screen name= "Personal" component={Personal} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Personal Info'} />}
                />
              }}/>
              <Stack.Screen name= "History" component={History} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Transaction History'} size={14} />}
                />
              }}/>
              <Stack.Screen name= "Tutorial" component={Tutorial} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Tutorial'} size={14} />}
                />
              }}/>
              <Stack.Screen name= "Faq" component={Faq} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'FAQ'} size={14} />}
                
                />
              }}/>
              <Stack.Screen name= "Rules" component={Rules} options={{ 
                header: (navigation) => 
                  <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'Rules and GamePlay'} size={14} />}
                  />
                }}/>
              <Stack.Screen name= "Terms_of_Use" component={TermsOfUse} options={{ 
                header: (navigation) => 
                  <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'Terms of Use'} size={14} />}
                  />
                }}/>
              <Stack.Screen name= "Privacy" component={Privacy} options={{ 
                header: (navigation) => 
                  <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'Privacy Policy'} size={14} />}
                  />
                }}/>
                <Stack.Screen name= "Invite" component={Invite} options={{ 
                header: (navigation) => 
                  <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'Invite Friends'} size={14} />}
                  />
                }}/> 
                <Stack.Screen name= "Referrals" component={Referrals} options={{ 
                header: (navigation) => 
                  <LVLD_Header 
                  props={navigation} 
                  leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                  centerProps={<CenterButton text={'Refferals'} size={14} />}
                  />
                }}/>
                <Stack.Screen name= "Support" component={Support} options={{
                  header: (navigation) => 
                    <LVLD_Header 
                    props={navigation} 
                    leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                    centerProps={<CenterButton text={'Support'} size={14} />}
                    />
                }}/>
                <Stack.Screen name= "ContestTutorial" component={ContestTutorial} options={{
                  header: (navigation) => 
                    <LVLD_Header 
                    props={navigation} 
                    leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                    centerProps={<CenterButton text={'How It Works'} size={14} />}
                    />
                }}/>
          </Stack.Navigator> )
}

const ContentStackNavigator = ({navigation}) => {
  return( <Stack.Navigator  initialRouteName="content" >
            <Stack.Screen name = "content"    component = {Content}  options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<NotificationIcon  width={20} />} 
                    centerProps={<CenterButton text={'Content'} />}
                />
              }}/>
              <Stack.Screen name = "Video"    component = {Video}  options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                    centerProps={<CenterButton text={'Video'} />}
                />
              }}/>
          </Stack.Navigator> )
}
const EntriesStackNavigator = ({navigation}) => {
  return( <Stack.Navigator  initialRouteName="entries" >
            <Stack.Screen name = "Entries"    component = {Entries}  options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<NotificationIcon  width={20} />} 
                    centerProps={<CenterButton text={'Entries'} />}
                />
              }}/>
          </Stack.Navigator> )
}

    const centerLogo = (props) => {
      return <TouchableOpacity onPress={ () => props.navigation.navigate("home") } >
                <LvldLogo />
             </TouchableOpacity>
    }
    
    const LVLD_Header = ({props, leftProps, centerProps}) => { 
      const insets = useSafeAreaInsets();
      return(
      <SafeAreaView style={{ backgroundColor: '#262626', paddingBottom: Platform.OS === "ios" ? -50 : 0 }}>
        <NewHeader style={{ paddingBottom: insets.top*0.1 }}>
          <LeftButton>
            {leftProps}
          </LeftButton>
          <CenterButtonComponent>
            {centerProps}
          </CenterButtonComponent>
          <RightButton onPress={() => props.scene.route.name === "Hamburger" ? props.navigation.goBack() : props.navigation.navigate("Hamburger")}>
            <MenuIcon width={25} />
          </RightButton>
        </NewHeader>
      </SafeAreaView>
      )
    } 


const TabImage = styled.Image`
width: 25px;
height: 25px;
tintColor: ${props => props.colorProps};
`
const TabText = styled.Text`
font-family: Montserrat;
font-size: 10px;
`
const NewHeader = styled.View`
  background-color: #262626;
  border-bottom-width: 1px;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-color: #262626;
  align-items: flex-start;
  padding: 30px 0px 0px;
`
const LeftButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    left: 20px;
`
const RightButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`
const CenterButtonComponent = styled.View`
  margin-top: -5px;
`
