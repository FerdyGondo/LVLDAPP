import React from 'react'
import { Alert, Modal,Linking } from "react-native";
import styled from 'styled-components'

export default function index({ modalVisible, setModalVisible }) {
    
    return (
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                >
                <Container>
                    <ModalView>
                        <CloseButton onPress = {() => setModalVisible(false)} ><CloseBtnText>X</CloseBtnText></CloseButton>
                        <ModalTitle>Why is LVLD requesting my location?</ModalTitle>
                        <Spacer />
                        <ModalText>LVLD is required to verify your location to determine contest participation eligibility. For more information, please review LVLD's Term of Use and Privacy Policy located in the hamburger of this app or by visiting 
                        <BoldText onPress = {() => Linking.openURL('https://lvld.app/info')}> https://lvld.app/info</BoldText></ModalText>
                    </ModalView>
                </Container>
            </Modal>
    )
}


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7)
`
const ModalView = styled.View`
    background-color: #fff;
    border-radius: 20px;
    padding: 20px 20px;
    width: 80%;
    align-items: center;
`
const CloseButton = styled.TouchableHighlight`
    width: 18px;
    height:18px;
    border-radius: 20px;
    border-width:1px;
    border-color:#bbb;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10%;
    left: 5%;
`
const CloseBtnText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #bbb;
    font-size: 10px;
`
const ModalTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 16px;
    color: #000000;
    text-align: center;
    width: 70%;
`
const ModalText = styled.Text`
    font-family: "Montserrat";
    text-align: center;
`
const BoldText = styled.Text`
    font-family: "Montserrat-Bold";
`
const Spacer = styled.View`
    margin:5px;
`


  