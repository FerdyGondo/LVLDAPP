/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://cqs8qte2.api.sanity.io/v1/graphql/staging/default',
    cache: new InMemoryCache()
  });

const Root = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
  

AppRegistry.registerComponent(appName, () => Root);
