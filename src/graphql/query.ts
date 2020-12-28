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

export {
    GET_ALL_CONTESTS,
    useQuery,
    GET_ALL_FAQ
}