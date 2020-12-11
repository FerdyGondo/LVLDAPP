import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { StatusBar } from 'react-native'
import { 
  createStore, 
  applyMiddleware 
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import theme    from './theme';
import reducers from './reducers';
import sagas    from './sagas';
import authSagas  from './src/store/authSagas';
import {LVLD_Navigation} from './Navigation';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);    
sagaMiddleware.run(authSagas);    

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
              <LVLD_Navigation />  
      </ThemeProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
    </Provider>
  );
}
