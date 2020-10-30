import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import Icons from 'react-native-vector-icons/Entypo';
const myIcon = <Icons name="plus" size={22} color={"#d2a474"} />;
import CheckBox from '@react-native-community/checkbox';
import Button from '../shared/components/Button';

export default function index() {
    const [focus1, setFocus1] = useState(false)
    const [name, setName] = useState('')
    const [focus2, setFocus2] = useState(false)
    const [card, setCard] = useState('')
    const [focus3, setFocus3] = useState(false)
    const [date, setDate] = useState('')
    const [focus4, setFocus4] = useState(false)
    const [security, setSecurity] = useState('')
    const [focus5, setFocus5] = useState(false)
    const [state, setState] = useState('')
    const [focus6, setFocus6] = useState(false)
    const [zip, setZip] = useState('')
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const askAgain = (value) => {
        setToggleCheckBox(value)
    }

    return (
        <Container>
            <ProfileComponent />
            <AmountContainer>
                <IconContainer>
                    {myIcon}
                </IconContainer>
                <AmountText>$100</AmountText>
            </AmountContainer>
            <Scroll>
                <MainContainer>
                    <PlaceHolderContainer>
                        <PlaceHolderText>Cardholder Name</PlaceHolderText>
                        <PlaceHolderInput placeholder={"Full Name"} value={name} focus={focus1} onFocus={() => setFocus1(true)} onBlur={() => setFocus1(false)} onChaneText={(text) => setName(text)} color={focus1} />
                        <FontLine>As it appears on the front of your card</FontLine>
                    </PlaceHolderContainer>
                    <PlaceHolderContainer>
                        <PlaceHolderText>Credit Card Number</PlaceHolderText>
                        <PlaceHolderInput placeholder={"XXXX XXXX XXXX XXXX"} value={card} focus={focus2} onFocus={() => setFocus2(true)} onBlur={() => setFocus2(false)} onChaneText={(text) => setCard(text)} color={focus2} />
                    </PlaceHolderContainer>
                    <IncomeContainer>
                        <PlaceHolderHalfContainer>
                            <PlaceHolderText>Expiry Date</PlaceHolderText>
                            <PlaceHolderInput placeholder={"MM/YY"} value={date} focus={focus3} onFocus={() => setFocus3(true)} onBlur={() => setFocus3(false)} onChaneText={(text) => setDate(text)} color={focus3} />
                        </PlaceHolderHalfContainer>
                        <PlaceHolderHalfContainer>
                            <PlaceHolderText>CVV</PlaceHolderText>
                            <PlaceHolderInput placeholder={"Security Code"} value={security} focus={focus4} onFocus={() => setFocus4(true)} onBlur={() => setFocus4(false)} onChaneText={(text) => setSecurity(text)} color={focus4} />
                        </PlaceHolderHalfContainer>
                    </IncomeContainer>
                    <IncomeContainer>
                        <PlaceHolderHalfContainer>
                            <PlaceHolderText>State</PlaceHolderText>
                            <PlaceHolderInput placeholder={"e.g. CA"} value={state} focus={focus5} onFocus={() => setFocus5(true)} onBlur={() => setFocus5(false)} onChaneText={(text) => setState(text)} color={focus5} />
                        </PlaceHolderHalfContainer>
                        <PlaceHolderHalfContainer>
                            <PlaceHolderText>Zip Code</PlaceHolderText>
                            <PlaceHolderInput placeholder={""} value={zip} focus={focus6} onFocus={() => setFocus6(true)} onBlur={() => setFocus6(false)} onChaneText={(text) => setZip(text)} color={focus6} />
                        </PlaceHolderHalfContainer>
                    </IncomeContainer>
                    <SaveContainer>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => askAgain(newValue)}
                            boxType={'square'}
                            lineWidth={1}
                            style={{ width: 10, height: 10,  borderWidth: 0.5, borderColor: '#000', marginRight: Platform.OS === 'android' ? 30 : 10 }}
                        />
                        <SaveText>Save this card for future use?</SaveText>
                    </SaveContainer>
                </MainContainer>
                <BottomContainer>
                    <PayPalContainer>
                            <Image source={require('../../assets/images/credit/credit-card.png')} />
                        <Divider>
                            
                        </Divider>
                            <PayPal source={require('../../assets/images/credit/paypal.png')} />
                    </PayPalContainer>
                    <Button text={"Pay $100.00"} />
                </BottomContainer>
            </Scroll>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Scroll = styled.ScrollView`
    flex: 1;
`
const AmountContainer = styled.View`
    border-color: #979797;
    border-top-width: 1px;
    border-bottom-width: 1px;
    padding: 7px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
const IconContainer = styled.View`
    width: 20px;
    height: 20px;
`
const AmountText = styled.Text`
    font-family: "Montserrat-Medium";
    font-size: 30px;
`
const MainContainer = styled.View`
    padding: 20px;
`
const PlaceHolderContainer = styled.View`
    margin: 10px 0px;
`
const PlaceHolderHalfContainer = styled.View`
    width: 48%;
    margin: 10px 0px;
`
const PlaceHolderText = styled.Text`
    font-family: "Montserrat";
    font-size: 10px;
    color: #000000;
    line-height: 12px;
    left: 3.7%;
    margin-bottom: 5px;
`
const PlaceHolderInput = styled.TextInput`
    border-radius: 25px;
    background-color: #ffffff;
    border-color: ${props => props.color ? "#D2A747" : "#979797"};
    padding: 8px 10px;
    border-width: 1px;
    padding-left: 3.7%;
    font-size: 12px;
`
const FontLine = styled.Text`
    color: #979797;
    font-size: 10px;
    left: 3.77%;
    top: 5px;
`
const IncomeContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const SaveContainer = styled.View`
    padding: 10px;
    flex-direction: row;
`
const SaveText = styled(FontLine)`
    color: #000000;
    top: -2px;
`
const PayPalContainer = styled.View`
    flex-direction: row;
    height: 52px;
    justify-content: space-around;
    align-items: center;
    border-color: #979797;
    border-top-width: 1px;
    border-bottom-width: 1px;
    margin-bottom: 10px;
`
const Image = styled.Image`
    width: 30%;
    height: 36%;
`
const PayPal = styled.Image`
    width: 20%;
    height: 34%;
`
const Divider = styled.View`
    height: 40px;
    border-color: #979797;
    border-width: 1px;
    right: 20px;
`
const BottomContainer = styled.View`
    margin-top: 20%;
`