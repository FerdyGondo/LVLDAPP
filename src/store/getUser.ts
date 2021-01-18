import Config from 'react-native-config'
import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../shared/utils';
import { GET_USER_QUERY } from '../graphql/query'

const uri = Config.APOLLO_GRAPHQL_URI;
const apolloFetch = createApolloFetch({ uri });

export const getUser = async () => {
    const token = await getAuthData('token');
    const email =  await getAuthData('email');
    apolloFetch.use(({ request, options }, next) => {
        options.headers = {
          "Authorization": token
        };
        next();
      });
    try{
        let res =  await apolloFetch({ query : GET_USER_QUERY, 
            variables: { 
                    email : email, 
                }
            })
            return res.data.user;

            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            }
    } catch (err) {
        console.log('getUser err ',err);
    }
}