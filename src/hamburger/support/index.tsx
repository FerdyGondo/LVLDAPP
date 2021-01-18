import React, { useState } from 'react'
import styled from 'styled-components'
import Config from 'react-native-config'
import ProfileComponent from '../../shared/components/Profile'
import Logo from '../../../assets/svg/LvldLogo'
import AttatchmentIcon from '../../../assets/svg/AttatchmentIcon'
import {Platform, KeyboardAvoidingView} from 'react-native'
import ImagePickerModal from '../../shared/components/ImagePickerModal'
import { createApolloFetch } from 'apollo-fetch';
import { getAuthData }   from '../../shared/utils';
import { SEND_MESSAGE_MUTATION } from '../../graphql/mutation'

const uri = Config.APOLLO_GRAPHQL_URI;
const apolloFetch = createApolloFetch({ uri });

export default function index() {
    const [name, setName] = useState('')
    const [length, setLength] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [imageResponse, setImageResponse] = useState()


    const sendMessage = async (image) => {
        if (!name) return
        const token = await getAuthData('token');
        apolloFetch.use(({ request, options }, next) => {
            options.headers = {
              "Authorization": token
            };
            next();
          });
    
        try{
            image = 'data:image/jpeg;base64,' + image;
            let res =  await apolloFetch({ query : SEND_MESSAGE_MUTATION, 
                variables: { 
                        text: name,
                        attachment: image 
                    }
                })
                console.log('storePic res ',res);
        } catch (e) {
            console.log('storePic err ', e);
        }
    }

    const setLengthEvent = (text) => {
        setName(text)
        setLength(length => length = text.length)
    }
    return (
        <Container>
            <ImagePickerModal modalVisible={modalVisible} setModalVisible={setModalVisible} setImageResponse={setImageResponse} />
            <Profile>
                <ProfileComponent />
            </Profile>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 100}
                >
                <Scroll>
           
            <MainContainer>
                <CenterHeader>
                    <Logo width={100} />
                    <MainText>Contact Support</MainText>
                    <SubText>Please provide a detailed message.</SubText>
                </CenterHeader>
                

                <TextContainer>
                    <UpperContainer>
                        <UpperText>New Message</UpperText>
                        <SendContainer>
                            <AttatchmentContainer onPress={() => setModalVisible(true)}>
                                <AttatchmentIcon width={30} />
                            </AttatchmentContainer>
                            <SendButton onPress={() => sendMessage()}>
                                <SendText>Send</SendText>
                            </SendButton>
                        </SendContainer>
                    </UpperContainer>
                    <InputContainer os={Platform.OS}>
                        <PlaceHolderInput placeholder={"Type your message here"} placeholderTextColor={'#979797'} value={name} onChangeText={(text) => setLengthEvent(text)} returnKeyType={"next"} multiline={true} maxLength={500} />
                    </InputContainer>
                    <CountContainer>
                        <PlaceHolderView>
                            {!imageResponse ? <PlaceHolderBox /> : <PlaceHolderImage source={{ uri: imageResponse.response.uri }} />}
                        </PlaceHolderView>
                        <CountText>{`${length}/500`}</CountText>
                    </CountContainer>
                </TextContainer>

            </MainContainer>

            </Scroll>
                </KeyboardAvoidingView>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #000000;
`
const Profile = styled.View`
  border-color: #979797;
  border-bottom-width: 1px;
  background-color: #ffffff;
`
const Scroll = styled.ScrollView`
    flex: 1;
`
const MainContainer = styled.View`
    background-color: #000000;
    flex: 1;
    padding: 20px;
    padding-bottom: 0px;
`
const CenterHeader = styled.View`
    align-items: center;
`
const MainText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    color: #ffffff;
    line-height: 27px;
    font-size: 22px;
    margin-top: 20px;
`
const SubText = styled.Text`
    font-family: "Montserrat";
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-top: 10px;
    font-weight: 400;
`
const TextContainer = styled.View`
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
    padding-bottom: 40px;
    flex: 1;
`
const CountContainer = styled.View`
    position: absolute;
    bottom: 5%;
    right: 5%;
    flex-direction: row;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`
const CountText = styled.Text`
    font-family: "Montserrat";
    font-size: 14px;
    line-height: 17.07px;
    font-size: 14px;
    font-weight: 700;
    color: #979797;
`
const PlaceHolderBox = styled.View`
    width: 35px;
    height: 25px;
    background-color: #C4C4C4;
    margin-right: 10px;
`
const PlaceHolderView = styled.View`
    flex-direction: row;
    left: 1%;
`
const UpperContainer = styled.View`
    flex-direction: row;
    border-color: #979797;
    border-bottom-width: 1px;
    padding: 12px 20px 8px;
    justify-content: space-between;
`
const UpperText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 18px;
    line-height: 21.94px;
    color: #000000;
`
const SendText = styled.Text`
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 15px;
    line-height: 18.29px;
    color: #C29A41;
`
const SendContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const AttatchmentContainer = styled.TouchableOpacity`
    margin-right: 20px;
`
const PlaceHolderInput = styled.TextInput`
    padding-left: 5.7%;
    padding-right: 5.7%;
    font-size: 14px;
    font-family: "Montserrat";
    color: #979797;
    font-weight: 400;
`
const InputContainer = styled.View`
    margin-top: ${props => props.os === 'android' ? '0px' : '10px'};
    padding-bottom: 60px;
`
const PlaceHolderImage = styled.Image`
    width: 35px;
    height: 25px;
`
const SendButton = styled.TouchableOpacity`

`