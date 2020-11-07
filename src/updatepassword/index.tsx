import React from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import Button from '../shared/components/Button'

export default function index() {
    return (
        <Container>
            <ProfileHeader>
                <ProfileComponent />
            </ProfileHeader>
            <MainTextContainer>
                <MainText>Tap on the button to start the secure process of changing your password</MainText>
                <SubText>If you're have problems changing your password, contact</SubText>
                <HighlightText>Support Team.</HighlightText>
            </MainTextContainer>
            <Button text={'Change Password'} />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding-bottom: 10px;
`
const MainTextContainer = styled.View`
    margin: 20px 30px;
    padding-right: 30px;
    flex: 1;
`
const MainText = styled.Text`
    font-family: "Montserrat";
    font-size: 20px;
    color: #000000;
    margin-bottom: 20px;
    line-height: 24px;
`
const SubText = styled.Text`
    font-family: "Montserrat";
    font-size: 10px;
    margin-bottom: 5px;
`
const HighlightText = styled(SubText)`
    text-decoration-line: underline;
    color: #00AADE;
`
const ProfileHeader = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #979797;
`