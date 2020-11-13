import React from 'react'
import styled from 'styled-components'

export default function Button({ text, onPress }) {
    return (
        <CardContainer onPress={onPress}>
            <CardText>{text}</CardText>
        </CardContainer>
    )
}

const CardContainer = styled.TouchableOpacity`
    background-color: #C29A41;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    padding: 14px;
    margin: 5px 17px;
`
const CardText = styled.Text`
    color: #fff;
    font-family: "Montserrat-Bold";
    font-size: 22px;
`