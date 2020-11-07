import React from 'react'
import { Alert,Modal } from "react-native";
import styled from 'styled-components'

export default function index({ modalVisible, setModalVisible, text }) {
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
                        <ModalText>{`Bank Sign In`}</ModalText>
                        <SubContainer>
                             <ModalSubText>{`LVLD has provided a secure connection to ${text}. LVLD is not able to view your login credentials.`}</ModalSubText>
                        </SubContainer>
                    <ButtonContainer>
                        <ModalButton
                            onPress={() => {
                                Alert.alert(
                                    "Connecting To Your Bank",
                                    "",
                                    [
                                      {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                      },
                                      { text: "OK", onPress: () => setModalVisible(!modalVisible) }
                                    ],
                                    { cancelable: false }
                                  );
                            }}
                        >
                            <NameText>Ok, I understand.</NameText>
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
    color: #000000;
`
const SubContainer = styled.View`
    margin: 15px 20px;
    align-items: center;
`
const ModalSubText = styled.Text`
    font-family: "Montserrat-Light";
    font-size: 15px;
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
    padding:  0px 20px;
`


  