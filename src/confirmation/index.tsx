import React, { useState } from 'react'
import { Dimensions, Alert } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import ProfileComponent from '../shared/components/Profile'
import PickerModal from '../shared/components/PickerModal'
import SecondChance from './components/SecondChance'
import { useTimer, convertDate } from '../shared/utils'
import { getAuthData } from '../shared/utils';
import GamingControllerIcon from '../../assets/svg/GamingController'

const {width,height} = Dimensions.get("window")

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-down" size={17} color="#fff" />;

type Props = {
    route: () => {};
    navigation: () => {};
}


export default function index({ route, navigation }: Props) {
    const { key, item } = route?.params
    const [entry, setEntry] = useState(item.entryFee)
    let popupRef = React.createRef()
    const [showSecond, setShowSecond] = useState(false)
    
    const data = item
    const result = useTimer(data)

    const [token, updateToken] = React.useState('');
    React.useEffect(  () => {
        (async () => {
            const token = await getAuthData('token')
            updateToken(token);
        })()
    });
    
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
                            <BallContainer>
                                <Gaming>
                                    <GamingControllerIcon width={18} />  
                                </Gaming>
                            <FrontText>{item.game[0].name}</FrontText>
                            </BallContainer>
                            <MainText>{item.product.name}</MainText>
                            <MainText>{item.name}</MainText>
                        </MainTextContainer>
                    </MainContainer>
                    <LeftContainer>
                        <SizeContainer>
                            <SizeText>{key}</SizeText>
                        </SizeContainer>
                        <SubLeftContainer>
                            <ProfileContainer>
                                <ProfileIcon width={14}/>
                            </ProfileContainer>
                            <NewFrontText>{`25/40`}</NewFrontText>
                        </SubLeftContainer>
                    </LeftContainer>
                </SpoilContainer>
                <ImageContainer>
                    <Image source={{ uri: item.product.mainImage.asset.url }} />
                </ImageContainer>
                <ListContainer>
                    <SubListContainer>
                        <ListText>{`Entry: ${entry}`}</ListText>
                        <CoinImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/add-funds-screen/contest-coin.png"}} />
                        <ListText>{`($1.00)`}</ListText>
                    </SubListContainer>
                    <EndText>{`Ends: ${convertDate(item.finishDateTime)}`}</EndText>
                    
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
                    {token ?
                        <QuantityContainer onPress={onShowPopup}>
                            <BottomText>{`Qty: ${entry}`}</BottomText>
                            {myIcon}
                        </QuantityContainer>
                    :
                        <QuantityContainerDisable >
                            <BottomText>{`Qty: 0`}</BottomText>
                            {myIcon}
                        </QuantityContainerDisable>
                    }
                    <ConfirmContainer onPress={() =>  token ?
                        navigation.navigate("Lobby", { lobbyItem: item, entry: entry })
                        :
                        navigation.navigate("SignUp", { confirmation: true })
                    }>
                        <BottomText>{`Confirm: ${entry} ${entry < 2 ? 'Credit' : 'Credits'}`}</BottomText>
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
    margin-top: 10px;
`
const MainTextContainer = styled.View`
    margin-top: 5px;
`
const MainText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 22px;
    line-height: 26.82px;
    padding-top: 3px;
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
    width: ${width*0.9}px;
    height: ${width*0.5}px;
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
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
`
const EndText = styled.Text`
    color: #FF0B0B;
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
`
const ProfileContainer = styled.View`
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
const QuantityContainerDisable = styled.View`
    background-color: #ccc;
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
const BallContainer = styled.View`
    flex-direction: row;
    margin-bottom: 3px;
`
const FrontText = styled.Text`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
`
const Gaming = styled.View`
    margin-right: 5px;
`
const LeftContainer = styled.View`
`
const NewFrontText = styled.Text`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 14px;
    line-height: 17.07px;
`
const SubLeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    right: 5px;
`
const CoinImage = styled.Image`
    width: 15px;
    height: 15px;
    top: -1px;
    left: 3px;
    margin-right: 10px;
`