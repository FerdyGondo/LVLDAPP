import React, { useState } from 'react'
import { Alert,Modal,Platform } from "react-native";
import styled from 'styled-components'
import CheckBox from '@react-native-community/checkbox';
import { storeSize, storeSizeShown } from '../utils'

export default function index({ modalVisible, setModalVisible, selected, sizeModal }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    console.log('toggleCheckBox', toggleCheckBox)
    const askAgain = (value) => {
        setToggleCheckBox(value)
        storeSizeShown(value)
        setModalVisible(false)
        sizeModal()
    }
    const storeSizeFunction = () => {
        storeSize(selected)
        setModalVisible(!modalVisible)
        sizeModal()
    }
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
                        <ModalText>{`Set ${selected} as Default Size?`}</ModalText>
                        <SubContainer>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => askAgain(newValue)}
                            boxType={'square'}
                            lineWidth={1}
                            style={{ width: 10, height: 10,  borderWidth: 0.5, borderColor: '#000', marginRight: Platform.OS === 'android' ? 30 : 10 }}
                        />
                            <ModalSubText>Dont ask me again.</ModalSubText>
                        </SubContainer>
                    <ButtonContainer>
                        <ModalButton
                            onPress={() => {
                            storeSizeFunction()
                            }}
                        >
                            <NameText>Set Size</NameText>
                        </ModalButton>
                        <ModalButton
                            onPress={() => {
                            setModalVisible(!modalVisible);
                            sizeModal();
                            }}
                            grey
                        >
                            <NameText>Skip</NameText>
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
    font-size: 27px;
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
    font-size: 16px;
`
const ModalButton = styled.TouchableHighlight`
    background-color: ${props => props.grey ? '#979797' :'#d2a747' };
    border-radius: 5px;
    padding: 15px 55px;
    border-radius: 40px;
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
    padding:  0px 20px;
`


  