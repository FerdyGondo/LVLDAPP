import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ProfileComponent from '../shared/components/Profile';
import { resetData, getData, convertDate } from '../shared/utils'
import GamingControllerIcon from '../../assets/svg/GamingController'

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-right" size={16} color="#A9A9A9" />;

import ProfileIcon from '../../assets/svg/ProfileIcon'
const SIZE = '@saved_size';

type Props = {
    navigation: () => {};
    route: () => {}
}

import { useTimer } from '../shared/utils'



export default function index({ route, navigation }: Props) {
    const { items } = route?.params

    const data = items.data[0]
    const result = useTimer(data)
    const [size, setSize] = useState(null)
    
    useEffect(() => {
        (async () => {
            const size = await getData(SIZE)
            setSize(size)
        })()
    },[])

    console.log('items', items)
    
    const renderItem = ({ item }) => {
        return (
            <MainContainer onPress={() => navigation.navigate("Confirmation", { item: item, key: items.variant })}>
                <ImageContainer>
                    <Image source={{ uri: item.product.mainImage.asset.url }} />
                </ImageContainer>
                <TextContainer>
                    <NameSize>
                        <Text2Container>
                            <BallContainer>
                                <Gaming>
                                    <GamingControllerIcon width={10} />  
                                </Gaming>
                                <FrontText>BBall Free-Throw</FrontText>
                            </BallContainer>
                            <NameText>{item.product.name}</NameText>
                            <NameText>{item.name}</NameText>
                        </Text2Container>
                        <SizeContainer>
                            <SizeTextLower>{items.variant}</SizeTextLower>
                        </SizeContainer>
                    </NameSize>
                    <BottomContainer>
                        <BottomLeftContainer>
                            <FrontContainer>
                                <FrontText>{`Entry: ${item.entryFee}`}</FrontText>
                                <CoinImage source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/add-funds-screen/contest-coin.png" }} />
                            </FrontContainer>
                            <FrontText>{`($1.00)`}</FrontText>
                        </BottomLeftContainer>
                        <BottomRightContainer>
                            <SvgContainer>
                                <Profile>
                                    <ProfileIcon width={13} />
                                </Profile>
                                <SizeText>{'12/40'}</SizeText>
                            </SvgContainer>
                            <RedBottomText>{`Ends: ${convertDate(item.finishDateTime)}`}</RedBottomText>
                        </BottomRightContainer>
                    </BottomContainer>
                </TextContainer>
                <ChevronContainer>
                    {myIcon}
                </ChevronContainer>
            </MainContainer>
        )
    }

    const setDefaultMethod = () => {
        resetData();
        navigation.goBack()
    }
    
    return (
        <Container>
            <ProfileComponent />
            <List 
                data={items.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            {
                size && (
                    <FooterContainer onPress={() => setDefaultMethod()}>
                        <SizeContainerF>
                            <SizeTextLower>{items.key}</SizeTextLower>
                        </SizeContainerF>
                        <ChangeSizeText>Change Size</ChangeSizeText>
                    </FooterContainer>
                )
            }
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const List = styled.FlatList``

const NameSize = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const MainContainer = styled.TouchableOpacity`
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    border-color: #3f3f3f;
    border-top-width: 0.7px;
    align-items: center;
    padding: 15px 20px;
`
const NameText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 11px;
    line-height: 13.41px;
`
const SvgContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const SizeText = styled.Text`
    font-family: "Montserrat-Medium";
    font-size: 10px;
`
const BottomContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    align-items: center;
    margin-top: 3px;
`

const BottomText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 10px;
`
const RedBottomText = styled(BottomText)`
    color: #ff0000;
`
const ChangeSizeText = styled(BottomText)`
    font-size: 12px;
    font-family: "Montserrat-Bold";
    color: #000000;
    left: 10px;
`
const ImageContainer = styled.View`
    width: 100px;
    height: 55px;
`
const Image = styled.Image`
    width: 100%;
    height: 100%;
`
const TextContainer = styled.View`
    height: 70px;
    justify-content: space-between;
    width: 66%;
`
const Text2Container = styled.View`
    
`
const ChevronContainer = styled.View`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 42px;
    right: 10px;
    align-self: center;
`

const SizeContainer = styled.TouchableOpacity`
    width: 28px;
    height: 28.28px;
    background-color: #252525;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    right: 25px;
`
const SizeContainerF = styled(SizeContainer)`
    right: 0px;
`
const SizeTextLower = styled.Text`
    color: #fff;
    font-family: "Montserrat-ExtraBold";
    font-size: 10px;
`
const FooterContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #ffffff;
    border-color: #979797;
    border-top-width: 1px;
    padding: 10px 20px;
    align-items: center;
    border-bottom-width: 1px;
`
const BallContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 3px;
`
const FrontText = styled.Text`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
`
const Gaming = styled.View`
    margin-right: 5px;
`
const BottomRightContainer = styled.View`
    align-items: flex-end;
`
const BottomLeftContainer = styled.View`
`
const Profile = styled.View`
    right: 5px;
`
const FrontContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const CoinImage = styled.Image`
    width: 12px;
    height: 12px;
    left: 3px;
`