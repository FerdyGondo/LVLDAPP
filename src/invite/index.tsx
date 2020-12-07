import React, { useState } from 'react'
import ProfileComponent from '../shared/components/Profile'
import styled from 'styled-components'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={25} color={"#979797"} />;
const myDown = <Icons name="angle-down" size={25} color={"#979797"} />;

const data = [{name: "Copy Link", link: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/copy-link-icon.jpg"}, { name: "Text", link: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/text-icon.jpg"}, { name: "Twitter", link: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/facebook-messenger-icon.jpg"}, { name: "Email", link: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/email-icon.jpg"}, { name: "More", link: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/share-icon.jpg"}]

export default function index({ navigation }) {
    const [open, setOpen] = useState(false)
    const renderItem = ({ item }) => {
        return (
            <RenderItem>
                <InviteIcon source={{ uri: item.link }} />
                <LinkText>{item.name}</LinkText>
            </RenderItem>
        )
    }

    return (
        <Container>
            <Profile>
                <ProfileComponent />
            </Profile>
                <Scroll contentContainerStyle={{ flexGrow: 1 }}>
                    <TopContainer>
                        <MainText>Invite Friends</MainText>
                        <SubText>and get $10 in Gameplay</SubText>
                    </TopContainer>
                    <InviteImageContainer><InviteImage resizeMode="contain"  source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/invite-friends/invite-friends.png"}} /></InviteImageContainer>
                    <BottomContainer>
                        <InviteText>Invite friends using the options below</InviteText>
                        <FlatList 
                            horizontal
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    </BottomContainer>
                    <CardContainer>
                        <CardText onPress={() => navigation.navigate("Referrals")}>
                        <LeftText>Your Referrals</LeftText>
                        {myIcon}
                        </CardText>
                        <CardText onPress={() => setOpen(open => open = !open)}>
                        <LeftText>Referral Rules</LeftText>
                        {open ? myDown : myIcon}
                        </CardText>
                    </CardContainer>
                    {
                        open && (
                            <AnswerContainer>
                                <AnswerText>I am here</AnswerText>
                            </AnswerContainer>
                        )
                    }
                </Scroll>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Profile = styled.View`
   border-bottom-width: 1px;
   border-color: #979797; 
`
const Scroll = styled.ScrollView`
    flex: 1;
`
const FlatList = styled.FlatList`
`
const TopContainer = styled.View`
    padding: 10px 40px 0px;
    width: 100%;
    align-items: center;
`
const BottomContainer = styled.View`
    width: 100%;
    align-items: center;
`
const MainText = styled.Text`
    font-family: "Montserrat";
    font-size: 30px;
    font-weight: 700;
    line-height: 36.57px;
`
const SubText = styled.Text`
    font-family: "Montserrat";
    font-size: 20px;
    font-weight: 500;
    line-height: 24.38px;
`
const InviteImageContainer = styled.View`
    width: 100%;
    margin-top: -20px;
`
const InviteImage = styled.Image`
    width: ${width}px;
    height: ${width}px;
    align-self: center;
`
const InviteText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    line-height: 17.07px;
    font-size: 14px;
    margin-top: -1%;
`
const InviteIcon = styled.Image`
    width: 50px;
    height: 50px;
`
const LinkText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 10px;
    line-height: 12.19px;
    margin-top: 5px;
`
const RenderItem = styled.View`
    align-items: center;
    margin-left: 20px;
    margin-top: 15px
`
const CardContainer = styled.View`
  border-color: #3f3f3f;
  border-top-width: 1px;
  margin: 20px 0px;
`

const CardText = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: #3f3f3f;
  flex-direction: row;
  padding: 15px 12px;
  justify-content: space-between;
  align-items: center;
`

const LeftText = styled.Text`
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 12px;
`
const AnswerContainer = styled.View`

`
const AnswerText = styled.Text``
