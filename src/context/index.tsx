import React from 'react'
import styled from 'styled-components';
import ProfileComponent from '../shared/components/Profile';

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-right" size={16} color="#A9A9A9" />;

import ProfileIcon from '../../assets/svg/ProfileIcon'

type Props = {
    navigation: () => {};
    route: () => {}
}


export default function index({ route, navigation }: Props) {
    const { items } = route?.params
    
    const renderItem = ({ item }) => {
        return (
            <MainContainer onPress={() => navigation.navigate("Confirmation", { item: item, key: items.key })}>
                <ImageContainer>
                    <Image source={{ uri: item.image }} />
                </ImageContainer>
                <TextContainer>
                    <Text2Container>
                        <NameText>{item.name}</NameText>
                        <SvgContainer>
                            <ProfileIcon width={13} />
                            <SizeText>{item.requiredParticipants}</SizeText>
                        </SvgContainer>
                    </Text2Container>
                    <BottomContainer>
                        <BottomText>{`Entry: $${item.entry}`}</BottomText>
                        <BottomText>{`Start: ${item.startTime[0]}`}</BottomText>
                    </BottomContainer>
                </TextContainer>
                <ChevronContainer>
                    {myIcon}
                </ChevronContainer>
            </MainContainer>
        )
    }
    
    return (
        <Container>
            <ProfileComponent />
            <List 
                data={items.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const List = styled.FlatList``

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
    font-size: 13px;
`
const SvgContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const SizeText = styled.Text`
    left: 7px;
    font-family: "Montserrat-Medium";
    font-size: 13px;
`
const BottomContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`

const BottomText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 13px;
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
    height: 75px;
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