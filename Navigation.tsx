import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { 
  Alert,
  Text, 
  View, 
  Image,
  TouchableOpacity,
  SafeAreaView, 
  Dimensions,
  useWindowDimensions,
  StatusBar,
  Platform
} from 'react-native';
import styled from 'styled-components';
import { 
  NavigationContainer, 
  DrawerActions
}      from '@react-navigation/native';
const {width,height} = Dimensions.get("window")
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { 
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

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
import Privacy from './src/hamburger/privacy'
import Faq from './src/hamburger/faq'
import Rules from './src/hamburger/rules'
import Support from './src/hamburger/support'
import Invite from './src/invite'
import Referrals from './src/referrals'
import {signOutAction} from './src/store/authActions';
import ContestTutorial from './src/hamburger/tutorial/contest'

const Stack     = createStackNavigator();
const Drawer    = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export const LVLD_Navigation = ({navigation}) => {
  return(
    <NavigationContainer>
      <AuthStackNavigator/>
    </NavigationContainer>
    )
}

const AuthStackNavigator = () => {
  return( <Stack.Navigator screenOptions={{ headerShown: false}} >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name ="drawer" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator> 
          )
        }

const DrawerNavigator = ({navigation}) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (      
      <Drawer.Navigator 
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerPosition={"right"}
          drawerType={'front'}
          headerShown={true}
          hideStatusBar={false}
          overlayColor={0}
          drawerStyle={{
            width: window.width,
            marginTop: Platform.OS === 'android' ? insets.top+80 : insets.top+80,
            marginBottom: Platform.OS === 'android' ? window.height/14 : window.height/11,
          }}
      >
        <Drawer.Screen name="bottomTabNavigator"    component={BottomTabNavigator} />
      </Drawer.Navigator>
    )
}

const BottomTabNavigator = ({navigation}) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return(
      <BottomTab.Navigator
              initialRouteName="home"
              screenOptions={ ({ route }) => ({
                  tabBarIcon : ({ focused, color }) => {
                    let iconName;
                    switch (route.name){
                      case 'home'     : iconName = require('./assets/icons/home.png');     break;
                      case "content"  : iconName = require('./assets/icons/content.png');  break;
                      case "entries"  : iconName = require('./assets/icons/entries.png');  break;
                    }
                    return <TabImage source={ iconName } colorProps={color} />
                    },
                  tabBarLabel : () => {
                        let tabLabel;
                        switch (route.name){
                          case 'home'     : tabLabel = 'Home';     break;
                          case "content"  : tabLabel = 'Content';  break;
                          case "entries"  : tabLabel = 'Entries';  break;
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
        <BottomTab.Screen name="home"     component={HomeStackNavigator}  />
        <BottomTab.Screen name="content"  component={ContentStackNavigator} />
        <BottomTab.Screen name="entries"  component={Entries} />
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
              <Stack.Screen name= "AddFund" component={Fund} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                props={navigation} 
                leftProps={<BackButton onPress={() => navigation.navigation.goBack()} />} 
                centerProps={<CenterButton text={'Add Funds'} />}
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

    const OpenCLoseDrawer = (props) => {
          return <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer()) } >
                    <MenuIcon width={25} />
                  </TouchableOpacity>
        }

    const centerLogo = (props) => {
      return <TouchableOpacity onPress={ () => props.navigation.navigate("home") } >
                <LvldLogo />
             </TouchableOpacity>
    }
    
    const LVLD_Header = ({props, leftProps, centerProps}) => { 
      const insets = useSafeAreaInsets();
      return(
      <SafeAreaViewStyled statusBarProps = { Platform.OS === "android" ? StatusBar.currentHeight+'px' : 0 } >
        <Header 
            statusBarProps={{ barStyle: 'light-content' }}
              leftComponent={leftProps}
              centerComponent={centerProps}
              rightComponent={ OpenCLoseDrawer(props) }
              containerStyle={{
                backgroundColor: '#262626',
                borderBottomWidth:1,
                borderBottomColor:'#262626',
                justifyContent: 'space-around',
                marginTop:-10,
                marginLeft: 12,
                marginRight: 15,
                paddingBottom: insets.top*0.6,
                height: 90
              }}
          />
      </SafeAreaViewStyled>
      )
    } 

    const CustomDrawerContent = (props) => { 
      const signOutDispatch = useDispatch();
      const insetsProp = useSafeAreaInsets();
      return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1, justifyContent:"space-between"}} {...props}>
          <SafeAreaViewDrawer os={Platform.OS} insetsProp={insetsProp}>
            <TouchableOpacity  onPress={ () => { props.navigation.navigate('Support')}} >
                <DrawerItemStyle><DrawerTextStyle>Support</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => props.navigation.navigate("Tutorial")} >
                <DrawerItemStyle><DrawerTextStyle>Tutorials</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { props.navigation.navigate("Rules")}} >
                <DrawerItemStyle><DrawerTextStyle>Rules and Gameplays</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { props.navigation.navigate("Faq")}} >
                <DrawerItemStyle><DrawerTextStyle>FAQ</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>            
            <TouchableOpacity  onPress={ () => { props.navigation.navigate("Privacy")}} >
                <DrawerItemStyle><DrawerTextStyle>Term of Use</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Privacy Policy</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <DrawerLocationViewStyle>
                <DrawerItemStyle><DrawerTextStyle>Current Location</DrawerTextStyle><DrawerLocationTextStyle>CA, US</DrawerLocationTextStyle></DrawerItemStyle>
            </DrawerLocationViewStyle>
            <TouchableOpacity  onPress={ () => Alert.alert(
                                    "LVLD", "Are you sure you want to sign out from LVLD",
                                    [ { text: "Sign Out", onPress: () => {
                                              signOutDispatch(signOutAction());
                                              props.navigation.navigate("Welcome");
                                           }
                                        },
                                      { text: "Cancel", style: "cancel" } ],
                                    { cancelable: false } ) } >
                <DrawerItemStyle><DrawerTextStyle>Sign Out</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
          </SafeAreaViewDrawer>
            <BottomView os={Platform.OS} insetsProp={insetsProp}>
                <DrawerTextStyle>App Version 1.00.22</DrawerTextStyle>
            </BottomView> 
        </DrawerContentScrollView>
      );
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
const SafeAreaViewStyled = styled.SafeAreaView`
background-color: #262626;
padding-top: ${props => props.statusBarProps};
`
const SafeAreaViewDrawer = styled.SafeAreaView`
  margin-top: ${props => props.os === 'android' ? -(props.insetsProp.top - 6) + 'px' : -(props.insetsProp.top - 6) + 'px'};
`
const DrawerItemStyle = styled.View`
flex-direction: row;
justify-content: space-between;
border-bottom-color: black;
border-bottom-width: 1px;
margin:10px;
padding-left: 20px;
padding-bottom: 15px;
`
const DrawerTextStyle = styled.Text`
font-family: Montserrat;
`
const DrawerLocationTextStyle = styled.Text`
font-family: Montserrat;
font-weight: bold;
color: #d2a747;
margin-bottom:8px;
`
const DrawerLocationViewStyle = styled.View`
margin-top:3px;
`
const BottomView = styled.View`
align-items: center;
margin-bottom: ${props => props.os === 'android' ? 10 + 'px' : 10 + 'px'};
`

