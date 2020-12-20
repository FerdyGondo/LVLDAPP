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

export {
    GET_ALL_CONTESTS,
    useQuery
}