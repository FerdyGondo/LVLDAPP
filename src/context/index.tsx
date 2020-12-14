import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ProfileComponent from '../shared/components/Profile';
import { resetData, getData, convertDate } from '../shared/utils'

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
    
    const renderItem = ({ item }) => {
        return (
            <MainContainer onPress={() => navigation.navigate("Confirmation", { item: item, key: items.variant })}>
                <ImageContainer>
                    <Image source={{ uri: item.product.mainImage.asset.url }} />
                </ImageContainer>
                <TextContainer>
                    <NameSize>
                        <Text2Container>
                            <NameText>{item.product.name}</NameText>
                            <SvgContainer>
                                <ProfileIcon width={13} />
                                <SizeText>{'12/40'}</SizeText>
                            </SvgContainer>
                        </Text2Container>
                        <SizeContainer>
                            <SizeTextLower>{items.variant}</SizeTextLower>
                        </SizeContainer>
                    </NameSize>
                    <BottomContainer>
                        <BottomText>{`Entry: $${item.entryFee}`}</BottomText>
                        <RedBottomText>{`Ends: ${convertDate(item.finishDateTime)}`}</RedBottomText>
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
    font-family: "Montserrat-ExtraBold";
    font-size: 12px;
`
const SvgContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const SizeText = styled.Text`
    left: 7px;
    font-family: "Montserrat-Medium";
    font-size: 10px;
`
const BottomContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
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
    font-family: "Montserrat-ExtraBold"
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