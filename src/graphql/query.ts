import { useQuery, gql } from '@apollo/client'


const GET_ALL_CONTESTS = gql`
    query {
        allContest {
            name
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

export {
    useQuery,
    GET_ALL_CONTESTS,
    GET_ALL_FAQ,
    GET_ALL_TERM,
    GET_ALL_PRIVACY
}