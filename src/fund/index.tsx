import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import {Dimensions,Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Alert} from 'react-native'

const {width,height} = Dimensions.get("window")

const data = [{credit: 40, amount: 10},{credit: 60, amount: 15},{credit: 80, amount: 20},{credit: 200, amount: 50}]

const numColumns: number = 1;

type List = {
    amount: number;
}


export default function index({ navigation }) {
    const [amount, setAmount] = useState('0.00')
    const [credits, setCredits] = useState(0)
    const [verified, setVerified] = useState(true)

    useEffect(() => {
        if (parseFloat(amount) > 100) return Alert.alert("Amount should be less than 100")
    },[credits, amount])

    useEffect(() => {
        if (!Number.isInteger(credits)) {
            setVerified(false)
        } else {
            setVerified(true)
        }
    }, [credits])
    

    const onSubmit = (item) => {
        setAmount(amount => amount = item.amount.toFixed(2))
        setCredits(credits => credits = item.credit)
    }

    const changeInput = (text) => {
        setAmount(text)
        setCredits(credits => credits = text * 4)
        
    }

    const renderList = ({ item, index }: List) => {
        return (
            <TouchableWithoutFeedback onPress={() => onSubmit(item)}>
                <TileContainer>
                    <CoinContainer source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/add-funds-screen/coin.png" }} index={index !== 0}>
                        <Tile>
                            {`${item.credit}`}
                        </Tile>
                        <CreditText>Credits</CreditText>
                        <ViewContainer>
                            <AmountText>{`$${item.amount}.00`}</AmountText>
                        </ViewContainer>
                    </CoinContainer>
                </TileContainer>
            </TouchableWithoutFeedback>
           )
    }

    const onFocusEvent = () => {
        setVerified(true)
        setAmount('')
        setCredits(0)
    }

    const onBlurEvent = () => {
        if (!Number.isInteger(credits)) {
            setVerified(false)
            Alert.alert('Amount should be multiple of 0.25')
        } else {
            setVerified(true)
        }
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 130 : '10%'}
                >
        <Container>
            <Scroll>

            
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
                    <BigCoinContainer source={{ uri: "https://lvld-content.s3-us-west-1.amazonaws.com/add-funds-screen/coin.png" }}>
                        <BigTile>
                            {`${Math.floor(credits)}`}
                        </BigTile>
                        <BigCreditText>Credits</BigCreditText>
                    </BigCoinContainer>
                </AmountContainer>
                
                <InputContainer>
                    <DollarText>$</DollarText>
                    <TextInput  value={amount} onChangeText={(text) => changeInput(text)} keyboardType={"numeric"}  maxLength={5} onFocus={() => onFocusEvent()} color={verified} onBlur={() => onBlurEvent()} />
                    <DisclaimerText>Disclaimer: All credit sales are final</DisclaimerText>
                </InputContainer>

                <ButtonStyle disabled={!verified} opacity={verified}>
                    <TextStyle>Buy Now</TextStyle>
                </ButtonStyle>
            </Scroll>

        </Container>
        </KeyboardAvoidingView>

    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Scroll = styled.ScrollView`
    flex: 1
`
const Profile = styled.View`
    border-color: #979797;
    border-bottom-width: 1px;
`
const SizeContainer = styled.View`
    align-items: center;
    margin-top: 15px;
    border-color: #979797;
    border-bottom-width: 1px;
`
const FlatList = styled.FlatList`
`
const BankFlatList = styled.FlatList`
`
const TileContainer = styled.View`
    padding-bottom: 35px;
`
const CoinContainer = styled.ImageBackground`
    resizeMode: cover;
    justify-content: center;
    align-items: center;
    justify-content: center;
    width: ${width*0.23}px;
    height: ${width*0.23}px;
    shadow-color: #000;
    shadow-opacity: 0.3;
    shadow-offset: 2px 2px;
    elevation: 20;
    ${({ index }) => index && `margin-left: 5px`}
`
const BigCoinContainer = styled(CoinContainer)`
    width: ${width*0.52}px;
    height: ${width*0.52}px;
`
const Tile = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 24.38px;
`
const BigTile = styled(Tile)`
    font-size: 65px;
    line-height: 79.24px;
`
const CreditText = styled(Tile)`
  font-size: 12px;
  line-height: 14.63px;
`
const BigCreditText = styled(CreditText)`
    font-size: 28px;
    line-height: 34.13px;
`
const DollarText = styled.Text`
    font-size: 32px;
    line-height: 30px;
    position: absolute;
    top: 20%;
    font-family: "Montserrat";
    left: 30%;
`
const AmountText = styled.Text`
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 14px;
    line-height: 17.07px;
`
const ViewContainer = styled.View`
    position: absolute;
    top: 105%;
`
const Amount = styled.Text`
    font-family: "Montserrat";
    font-size: 20px;
    font-weight: 700;
    line-height: 24.38px;
    align-self: center;
    padding-bottom: 20px;
`
const TextInput = styled.TextInput`
    border-color: ${props => props.color ? "#979797" : "red"};
    border-width: 1px;
    border-radius: 32px;
    padding: 6px;
    font-size: 32px;
    font-family: "Montserrat";
    font-weight: 400;
    padding-left: 42%;
`
const DisclaimerText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    line-height: 14.63px;
    align-self: center;
    margin-top: 10px;
`
const InputContainer = styled.View`
    width: 60%;
    margin-left: 20%;
`
const AmountContainer = styled.View`
    margin: 25px 25px 15px;
    align-items: center;
`
const BankContainer = styled.View`
    margin-top: 30px;
    flex: 1;
    padding-bottom: 5px;
`
const CardContainer = styled.TouchableOpacity`
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
const TextStyle = styled.Text`
    color: #ffffff;
    font-family: "Montserrat";
    font-size: 20px;
    font-weight: 700;
    line-height: 24.38px;
`
const ButtonStyle = styled.TouchableOpacity`
    background-color: #000000;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 14px;
    margin: 45px 17px 20px;
    opacity: ${props => props.opacity ? 1 : 0.5}
`