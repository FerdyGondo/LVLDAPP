import React, { ReactElement } from 'react';

import styled from 'styled-components/native'
import ProfileComponent from '../shared/components/Profile'

import { Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get("window")

type Props = {
  navigation: () => {}
}

const Home = React.memo(({ navigation }: Props): ReactElement => {
  return (
    <Container>
      <ShadowContainer elevation={5}>
        <ProfileComponent />
      </ShadowContainer>
      <BodyContainer>
        <LiveText os={Platform.OS}>Live contests</LiveText>
        <Scroll>
          <RenderItemContainer onPress={() => navigation.navigate("Sneaker")}>
            <SneakerContainer os={Platform.OS} onPress={() => navigation.navigate("Sneaker")}>
              <HeroText>{"Sneaker Contests"}</HeroText>
              <HeroSmallerText>{"Entry Fee $1.00-$5.00"}</HeroSmallerText>
              <SneakerMainText>
                <PlayText>{"PLAY NOW"}</PlayText>
              </SneakerMainText>
            </SneakerContainer>
            <SneakerImageContainer os={Platform.OS}>
              <SneakerImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/shoes.png" }} />
            </SneakerImageContainer>
          </RenderItemContainer>
          <Rockus>
            <ApparelContainer os={Platform.OS}>
              <HeroText>{"Apparel Contests"}</HeroText>
              <ApparelMainText>
                <PlayBlackText>{"Coming Soon"}</PlayBlackText>
              </ApparelMainText>
            </ApparelContainer>
            <ApparelImageContainer os={Platform.OS}>
              <ApparelImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/Apparel.png" }} resizeMode={"contain"} />
            </ApparelImageContainer>
          </Rockus>
          <RokusWatch>
            <WatchContainer os={Platform.OS}>
              <HeroText>{"Watch Contests"}</HeroText>
              <WatchMainText>
                <PlayBlackText>{"Coming Soon"}</PlayBlackText>
              </WatchMainText>
            </WatchContainer>
            <WatchImageContainer os={Platform.OS}>
              <WatchImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/Watches.png" }} resizeMode={"contain"} />
            </WatchImageContainer>
          </RokusWatch>
        </Scroll>
      </BodyContainer>
    </Container>
  )
})

export default Home;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding-bottom: 40px;
`
const Scroll = styled.ScrollView`
  flex: 1;
`
const ShadowContainer = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: 1px 5px;
  elevation: 20;
  padding: 1px;
  margin: 1px;
`
const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 20px;
`
const ProfileText = styled.Text`
  font-size: 15px;
  font-family: "Montserrat-ExtraBold";
`
const SubText = styled.Text`
  font-family: "Montserrat"
`
const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
`
const Profile = styled.View`
  margin-right: 7px;
`
const MoneyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 7px;
  border-radius: 20px;
`
const MoneyText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`
const IconContainer = styled.View`
  background-color: #d2a747;
  margin-left: 7px;
  width: 15px;
  height: 15px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`
const BodyContainer = styled.View`
  padding: 12px 0px 0px;;
  flex: 1;
`
const LiveText = styled.Text`
  color: #000;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: "Montserrat-ExtraBold";
  font-size: 20px;
  margin-bottom: 5px;
  margin-left: ${props => (props.os === "ios" ? "38px" : "32px")};
`
const HeroText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: "Montserrat-Black";
`
const HeroSmallerText = styled.Text`
  font-size: 13px;
  color: #fff;
  font-family: "Montserrat-Light";
  margin-top: -1px;
`
const PlayText = styled.Text`
  font-family: "Montserrat-Bold";
  font-size: 10px;
  color: #fff;
`
const PlayBlackText = styled(PlayText)`
  color: #000;
`
const RenderItemContainer = styled.TouchableOpacity`
  padding: 0 27px 0px 7px;
  margin: 0px 15px 0px 30px;
`
const Rockus = styled.View`
  height: 180px;
  background-color: #3f3f3f;
  padding: 0 30px 0px 7px;
  margin: 7px 40px 0px 40px;
  border-radius: 30px;
`
const RokusWatch = styled(Rockus)`
  background-color: #262626
`
const CardContainer = styled.TouchableOpacity`
  padding: 10px 15px 0px;
  border-radius: 30px;
  margin-top: 7px;
`
const MainText = styled.View`
  margin-top: 10px;
  padding: 10px 10px;
  width: 33%;
  border-radius: 30px;
  align-items: center;
`
const SneakerMainText = styled(MainText)`
  background-color: #000;
`
const ApparelMainText = styled(MainText)`
  background-color: #fff;
  width: 100px;
`
const WatchMainText = styled(MainText)`
  background-color: #fff;
  width: 100px;
`
const SneakerImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "8px" : "12px")};
  right: 0px;
  width: ${width*0.92}px;
  height: 100px
`
const SneakerImage = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`
const ApparelImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "8px" : "12px")};
  right: -13px;
  bottom: -60px;
`
const ApparelImage = styled.Image`
  width: ${width * 0.57}px; 
  height: ${width * 0.6}px;
`
const WatchImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "8px" : "12px")};
  right: -13px;
  bottom: -30px;
`
const WatchImage = styled.Image`
  width: ${width * 0.57}px; 
  height: ${width * 0.5}px;
`
const SneakerContainer = styled(CardContainer)`
  background-color: #d2a747;
  height: ${props => (props.os === "ios" ? "185px" : "195px")}
`
const ApparelContainer = styled(CardContainer)`
  background-color: #3f3f3f;
`
const WatchContainer = styled(CardContainer)`
  background-color: #262626;
`