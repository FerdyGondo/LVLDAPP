import React from 'react';
import { 
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
  DrawerActions, useNavigation
}      from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Header }             from 'react-native-elements';

import LvldLogo from './assets/svg/LvldLogo';
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

const Stack     = createStackNavigator();
const Drawer    = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();


const PreStackNavigator = ({navigation}) => {
  return( <Stack.Navigator  
          >
            <Stack.Screen name = "drawer"    component = {DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator> )
}

const DrawerNavigator = ({navigation}) => {
  const window = useWindowDimensions();
  return (      
      <Drawer.Navigator 
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerPosition={"right"}
          drawerType={'front'}
          drawerStyle={{
            backgroundColor: '#fff',
            width: window.width,
            marginTop: 127,
          }}
          overlayColor={0}
      >
      <Drawer.Screen name="bottomTabNavigator"    component={BottomTabNavigator}/>
      </Drawer.Navigator>
    )
}

const BottomTabNavigator = ({navigation}) => {
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
            <Stack.Screen name = "home"    component = {Home}  options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<NotificationIcon  width={20} />} 
                    centerProps={<LvldLogo />}
                />
              }}/>
            <Stack.Screen name = "Account" component = {Account} options={{ 
              header: (navigation) => 
                <LVLD_Header 
                    props={navigation} 
                    leftProps={<NotificationIcon  width={20} />} 
                    centerProps={<LvldLogo />}
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


export const LVLD_Navigation = ({navigation}) => {
  return(
    <NavigationContainer>
      <PreStackNavigator />
    </NavigationContainer>
    )
}

const OpenCLoseDrawer = (props) => {
      return (
        <TouchableOpacity
          onPress={() => { 
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <MenuIcon width={25} />
        </TouchableOpacity>
      );
    }
    const LVLD_Header = ({props, leftProps, centerProps}) => { 
      return(
      <SafeAreaViewStyled statusBarProps = { Platform.OS === "android" ? StatusBar.currentHeight+'px' : 0 } >
        <Header 
            statusBarProps={{ barStyle: 'light-content' }}
              leftComponent={leftProps}
              centerComponent={centerProps}
              rightComponent={ OpenCLoseDrawer(props) }
              containerStyle={{
                backgroundColor: '#262626',
                justifyContent: 'space-around',
                paddingBottom: 25
              }}
          />
      </SafeAreaViewStyled>
      )
    } 

    const CustomDrawerContent = (props) => {   
      return (
        <DrawerContentScrollView {...props}>
          <SafeAreaViewDrawer>
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Support</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Tutorials</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Rules and Gameplays</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>FAQ</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Current Location</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Term of Use</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Privacy Policy</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>        
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>Sign Out</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            <TouchableOpacity  onPress={ () => { }} >
                <DrawerItemStyle><DrawerTextStyle>App Version 1.00.22</DrawerTextStyle><Icon  name="chevron-right"  size={20} /></DrawerItemStyle>
            </TouchableOpacity>
            </SafeAreaViewDrawer>
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
margin-top:-38px;
`
const DrawerItemStyle = styled.View`
padding-left: 20px;
flex-direction: row;
justify-content: space-between;
border-bottom-color: black;
border-bottom-width: 1px;
margin:10px;
padding-bottom: 20px;
`
const DrawerTextStyle = styled.Text`
font-family: Montserrat;
`
