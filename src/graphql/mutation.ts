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

const UPDATE_PIC_MUTATION = `
    mutation updateProfilePicture($image: String!){
        updateProfilePicture(
                input: {
                image: $image
            }
        ) {
            message
            url
        }
    }
`
const UPDATE_USER_MUTATION = `
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
    UPDATE_PIC_MUTATION,
    UPDATE_USER_MUTATION,
    JOIN_CONTEST_MUTATION
}