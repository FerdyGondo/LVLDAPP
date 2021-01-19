import { useQuery, gql } from '@apollo/client'


const GET_ALL_CONTESTS = gql`
    query {
        allContest (where: { active: { eq: true } }){
            name
            _id
            game {
                name
            }
            startDateTime
            finishDateTime
            entryFee
            product {
            name
            mainImage {
                asset {
                url
                }
            }
            }
            variant
    }
}
`

const GET_ALL_FAQ = gql`
    query {
        allFaq {
            questions {
            question
            answerRaw
            }  
        }
    }
`
const GET_ALL_TERM = gql`
    query {
        allTerms {
            contentRaw
        }
    }
`
const GET_ALL_PRIVACY = gql`
    query {
        allPrivacy {
            contentRaw
        }
    }
`

const GET_USER_QUERY = `
    query user($email: String!){
        user(email: $email) {
            username
            email
            firstname
            lastname
            profilePicture
        }
    }
`

const LIST_CONTEST_USERS = `
    query listContestUsers($id: String!) {
        listContestUsers(id: $id) {
        username 
        profilePicture
        }
    }
`

export {
    useQuery,
    GET_ALL_CONTESTS,
    GET_ALL_FAQ,
    GET_ALL_TERM,
    GET_ALL_PRIVACY,
    GET_USER_QUERY,
    LIST_CONTEST_USERS
}