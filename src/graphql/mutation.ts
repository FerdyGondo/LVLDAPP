const SEND_MESSAGE_MUTATION = `
    mutation support($text: String!, $attachment: String){
        support(
                input: {
                text: $text,
                attachment: $attachment
            }
        ) {
            message
        }
    }
`
const JOIN_CONTEST_MUTATION = `
    mutation joinContest($id: String!, $totalCredits: Int!) {
        joinContest(input: {
            id: $id,
            totalCredits: $totalCredits
        }){
            message
        }
    }
`
export  {
    SEND_MESSAGE_MUTATION,
    JOIN_CONTEST_MUTATION
}