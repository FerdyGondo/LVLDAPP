import { createApolloFetch } from 'apollo-fetch';

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
                let accessToken = res.data.login.accessToken;
                let refreshToken  = res.data.login.refreshToken;
            }
}