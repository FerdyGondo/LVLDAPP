import React from 'react'
import { View, Text, Platform } from 'react-native'
import styled from 'styled-components'

export default function SecondChance() {
    return (
        <Container>
            <Title>Second Chance</Title>
            <SubTitle>Free Contest</SubTitle>
            <ImageContainer os={Platform.OS}>
                <Image source={require('../../../assets/images/shoes/sneakers.png')} />
            </ImageContainer>
            <ContextTitle>You Didn't Win...</ContextTitle>
            <MiddleText>But don't worry we got you!</MiddleText>
            <MiddleText>Enter now to participate in the</MiddleText>
            <MiddleText>2nd Chance contest later today.</MiddleText>
            <QuantityContainer>
                <BottomText>Enter Now</BottomText>
            </QuantityContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 30px;
`
const Title = styled.Text`
    font-family: "Montserrat-ExtraBold";
    color: #d2a747;
    font-size: 42px;
`
const SubTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 24px;
`
const Image = styled.Image`
    align-self: center;
`
const ImageContainer = styled.View`
    background-color: #fff;
    margin: 30px 0px 110px;
    margin-bottom: ${props => props.os === 'android' ? '60px' : '110px'}
`
const ContextTitle = styled.Text`
    font-family: "Montserrat-ExtraBold";
    font-size: 32px;
    text-align: center;
`
const MiddleText = styled.Text`
    font-family: "Montserrat";
    font-size: 22px;
    text-align: center;
    opacity: 0.7;
`
const QuantityContainer = styled.TouchableOpacity`
    background-color: #d2a747;
    border-radius: 20px;
    padding: 15px;
    align-items: center;
    justify-content: space-around;
    margin-top: 25px;
`
const BottomText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #fff;
    font-size: 13px;
`
