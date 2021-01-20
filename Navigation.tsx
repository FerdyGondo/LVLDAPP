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
  return( 
    <Stack.Navigator  
      initialRouteName="home" 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
          height: Platform.OS === 'ios' ? height * 0.139 : height * 0.11
        }
      }}
  >
    <Stack.Screen name = "home"    component = {Home} 
        options={({ route, navigation }) => ({ 
          headerTitle: props => <CenterButtonComponent>{<CenterLogo navigation={navigation} />}</CenterButtonComponent>,
          headerLeft: () => (
            <LeftButton>
              {<NotificationIcon  width={20} />}
            </LeftButton>
          ),
          headerRight: () => (
            <RightButton onPress={() => route.name === "Hamburger" ? navigation.goBack() : navigation.navigate("Hamburger")}>
              <MenuIcon width={25} />
            </RightButton>
          )
          })}
      />
    <Stack.Screen 
      name = "Account" 
      component = {Account} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent>{<CenterLogo navigation={navigation} />}</CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })} />
      <Stack.Screen 
        name = "Hamburger" 
        component = {Hamburger} 
        options={({ route, navigation }) => ({ 
          headerTitle: props => <CenterButtonComponent>{<CenterLogo navigation={navigation} />}</CenterButtonComponent>,
          headerLeft: () => <LeftButton>{<NotificationIcon  width={20} />}</LeftButton>,
          headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
        })} 
      />
    <Stack.Screen 
      name = "Sneaker" 
      component = {Sneaker} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'select size'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name = "Context" 
      component = {Context} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'live contests'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
      />
    <Stack.Screen 
      name= "Confirmation" 
      component={Confirmation} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'enter contest'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Lobby" 
      component={Lobby} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'lobby'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Placeholder" 
      component={Placeholder} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Placeholder'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "LeaderBoard" 
      component={LeaderBoard} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'LeaderBoard'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "BuyCredit" 
      component={Fund} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Buy Game Credits'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Bank" 
      component={Bank} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Online Banking'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Credit" 
      component={Credit} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Credit Card'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Settings" 
      component={Settings} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Account Settings'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Verification" 
      component={Verification} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Two-Step Verification'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "UpdatePassword" 
      component={UpdatePassword} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Update Passowrd'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Personal" 
      component={Personal} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Personal'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "History" 
      component={History} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'History'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Tutorial" 
      component={Tutorial} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Tutorial'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Faq" 
      component={Faq} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Faq'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Rules" 
      component={Rules} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Rules'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Terms_of_Use" 
      component={TermsOfUse} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Terms of Use'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Privacy" 
      component={Privacy} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Privacy Policy'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Invite" 
      component={Invite} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Invite Friends'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    /> 
    <Stack.Screen 
      name= "Referrals" 
      component={Referrals} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Referrals'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "Support" 
      component={Support} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Support'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
    <Stack.Screen 
      name= "ContestTutorial" 
      component={ContestTutorial} 
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'How It Works'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
  </Stack.Navigator> )
}

const ContentStackNavigator = ({navigation}) => {
  return( 
    <Stack.Navigator  
      initialRouteName="content" 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
          height: Platform.OS === 'ios' ? height * 0.139 : height * 0.11
        }
      }}>
      <Stack.Screen 
        name = "content"    
        component = {Content}  
        options={({ route, navigation }) => ({ 
          headerTitle: props => <CenterButtonComponent><CenterButton text={'Content'} /></CenterButtonComponent>,
          headerLeft: () => <LeftButtonComponent navigation={navigation} />,
          headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
        })}
      />
      <Stack.Screen 
      name = "Video"    
      component = {Video}  
      options={({ route, navigation }) => ({ 
          headerTitle: props => <CenterButtonComponent><CenterButton text={'Video'} /></CenterButtonComponent>,
          headerLeft: () => <LeftButtonComponent navigation={navigation} />,
          headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
        })}
      />
    </Stack.Navigator> )
}
const EntriesStackNavigator = ({navigation}) => {
  return( 
    <Stack.Navigator  
      initialRouteName="entries" 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
          height: Platform.OS === 'ios' ? height * 0.139 : height * 0.11
        }
      }}
    >
    <Stack.Screen 
      name = "Entries"    
      component = {Entries}  
      options={({ route, navigation }) => ({ 
        headerTitle: props => <CenterButtonComponent><CenterButton text={'Entries'} /></CenterButtonComponent>,
        headerLeft: () => <LeftButtonComponent navigation={navigation} />,
        headerRight: () => <HamburgerComponent route={route} navigation={navigation} />
      })}
    />
  </Stack.Navigator> )
}

    const LeftButtonComponent = (props) => {
      return (
          <LeftButton>
            {<BackButton onPress={() => props.navigation.goBack()} />}
          </LeftButton>
      )
    }

    const HamburgerComponent = (props) => {
      return (
        <RightButton onPress={() => props.route.name === "Hamburger" ? props.navigation.goBack() : props.navigation.navigate("Hamburger")}>
          <MenuIcon width={25} />
        </RightButton>
      )
    }

    const CenterLogo = (props) => {
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
    top: 8px;
`
const RightButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    top: 8px;
`
const CenterButtonComponent = styled.View`
  margin-top: -5px;
  align-self: center;
`
