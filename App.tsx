import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
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
  },[])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <LVLD_Navigation />   
      </ThemeProvider>
    </Provider>
  );
}
