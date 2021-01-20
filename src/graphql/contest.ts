import Config from 'react-native-config'
import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../shared/utils';
import { JOIN_CONTEST_MUTATION } from './mutation';
import { LIST_CONTEST_USERS } from './query'

const uri = Config.APOLLO_GRAPHQL_URI;
const apolloFetch = createApolloFetch({ uri });

export const joinContest = async (_id, totalCredits) => {
    const token = await getAuthData('token');
    apolloFetch.use(({ request, options }, next) => {
        options.headers = {
            'Authorization': token
        }
        next()
    })
    try {
        let res =  await apolloFetch({ query : JOIN_CONTEST_MUTATION, 
            variables: { 
                    id: _id,
                    totalCredits: totalCredits
                }
            })
        return res
    } catch (err) {

    }
}

export const getContestUsers = async (_id) => {
    const token = await getAuthData('token');
            apolloFetch.use(({ request, options }, next) => {
                options.headers = {
                    'Authorization': token
                }
                next()
            })
    try {
        let res =  await apolloFetch({ query : LIST_CONTEST_USERS, 
            variables: { 
                    id: _id,
                }
            })
            return res.data.listContestUsers
    } catch (err) {

    }
}