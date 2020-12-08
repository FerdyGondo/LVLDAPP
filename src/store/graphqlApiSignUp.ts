import { createApolloFetch } from 'apollo-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const uri = 'https://oo3hzxedx2.execute-api.us-east-1.amazonaws.com/staging/graphql';
const apolloFetch = createApolloFetch({ uri });
const SIGNUP_MUTATION = `
    mutation signup($username: String!, $email: String!, $password: String!, $firstname: String, $lastname: String){
        signup(
            input: {
                username: $username
                email: $email
                password: $password
                firstname: $firstname
                lastname: $lastname
            }
        ) {
        username
        email
        firstname
        lastname
        }
    }
`

export const graphqlApiSignUp = async (obj:Object) => {
    try{
        let res =  await apolloFetch({ query : SIGNUP_MUTATION, 
            variables: { 
                    username    : obj.username, 
                    email       : obj.email, 
                    password    : obj.password,
                    firstname   : obj.firstname, 
                    lastname    : obj.lastname, 
                }
            })
            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            } else {
                storeItem('username', res.data.signup.username);
                storeItem('email', res.data.signup.email);
                storeItem('firstname', res.data.signup.firstname);
                storeItem('lastname', res.data.signup.lastname);
            }
        } catch(e){
            console.log('e ', e);
        }
}

const storeItem = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item)
    } catch (err) {
        console.log("storeItem error ",err);
    }
  }