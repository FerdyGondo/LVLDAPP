import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
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
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <LVLD_Navigation />   
      </ThemeProvider>
    </Provider>
  );
}
