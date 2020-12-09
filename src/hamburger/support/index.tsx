import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileComponent from '../../shared/components/Profile'
import Logo from '../../../assets/svg/LvldLogo'
import AttatchmentIcon from '../../../assets/svg/AttatchmentIcon'
import {Platform} from 'react-native'

export default function index() {
    const [focus1, setFocus1] = useState(false)
    const [name, setName] = useState('')
    return (
        <Container>
            <Profile>
                <ProfileComponent />
            </Profile>
            <MainContainer>
                {
                    !focus1 && (
                        <>
                        <Logo width={100} />
                        <MainText>Contact Support</MainText>
                        <SubText>Please provide a detailed message.</SubText>
                        </>
                    )
                }
                <TextContainer focus1={focus1}>
                    <UpperContainer>
                        <UpperText>New Message</UpperText>
                        <SendContainer>
                            <AttatchmentContainer>
                                <AttatchmentIcon width={30} />
                            </AttatchmentContainer>
                            <SendText>Send</SendText>
                        </SendContainer>
                    </UpperContainer>
                    <InputContainer os={Platform.OS}>
                        <PlaceHolderInput placeholder={"Type your message here"} focus={focus1} onFocus={() => setFocus1(true)} onBlur={() => setFocus1(false)} placeholderTextColor={'#979797'} value={name} onChangeText={(text) => setName(text)} returnKeyType={"next"} multiline={true} maxLength={500} />
                    </InputContainer>
                </TextContainer>
            </MainContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Profile = styled.View`
  border-color: #979797;
  border-bottom-width: 1px;
`
const MainContainer = styled.View`
    background-color: #000000;
    flex: 1;
    padding: 20px;
    align-items: center;
    padding-bottom: 0px;
`
const MainText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    color: #ffffff;
    line-height: 27px;
    font-size: 22px;
    margin-top: 20px;
`
const SubText = styled.Text`
    font-family: "Montserrat";
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-top: 10px;
    font-weight: 400;
`
const TextContainer = styled.View`
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: ${props => props.focus1 ? '0px' : '15px'};
    flex: 1;
    width: 100%;
`
const UpperContainer = styled.View`
    flex-direction: row;
    border-color: #979797;
    border-bottom-width: 1px;
    padding: 12px 20px 8px;
    justify-content: space-between;
`
const UpperText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 18px;
    line-height: 21.94px;
    color: #000000;
`
const SendText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 15px;
    line-height: 18.29px;
    color: #C29A41;
`
const SendContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const AttatchmentContainer = styled.View`
    margin-right: 20px;
`
const PlaceHolderInput = styled.TextInput`
    padding-left: 5.7%;
    padding-right: 5.7%;
    font-size: 14px;
    font-family: "Montserrat";
    color: #000000;
`
const InputContainer = styled.View`
    margin-top: ${props => props.os === 'android' ? '0px' : '10px'}
`