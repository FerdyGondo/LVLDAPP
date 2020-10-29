import React from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import {Dimensions,Platform} from 'react-native'

const {width,height} = Dimensions.get("window")

const data = [{amount: 10},{amount: 15},{amount: 20},{amount: 50}]

const numColumns: number = 1;

type List = {
    amount: number;
}

const bankData = [{name: "Online Banking", color: "#979797"},{name: "Credit Card", color: "#C29A41"},{image: require('../../assets/images/applepay.png'), color: "#000000"},{image: require('../../assets/images/paypal.png'), color: "#FFC43A"},{image: require('../../assets/images/venmo.png'), color: "#029CDD"}]

export default function index() {

    const renderList = ({ item, index }: List) => {
        return (
            <TileContainer key={index} os={Platform.OS}>
                <Tile>
                    {`$${item.amount}`}
                </Tile>
            </TileContainer>
           )
    }

    const renderCard = ({ item, index }) => {
        if (item.image) return <ImageContainer key={index} index={index}><Image source={item.image} /></ImageContainer>
        return (
            <CardContainer key={index} color={item.color}>
              <CardText>{item.name}</CardText>
            </CardContainer>
        )
    }

    const renderImage = ({ item, index }) => {
        return (
            <ImageContainer key={index}>
                
            </ImageContainer>
        )
    }

    return (
        <Container>
            <Profile>
                <ProfileComponent />
            </Profile>
            <SizeContainer>
                <FlatList 
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    renderItem={renderList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </SizeContainer>
            <AmountContainer>
                <Amount>Custom Amount (Min. $5)</Amount>
                <TextInput placeholder={"$"} />
            </AmountContainer>
            <BankContainer>
                <BankFlatList 
                    data={bankData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCard}
                />
            </BankContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`
const Profile = styled.View`
    border-color: #979797;
    border-bottom-width: 1px;
`
const SizeContainer = styled.View`
  margin: 25px 0px 10px;
  margin-left: 20px;
`
const FlatList = styled.FlatList`
`
const BankFlatList = styled.FlatList`
`
const TileContainer = styled.TouchableOpacity`
  width: ${width/5.2}px;
  height: ${props => props.os === 'android' ? `${height/9}px` :  `${height/11.5}px`};
  margin-bottom: 18px;
  margin-right: 16px;
  margin-top: 2px;
  margin-left: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #000000;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-offset: 2px 2px;
  elevation: 20;
`
const Tile = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: "Montserrat-ExtraBold";
`
const Amount = styled.Text`
    margin-left: 22px;
    font-family: "Montserrat";
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 10px;
`
const TextInput = styled.TextInput`
    border-color: #979797;
    border-width: 1px;
    border-radius: 40px;
    padding: 16px;
    font-size: 16px;
    font-family: "Montserrat"
`
const AmountContainer = styled.View`
    margin: 5px 20px;
`
const BankContainer = styled.View`
    margin-top: 30px;
    flex: 1;
    padding-bottom: 5px;
`
const CardContainer = styled.View`
    background-color: ${props => props.color};
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    padding: 14px;
    margin: 5px 17px;
`
const CardText = styled.Text`
    color: #fff;
    font-family: "Montserrat-Bold";
    font-size: 22px;
`
const ImageContainer = styled.View`
    width: 100%;
    height: 55px;
    border-radius: 20px;
    padding: 0px 16px;
    margin-top: ${props => props.index === 2 ? '5px' : '10px'};
`
const Image = styled.Image`
    width: 100%;
    height: 100%;
`
const ListContainer = styled.View`
    height: 400px
`