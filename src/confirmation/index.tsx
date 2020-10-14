import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import ProfileComponent from '../shared/components/Profile'

const {width,height} = Dimensions.get("window")

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-down" size={17} color="#fff" />;

type Props = {
    route: () => {};
    navigation: () => {};
}

export default function index({ route, navigation }: Props) {
    const { item } = route?.params
    return (
        <Container>
            <ProfileHeader>
                <ProfileComponent />
            </ProfileHeader>
            <Scroll>
                <MainContainer>
                    <MainTextContainer>
                        <MainText>{item.nickname}</MainText>
                        <SubText>{item.name}</SubText>
                    </MainTextContainer>
                    <SizeContainer>
                        <SizeTextUpper>Size</SizeTextUpper>
                        <SizeTextLower>{item.size}</SizeTextLower>
                    </SizeContainer>
                </MainContainer>
                <ImageContainer>
                    <Image source={require('../../assets/images/shoes/sneakers.png')} />
                </ImageContainer>
                <ListContainer>
                    <SubListContainer>
                        <ListText>{`Entry: $${item.entry}`}</ListText>
                    </SubListContainer>
                    <SubListContainer>
                        <ProfileContainer>
                            <ProfileIcon width={14}/>
                        </ProfileContainer>
                        <ListText>{item.people}</ListText>
                    </SubListContainer>
                    <SubListContainer>
                        <ListText>{`Start: ${item.start}`}</ListText>
                    </SubListContainer>
                </ListContainer>
                <LowerContainer>
                    <BigSizeContainer>
                        <BigUpperText>01</BigUpperText>
                        <BigLowerText>HOURS</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>40</BigUpperText>
                        <BigLowerText>MINUTES</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>32</BigUpperText>
                        <BigLowerText>SECONDS</BigLowerText>
                    </BigSizeContainer>
                </LowerContainer>
                <BottomContainer>
                    <QuantityContainer>
                        <BottomText>Qty: 1</BottomText>
                        {myIcon}
                    </QuantityContainer>
                    <ConfirmContainer onPress={() => navigation.navigate("Lobby")}>
                        <BottomText>{`Confirm Entry: $${item.entry}`}</BottomText>
                    </ConfirmContainer>
                </BottomContainer>
            </Scroll>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const ProfileHeader = styled.View`
    border-bottom-width: 0.4px;
    border-bottom-color: #000;
`
const Scroll = styled.ScrollView`
    flex: 1;
`
const MainContainer = styled.View`
    padding: 30px;
    padding-bottom: 0px;
`

const MainTextContainer = styled.View`
`
const MainText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 24px;
`
const SubText = styled.Text`
    font-family: "Montserrat"
`

const SizeContainer = styled.View`
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 10px;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
`
const SizeTextUpper = styled.Text`
    color: #fff;
    text-transform: uppercase;
    font-size: 11px;
    bottom: -1px;
    font-family: "Montserrat-Bold"
    opacity: 0.5;
`
const SizeTextLower = styled.Text`
    color: #fff;
    font-family: "Montserrat-ExtraBold"
    font-size: 16px;
    top: -2px;
`
const ImageContainer = styled.View`
    background-color: #fff;
    padding-bottom: 20px;
`
const Image = styled.Image`
    align-self: center;
`
const ListContainer = styled.View`
    padding: 30px;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 20px;
`
const SubListContainer = styled.View`
    flex-direction: row;
`
const ListText = styled.Text`
    font-family: "Montserrat-ExtraBold";
`
const ProfileContainer = styled.View`
    top: 2px;
    margin-left: 5px;
    right: 5px;
`
const LowerContainer = styled(MainContainer)`
    flex-direction: row;
    justify-content: space-between;
`
const BigSizeContainer = styled(SizeContainer)`
    width: 80px;
    height: 80px;
    border-radius: 15px;
`
const BigUpperText = styled(SizeTextLower)`
    font-size: 50px;
    font-family: "Montserrat"
`
const BigLowerText = styled(BigUpperText)`
    font-size: 10px;
    top: -5px;
    font-family: "Montserrat-Medium";
    opacity: 0.8;
`
const BottomContainer = styled.View`
    padding: 30px;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 35px;
`
const QuantityContainer = styled.TouchableOpacity`
    background-color: #000;
    border-radius: 20px;
    flex-direction: row;
    padding: 15px;
    width: 30%;
    align-items: center;
    justify-content: space-around;
`
const BottomText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #fff;
    font-size: 13px;
`
const ConfirmContainer = styled(QuantityContainer)`
    background-color: #d2a747;
    width: 62%;
    justify-content: center;
`