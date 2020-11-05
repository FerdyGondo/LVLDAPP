import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function index() {
    const [userName, setName] = useState("")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputComplete, setInputComplete] = useState(false)

    useEffect(() => {
        if (userName !== "" && firstName !== '' && lastName !== '' && email !== '' && password !== '') {
            setInputComplete(true)
        } else {
            setInputComplete(false)
        }
    },[userName, firstName, lastName, email, password])
    

    return (
        <Container>
            <MainContainer>
                <TopContainer>
                    <BoldText>17,000</BoldText>
                    <Bottom>LVLD POINTS</Bottom>
                </TopContainer>
                <ProfileContainer>
                    <ProfileIcon width={70} />
                    <MainText>Peter{" "}<SubText>Cho</SubText></MainText>
                </ProfileContainer>
                <BottomContainer>
                    <BoldText>$1,000</BoldText>
                    <Bottom>BALANCE</Bottom>
                </BottomContainer>
            </MainContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                >
            <Scroll>
                <BodyContainer>
                    <UploadText>Upload a Profile Picture</UploadText>
                    <CardContainer>
                        <CardText>Choose Image</CardText>
                    </CardContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Username</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Username"} value={userName} onChangeText={(text) => setName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>First Name</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"First Name"} value={firstName} onChangeText={(text) => setFirstName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Last Name</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Last Name"} value={lastName} onChangeText={(text) => setLastName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Email</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Email"} value={email} onChangeText={(text) => setEmail(text)}  keyboardType={"email-address"} />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Confirm Password</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Password"} value={password} onChangeText={(text) => setPassword(text)}  secureTextEntry={true} />
                        </PlaceHolderContainer>
                    <FooterContainer>
                        <FooterMainText>Forgot your password?</FooterMainText>
                        <FooterSubText>Click here to reset it.</FooterSubText>
                        <FooterMainText>Don't have access to your email account?</FooterMainText>
                        <FooterSubText>Contact Customer Support.</FooterSubText>
                    </FooterContainer>
                    <CardContainer inputComplete={inputComplete} bigger>
                        <CardText>Save Changes</CardText>
                    </CardContainer>
                </BodyContainer>
            </Scroll>
            </KeyboardAvoidingView>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
`
const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 15px;
  justify-content: space-between;
`
const TopContainer = styled.View`
`
const BottomContainer = styled.View`
  align-items: flex-end;
`
const BoldText = styled.Text`
  font-size: 11px;
  font-weight: bold;
`
const Bottom = styled.Text`
  font-weight: 400;
  font-size: 11px;
`
const ProfileContainer = styled.View`
`
const MainText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`
const SubText = styled.Text`
  font-weight: 200;
`
const BodyContainer = styled.View`
    margin: 5px 17px;
`
const UploadText = styled.Text`
    margin-left: 15px;
    font-family: "Montserrat"
`
const CardContainer = styled.TouchableOpacity`
    background-color: ${props => props.inputComplete ? "#C29A41" : "#979797" };
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    padding: ${props => props.bigger ? '16px' : '8px'};
    margin: 5px 0px;
`
const CardText = styled.Text`
    color: #fff;
    font-family: "Montserrat-Bold";
    font-size: 20px;
`
const PlaceHolderContainer = styled.View`
    margin: 5px 0px;
`
const PlaceHolderHalfContainer = styled.View`
    width: 48%;
    margin: 10px 0px;
`
const PlaceHolderText = styled.Text`
    font-family: "Montserrat";
    color: #000000;
    left: 3.7%;
    margin-bottom: 3px;
`
const PlaceHolderInput = styled.TextInput`
    border-radius: 25px;
    background-color: #ffffff;
    border-color: ${props => props.color ? "#D2A747" : "#979797"};
    padding: ${props => props.os === 'android' ? '5px' : '10px'};
    border-width: 1px;
    padding-left: 3.7%;
    font-size: 12px;
`
const Scroll = styled.ScrollView`
`
const FooterContainer = styled.View`
    margin: 0px 15px 10px;
`
const FooterMainText = styled.Text`
    font-family: "Montserrat";
    font-size: 10px;
    margin-top: 10px;
`
const FooterSubText = styled.Text`
    text-decoration-line: underline;
    color: #00AADE;
    font-family: "Montserrat";
    font-size: 10px;
`