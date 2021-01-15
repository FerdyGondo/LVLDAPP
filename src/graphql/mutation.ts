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
const START_GAME_MUTATION = `
    mutation startGame($id: ID!) {
        startGame(input: {
            id: $id
        }){
        message
        gameLink
        }
    }
`
export  {
    SEND_MESSAGE_MUTATION,
    START_GAME_MUTATION
}