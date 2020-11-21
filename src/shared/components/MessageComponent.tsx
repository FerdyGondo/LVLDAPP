import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileIcon from '../../../assets/svg/ProfileIcon'
import { KeyboardAvoidingView, Platform } from 'react-native'

const messages = [{userId: "rhazen", name: "Reed H.", message: "Who is ready to play?", createdAt: Date.now()},{userId: "jspaits", name: "Jason S.", message: "Been practicing all day", createdAt: Date.now()},{userId: "eumeh", name: "Ebuka U.", message: "Who is ready to play?", createdAt: Date.now()}]

const userId = "eumeh";

export default function Message() {
    const [message, setMessage] = useState('')
    const [messaged, setMessaged] = useState(messages)

    const onSubmit = () => {
        if (!message) return 
        const formData = {
            userId: "eumeh",
            name: "Ebuka U.",
            message: message,
            createdAt: Date.now()
        }
        setMessaged(messaged => ([...messaged,formData, ]))
        setMessage('')
        
    }

    const isUser = (item: {}) => {
        return item.userId === userId;
    }

    const renderMessageList = ({ item }) => {
        return (
            <MessageTextContainer>
                {!isUser(item) ? (
                    <>
                    <MessageName>{item.name}</MessageName>
                    <MessageContainer>
                            <ProfileIcon width={38} />
                            <MessageBorderContainer>
                                <MessageText>{item.message}</MessageText>
                            </MessageBorderContainer>
                    </MessageContainer>
                    </>
                ) : (
                    <PetashContainer>
                            <MessageBorderContainer isUser={isUser(item)}>
                                <MessageText isUser={isUser(item)}>{item.message}</MessageText>
                            </MessageBorderContainer>
                    </PetashContainer>
                )}
            </MessageTextContainer>

        )
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                >
                <List 
                    data={messaged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMessageList}
                />
            <BoxContainer>
                <EnterMessage placeholder={'Enter Message'} onChangeText={(text) => setMessage(text)} value={message} />
                <SendContainer onPress={() => onSubmit()}>
                    <MessageText color={'white'}>Send</MessageText>
                </SendContainer>
            </BoxContainer>
                </KeyboardAvoidingView>
           
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`
const List = styled.FlatList`
`
const MessageContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const PetashContainer = styled.View`
    align-items: flex-end;
`
const MessageTextContainer = styled.View`
    margin: 15px 25px 0px;
`
const MessageBorderContainer = styled.View`
    background-color: ${props => props.isUser ? "#000" : "#D6D6D6"};
    padding: 10px;
    margin-left: 10px;
    border-radius: 5px;
    
`
const MessageName = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 12px;
    opacity: 0.4;
    margin: 0px 55px 3px;
`
const MessageText = styled.Text`
    font-family: "Montserrat-Medium";
    font-size: 12px;
    color: ${props => props.color === "white" || props.isUser ? "#fff" : "#000"}
`
const BoxContainer = styled.View`
    padding: 10px 20px;
    background-color: #D6D6D6;
    flex-direction: row;
    align-items: center;
`
const EnterMessage = styled.TextInput`
    background-color: #fff;
    flex: 1;
    height: 40px;
    border-radius: 20px;
    padding-left: 10px;
`
const SendContainer = styled.TouchableOpacity`
    margin-left: 15px;
    background-color: #000;
    padding: 10px 15px;
    border-radius: 20px;
`