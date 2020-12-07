import React, { ReactElement } from 'react';

import styled from 'styled-components/native'
import ProfileComponent from '../shared/components/Profile'

import { Dimensions, Platform } from 'react-native'

import Carousel from '../carousel'
import { dummyData } from '../carousel/data/Data'

const { width } = Dimensions.get("window")

type Props = {
  navigation: () => {}
}

const Home = React.memo(({ navigation }: Props): ReactElement => {
  return (
    <Container>
        <Profile>
          <ProfileComponent />
        </Profile>
      <BodyContainer>
        <Scroll>
          <Center>
            <Carousel data = {dummyData} navigation = {navigation} />
            <RenderItemContainer onPress={() => navigation.navigate("Sneaker")}>
              <SneakerContainer os={Platform.OS} onPress={() => navigation.navigate("Sneaker")}>
                <HeroText>{"Sneaker Contests"}</HeroText>
                <HeroShadow>
                  <HeroSmallerText>{"Entry Fee $1.00-$5.00"}</HeroSmallerText>
                </HeroShadow>
                <SneakerMainText>
                  <PlayText>{"PLAY NOW"}</PlayText>
                </SneakerMainText>
              </SneakerContainer>
              <SneakerImageContainer os={Platform.OS}>
                <SneakerImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/shoes-1.png" }} />
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
                <ApparelImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/Apparel-1.png" }} resizeMode={"contain"} />
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
                <WatchImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/home-screen/watches-1.png" }} resizeMode={"contain"} />
              </WatchImageContainer>
            </RokusWatch>
          </Center>
        </Scroll>
      </BodyContainer>
    </Container>
  )
})

export default Home;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
const Scroll = styled.ScrollView`
  flex: 1;
`
const Center = styled.View`
`
const Profile = styled.View`
  border-color: #979797;
  border-bottom-width: 1px;
`
const BodyContainer = styled.View`
  padding: 12px 0px 0px;;
  flex: 1;
`
const LiveText = styled.Text`
  color: #000;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: "Montserrat-Bold";
  font-size: 20px;
  margin-bottom: 7px;
  margin-left: ${props => (props.os === "ios" ? "25px" : "22px")};
`
const HeroText = styled.Text`
  font-size: 22px;
  color: #fff;
  font-family: "Montserrat-ExtraBold";
  line-height: 26.82px;
  height: 27px;
  font-weight: 900;
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 0.1px;
  text-shadow-color: rgba(0, 0, 0, 0.4);
`
const HeroSmallerText = styled.Text`
  font-size: 12px;
  color: #ffffff;
  font-family: "Montserrat";
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.0003375px;
  margin-top: 2px;
`
const HeroShadow = styled.View`
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-offset: 0px 1px;
  elevation: 20;
`
const PlayText = styled.Text`
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 10px;
  color: #fff;
`
const PlayBlackText = styled(PlayText)`
  color: #000;
`
const RenderItemContainer = styled.TouchableOpacity`
`
const Rockus = styled.View`
  height: 185px;
  background-color: #292929;
  margin-top: 2px
`
const RokusWatch = styled(Rockus)`
  background-color: #626262;
`
const CardContainer = styled.TouchableOpacity`
  padding: 10px 25px 0px;
  margin-top: 5px;
`
const MainText = styled.View`
  margin-top: 10px;
  padding: 10px 10px;
  width: 35%;
  border-radius: 30px;
  align-items: center;
`
const SneakerMainText = styled(MainText)`
  background-color: #000;
`
const ApparelMainText = styled(MainText)`
  background-color: #fff;
`
const WatchMainText = styled(MainText)`
  background-color: #fff;
`
const SneakerImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "5px" : "12px")};
  width: ${width*0.95}px;
  right: 5px;
  height: 105px;
`
const SneakerImage = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`
const ApparelImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "8px" : "12px")};
  right: 20px;
  bottom: -50px;
`
const ApparelImage = styled.Image`
  width: ${width * 0.50}px; 
  height: ${width * 0.63}px;
`
const WatchImageContainer = styled.View`
  position: absolute;
  bottom: ${props => (props.os === "ios" ? "8px" : "12px")};
  right: 30px;
  bottom: -30px;
`
const WatchImage = styled.Image`
  width: ${width * 0.57}px; 
  height: ${width * 0.5}px;
`
const SneakerContainer = styled(CardContainer)`
  background-color: #d2a747;
  height: ${props => (props.os === "ios" ? "190px" : "195px")}
`
const ApparelContainer = styled(CardContainer)`
  background-color: #292929;
`
const WatchContainer = styled(CardContainer)`
  background-color: #626262;
`