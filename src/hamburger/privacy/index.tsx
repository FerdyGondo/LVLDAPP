import React from 'react'
import styled from 'styled-components'

const data = [{name: "Privacy", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Electronic Communications", answer: `Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5. ${"\n\n"}Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.`},{name: "Your Account", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Chidren Under 18", answer: `Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5. ${"\n\n"}5.Answer to question number 5.Answer to question number 5.`}]

export default function index() {
    const renderItem = ({ item }) => {
        return (
            <RenderItem>
                <NameText>{`${item.name}:`}</NameText>
                <SubText>{item.answer}</SubText>
            </RenderItem>
        )
    }

    return (
        <Container>
            <MainContainer>
                <List 
                    data={data}
                    keyExtractor={(data, index) => index.toString()}
                    renderItem={renderItem}
                />
            </MainContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const List = styled.FlatList`
`
const MainContainer = styled.View`
    margin: 10px 22px;
`
const RenderItem = styled.View`
    margin: 10px 0px;
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 15px;
    color: #C29A41;
    text-transform: uppercase;
`
const SubText = styled.Text`
    font-size: 12px;
    color: #000000;
    font-family: "Montserrat";
`