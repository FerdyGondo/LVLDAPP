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
export  {
    SEND_MESSAGE_MUTATION
}