/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

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
