import Config from 'react-native-config'
import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../../shared/utils';
import { UPDATE_USER_MUTATION } from '../../graphql/mutation'

const uri = Config.APOLLO_GRAPHQL_URI;
const apolloFetch = createApolloFetch({ uri });

export const saveInfo = async (username, firstname, lastname, email, newPassword) => {
    const token = await getAuthData('token');
    const oldPassword =  await getAuthData('password');
    const currentUsername =  await getAuthData('username');
    
    apolloFetch.use(({ request, options }, next) => {
        options.headers = {
          "Authorization": token
        };
        next();
      });
    let obj = new Object();
    try{
        let res =  await apolloFetch({ query : UPDATE_USER_MUTATION, 
            variables: { 
                    newPassword : newPassword, 
                    oldPassword : oldPassword, 
                    username    : currentUsername,
                    email       : email, 
                    firstname   : firstname, 
                    lastname    : lastname, 
                }
            })
            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            }
    } catch (e) {
        console.log('err ', e);
    }
}