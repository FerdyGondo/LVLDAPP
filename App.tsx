import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native'
import { 
  createStore, 
  applyMiddleware 
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import theme    from './theme';
import reducers from './reducers';
import sagas    from './sagas';
import {LVLD_Navigation} from './Navigation';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);    

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission()
  },[])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    remoteMessage()
  },[])

  async function remoteMessage () {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    })
    return unsubscribe;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <LVLD_Navigation />   
      </ThemeProvider>
    </Provider>
  );
}
