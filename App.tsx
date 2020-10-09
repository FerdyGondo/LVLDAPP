import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Icon, Header } from 'react-native-elements';

import theme from './theme';
import reducers from './reducers';
import sagas from './sagas';
import LvldLogo from './assets/svg/LvldLogo';
import Home     from './src/home/';
import Content  from './src/content';
import Entries  from './src/entries';
import Account  from './src/account'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);
const BottomTab = createBottomTabNavigator();
const HomeStack = createStackNavigator()

function HomeComponent () {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
              <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Account" component={Account} />
    </HomeStack.Navigator>
  )
}

sagaMiddleware.run(sagas);

export default function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          // barStyle="light-content" // or directly
          leftComponent={                        
            <Image source={ require('./assets/icons/notification.png') }
                    style={{ width: 30, height: 30 }}
            />}
          centerComponent={<LvldLogo />}
          rightComponent={<Image source={ require('./assets/icons/menu.png') }
                          style={{ width: 30, height: 30 }}
          />}
          containerStyle={{
            backgroundColor: '#222',
            justifyContent: 'space-around',
            paddingBottom: 25
          }}
        />

        <NavigationContainer>
          <BottomTab.Navigator
                  // defaultNavigationOptions={({ navigation }) => ({
                  screenOptions={ ({ route }) => ({
                      tabBarIcon : ({ focused, color }) => {
                        let iconName;
                        // iconName = require(`./assets/icons/${route.name}.png`);
                        switch (route.name){
                          case 'home'     : iconName = require('./assets/icons/home.png');     break;
                          case "content"  : iconName = require('./assets/icons/content.png');  break;
                          case "entries"  : iconName = require('./assets/icons/entries.png');  break;
                        }
                        // console.log("App route.name: ", route.name, " iconName: ", iconName);
                        // You can return any component that you like here!
                        // return <Icon name={iconName} size={size} color={color} />;
                        return (
                          <Image source={ iconName }
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 40 / 2,
                                    // color: tintColor,
                                    tintColor: color,
                                  }}
                          />
                          )
                      },
                      tabBarLabel : () => {
                        let tabLabel;
                        switch (route.name){
                          case 'home'     : tabLabel = 'Home';     break;
                          case "content"  : tabLabel = 'Content';  break;
                          case "entries"  : tabLabel = 'Entries';  break;
                        }
                        return (
                            <Text style= {{ fontSize : 10 }}>{tabLabel}</Text>     
                          ) 
                      }
                  }) }
                  tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    activeBackgroundColor: '#ddd',
                    inactiveBackgroundColor: '#fff'
                  }}
                
          
          >
            <BottomTab.Screen name="home"     component={HomeComponent} />
            <BottomTab.Screen name="content"  component={Content} />
            <BottomTab.Screen name="entries"  component={Entries} />
          </BottomTab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
