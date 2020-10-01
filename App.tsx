import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createTopTabNavigator } from '@react-navigation/top-tabs';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Icon } from 'react-native-elements';

import theme from './theme';
import reducers from './reducers';
import sagas from './sagas';
import Home     from './Home';
import Content  from './Content';
import Entries  from './Entries';
import Feed     from './Feed';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);
const BottomTab = createBottomTabNavigator();

sagaMiddleware.run(sagas);

export default function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <BottomTab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                      let iconName;
                      // iconName = require(`./assets/icons/${route.name}.png`);
                      switch (route.name){
                        case 'home'     : iconName = require('./assets/icons/home.png');     break;
                        case "content"  : iconName = require('./assets/icons/content.png');  break;
                        case "entries"  : iconName = require('./assets/icons/entries.png');  break;
                        case "feed"     : iconName = require('./assets/icons/feed.png');     break;
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
                  })}
                  tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                  }}
                
          
          >
            <BottomTab.Screen name="home"     component={Home}    />
            <BottomTab.Screen name="content"  component={Content} />
            <BottomTab.Screen name="entries"  component={Entries} />
            <BottomTab.Screen name="feed"     component={Feed} />
          </BottomTab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
