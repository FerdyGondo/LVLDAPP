import React, { useState } from 'react'
import { Alert,Modal,Platform } from "react-native";
import styled from 'styled-components'

export default function index({ modalVisible, setModalVisible, selected }) {
    
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
                        <ModalText>{`Confirm Payment`}</ModalText>
                        <SubContainer>
                             <ModalSubText>{`You will be charged $${selected} by LVLD`}</ModalSubText>
                        </SubContainer>
                    <ButtonContainer>
                        <ModalButton
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}                            grey

                        >
                            <NameText>Cancel</NameText>
                        </ModalButton>
                        <ModalButton
                            onPress={() => {
                            setModalVisible(!modalVisible);
                            }}
                        >
                            <NameText>Confirm</NameText>
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
    font-size: 30px;
`
const SubContainer = styled.View`
    margin: 15px 0px 25px;
    flex-direction: row;
    align-items: center;
`
const Square = styled.View`
    width: 10px;
    height: 10px;
    border-color: #000;
    border-width: 1px;
    opacity: 0.5px;
`
const ModalSubText = styled.Text`
    font-family: "Montserrat";
    font-size: 15px;
`
const ModalButton = styled.TouchableHighlight`
    background-color: ${props => props.grey ? '#979797' :'#d2a747' };
    border-radius: 5px;
    padding: 12px 40px;
    border-radius: 40px;
    margin: 0px 10px;
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #fff;
    font-size: 16px;
`
const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding:  0px 20px;
`


  