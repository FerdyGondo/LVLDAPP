import React from 'react'
import { Alert, Modal } from "react-native";
import styled from 'styled-components'
import ImagePicker from 'react-native-image-picker';
import { handleCameraCapture, handleChoosePhoto }   from '../utils/ImagePicker';

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
                        <ModalText>Choose Profile Image</ModalText>
                    <ButtonContainer>
                        <ModalButton onPress={() => {  handleChoosePhoto(setModalVisible); }} >
                            <NameText>Get Image gallery</NameText>
                        </ModalButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <ModalButton onPress={() => { handleCameraCapture(setModalVisible) }} >
                            <NameText>Take a picture</NameText>
                        </ModalButton>
                    </ButtonContainer>
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
    padding: 20px 0px;
    width: 90%;
    align-items: center;
`
const ModalText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 20px;
    color: #000000;
`
const ModalButton = styled.TouchableHighlight`
    background-color: #D2A747;
    padding: 12px 55px;
    border-radius: 40px;
    align-items: center;
    width: 100%;
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #fff;
    font-size: 16px;
`
const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding:  20px;
`


  