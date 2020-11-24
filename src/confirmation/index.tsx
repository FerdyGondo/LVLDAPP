import React, { useState } from 'react'
import { Dimensions, Alert } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import ProfileComponent from '../shared/components/Profile'
import PickerModal from '../shared/components/PickerModal'
import SecondChance from './components/SecondChance'
import { useTimer } from '../shared/utils'

const {width,height} = Dimensions.get("window")

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-down" size={17} color="#fff" />;

type Props = {
    route: () => {};
    navigation: () => {};
}


export default function index({ route, navigation }: Props) {
    const [entry, setEntry] = useState(1)
    const { key, item } = route?.params
    let popupRef = React.createRef()
    const [showSecond, setShowSecond] = useState(false)
    
    const data = item
    const result = useTimer(data)

    const onShowPopup = () => {
        popupRef.show()
    }

    const onClosePopup = () => {
        popupRef.close()
    }

    const finishEntry = (item) => {
        setEntry(item)
    }

    const formatTime = (data, apendder) => {
        let result 
        const newData = data.find((item, index) => item.interval === apendder);
        if (!newData) {
            return result = "00"
        } else if(newData.timeLeft  < 10) {
            result = `0${newData.timeLeft }`
        } else {
            result = newData.timeLeft 
        }
        return result
    }



    const renderItem = () => {
        if (showSecond) return <Scroll><SecondChance /></Scroll>
        return (
            <Scroll>
                <SpoilContainer>
                    <MainContainer>
                        <MainTextContainer>
                            <MainText>{item.nickname}</MainText>
                            <SubText>{item.name}</SubText>
                        </MainTextContainer>
                        <SubListContainer>
                            <ProfileContainer>
                                <ProfileIcon width={14}/>
                            </ProfileContainer>
                            <ListText>{item.requiredParticipants}</ListText>
                        </SubListContainer>
                    </MainContainer>
                    <SizeContainer>
                        <SizeText>{key}</SizeText>
                    </SizeContainer>
                </SpoilContainer>
                <ImageContainer>
                    <Image source={require('../../assets/images/shoes/sneakers.png')} />
                </ImageContainer>
                <ListContainer>
                    <SubListContainer>
                        <ListText>{`Entry: $${item.entry}`}</ListText>
                    </SubListContainer>
                    <EndText>{`Ends: ${item.endTime[0]} 12/04`}</EndText>
                    
                </ListContainer>

                <EndContainer>
                </EndContainer>
                <ContextContainer>
                    <ContextText>Contest Ends In:</ContextText>
                </ContextContainer>
                <LowerContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, "hours")}</BigUpperText>
                        <BigLowerText>HOURS</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, "minutes")}</BigUpperText>
                        <BigLowerText>MINUTES</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, "seconds")}</BigUpperText>
                        <BigLowerText>SECONDS</BigLowerText>
                    </BigSizeContainer>
                </LowerContainer>
                <BottomContainer>
                    <QuantityContainer onPress={onShowPopup}>
                        <BottomText>{`Qty: ${entry}`}</BottomText>
                        {myIcon}
                    </QuantityContainer>
                    <ConfirmContainer onPress={() => navigation.navigate("Lobby", { lobbyItem: item, entry: entry })}>
                        <BottomText>{`Confirm Entry: $${entry}.00`}</BottomText>
                    </ConfirmContainer>
                </BottomContainer>
            </Scroll>
        )
    }

    return (
        <Container>
            <PickerModal 
                title="Select Quantity"
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
                finishEntry={finishEntry}
            />
            <ProfileHeader>
                <ProfileComponent />
            </ProfileHeader>
            {renderItem()}
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
`
const SpoilContainer = styled.View`
    flex-direction: row;
    padding: 10px 20px;
    justify-content: space-between;
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
const SizeContainer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 15px;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
`
const SizeText = styled.Text`
    color: #fff;
    font-family: "Montserrat-ExtraBold"
    font-size: 16px;
`
const ImageContainer = styled.View`
    background-color: #fff;
    padding-bottom: 30px;
`
const Image = styled.Image`
    align-self: center;
`
const ListContainer = styled.View`
    padding: 0px 30px;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 7px;
`
const EndContainer = styled.View`
    padding-left: 30px;
    border-bottom-width: 1px;
    border-color: #979797;
    padding-bottom: 20px;
`
const ContextContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`
const ContextText = styled.Text`
    font-family: "Montserrat";
    font-size: 20px;
    color: #000000;
    font-weight: 500;
`
const SubListContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const ListText = styled.Text`
    font-family: "Montserrat-ExtraBold";
`
const EndText = styled(ListText)`
    color: #FF0B0B;
`
const ProfileContainer = styled.View`
    margin-left: 5px;
    right: 5px;
`
const LowerContainer = styled.View`
    padding: 30px;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 5px;
    border-bottom-width: 1px;
    border-color: #979797;
    padding-bottom: 15px;
`
const BigSizeContainer = styled(SizeContainer)`
    width: 85px;
    height: 85px;
    border-radius: 20px;
`
const BigUpperText = styled(SizeText)`
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
    padding: 25px 30px;
    flex-direction: row;
    justify-content: space-between;
`
const QuantityContainer = styled.TouchableOpacity`
    background-color: #979797;
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