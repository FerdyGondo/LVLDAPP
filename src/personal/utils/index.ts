import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../../shared/utils';

const uri = 'https://8rm8mi4ief.execute-api.ca-central-1.amazonaws.com/dev/graphql';
const apolloFetch = createApolloFetch({ uri });

const UPDATEUSER_MUTATION = `
    mutation updateUser($newPassword: String, $oldPassword: String, $username: String, $firstname: String, $lastname: String){
        updateUser(
            input: {
                newPassword: $newPassword
                oldPassword: $oldPassword
                username: $username
                firstname: $firstname
                lastname: $lastname
            }
        ) {
            message
        }
    }
`

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
        let res =  await apolloFetch({ query : UPDATEUSER_MUTATION, 
            variables: { 
                    newPassword : newPassword, 
                    oldPassword : oldPassword, 
                    username    : currentUsername,
                    email       : email, 
                    firstname   : firstname, 
                    lastname    : lastname, 
                }
            })
            console.log('res ',res);
            if(res.errors){
                let err = res.errors[0].message;
                throw (err);
            }
    } catch (e) {
        console.log('err ', e);
    }
}