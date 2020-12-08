import { createApolloFetch } from 'apollo-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const uri = 'https://oo3hzxedx2.execute-api.us-east-1.amazonaws.com/staging/graphql';
const apolloFetch = createApolloFetch({ uri });
const LOGIN_QUERY = `
    query login($username: String!, $password:String!){
        login(username: $username, password: $password) {
            accessToken
            refreshToken
        }
    }
`

export const graphqlApiSignIn = async (obj:Object) => {
    try{
         let res = await apolloFetch({ query : LOGIN_QUERY, 
            variables: { 
                    username    : obj.username, 
                    password    : obj.password
                }
            })
            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            } else {
                storeToken(res.data.login.accessToken);
            }
        } catch(e){
            console.log('e ', e);
        }
}

const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (err) {
        console.log("storeToken error ",err);
    }
  }