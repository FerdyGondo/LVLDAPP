import React, { useState, useEffect } from 'react'
import { 
    useSelector,
    useDispatch
 } from 'react-redux';
import styled from 'styled-components'
import { Avatar } from 'react-native-elements';
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { KeyboardAvoidingView, Platform,TouchableOpacity } from 'react-native'
import { saveInfo }  from './utils';
import { getUserAction } from '../store/authActions';
import CameraIcon from '../../assets/svg/CameraIcon';
import ImagePickerModal from '../shared/components/ImagePickerModal';
import auth from '../store/auth';

export default function index() {
    const [userName, setName] = useState("")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputComplete, setInputComplete] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [photo, setPhoto] = useState('')
    const auth = useSelector(state => state.auth);
    const getUserDispatch = useDispatch();

    useEffect(() => {
        if (userName !== "" && firstName !== '' && lastName !== '' && email !== '' && password !== '') {
            setInputComplete(true)
        } else {
            setInputComplete(false)
        }
    },[userName, firstName, lastName, email, password])
    
    useEffect(  () => {
            try{
                getUserDispatch(getUserAction());
            } catch(err){
                console.log('personal err : ', err)
            }
    },[]);

    return (
        <Container>
            <ImagePickerModal modalVisible={modalVisible} setModalVisible={setModalVisible} setPhoto={setPhoto}  />
            <MainContainer>
                <ProfileContainer>
                    {auth.userObj && auth.userObj.profilePicture ? 
                        <Avatar rounded size={90} source={{uri:auth.userObj.profilePicture}} onPress={() => setModalVisible(true)} />
                        :
                        <Avatar rounded size={90} ImageComponent={ProfileIcon} onPress={() => setModalVisible(true)} />
                    } 
                    <CameraContainer  onPress={ () => { setModalVisible(true) }} >
                        <CameraView>
                            <CameraIcon width={17} />
                        </CameraView>
                    </CameraContainer>
                    <MainText>{firstName+" "}<SubText>{lastName}</SubText></MainText>
                </ProfileContainer>
                <BottomContainer>
                    <BoldText>1,000</BoldText>
                    <Bottom>BALANCE</Bottom>
                </BottomContainer>
            </MainContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                >
            <Scroll>
                <BodyContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Username</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Username"} value={auth.userObj?auth.userObj.username:''} onChangeText={(text) => setName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>First Name</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"First Name"} value={auth.userObj?auth.userObj.firstname:''} onChangeText={(text) => setFirstName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Last Name</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Last Name"} value={auth.userObj?auth.userObj.lastname:''} onChangeText={(text) => setLastName(text)}  />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Email</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Email"} value={auth.userObj?auth.userObj.email:''} onChangeText={(text) => setEmail(text)}  keyboardType={"email-address"} />
                        </PlaceHolderContainer>
                        <PlaceHolderContainer>
                                <PlaceHolderText>Confirm Password</PlaceHolderText>
                                <PlaceHolderInput os={Platform.OS} placeholder={"Password"} value={password} onChangeText={(text) => setPassword(text)}  secureTextEntry={true} />
                        </PlaceHolderContainer>
                    <FooterContainer>
                        <FooterMainText>Forgot your password?</FooterMainText>
                        <FooterSubText>Click here to reset it.</FooterSubText>
                        <FooterMainText>Don't have access to your email account?</FooterMainText>
                        <FooterSubText>Contact Customer Support.</FooterSubText>
                    </FooterContainer>
                    <CardContainer inputComplete={inputComplete} bigger  onPress={ () => { saveInfo(userName, firstName, lastName, email, password) } }>
                        <CardText>Save Changes</CardText>
                    </CardContainer>
                </BodyContainer>
            </Scroll>
            </KeyboardAvoidingView>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
`
const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 15px;
  justify-content: center;
`
const TopContainer = styled.View`
`
const BottomContainer = styled.View`
  position: absolute;
  top: 1%;
  right: 1%;
`
const BoldText = styled.Text`
  font-size: 11px;
  font-weight: bold;
  text-align: right;
`
const Bottom = styled.Text`
  font-weight: 400;
  font-size: 11px;
`
const ProfileContainer = styled.View`
    align-items: center;
`
const MainText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  padding-top: 10px;
`
const SubText = styled.Text`
  font-weight: 200;
`
const BodyContainer = styled.View`
    margin: 5px 17px;
`
const CameraContainer = styled.TouchableOpacity`
    bottom: 27px;
    left: 15px;
`
const CameraView = styled.View`
    background-color: #d2a747;
    min-height: 30px;
    min-width: 30px;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 30px;
    z-index: 10;
`
const CardContainer = styled.TouchableOpacity`
    background-color: ${props => props.inputComplete ? "#C29A41" : "#979797" };
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    padding: ${props => props.bigger ? '16px' : '8px'};
    margin: 5px 0px;
`
const CardText = styled.Text`
    color: #fff;
    font-family: "Montserrat-Bold";
    font-size: 20px;
`
const PlaceHolderContainer = styled.View`
    margin: 5px 0px;
`
const PlaceHolderHalfContainer = styled.View`
    width: 48%;
    margin: 10px 0px;
`
const PlaceHolderText = styled.Text`
    font-family: "Montserrat";
    color: #000000;
    left: 3.7%;
    margin-bottom: 3px;
`
const PlaceHolderInput = styled.TextInput`
    border-radius: 25px;
    background-color: #ffffff;
    border-color: ${props => props.color ? "#D2A747" : "#979797"};
    padding: ${props => props.os === 'android' ? '5px' : '10px'};
    border-width: 1px;
    padding-left: 3.7%;
    font-size: 12px;
`
const Scroll = styled.ScrollView`
`
const FooterContainer = styled.View`
    margin: 0px 15px 10px;
`
const FooterMainText = styled.Text`
    font-family: "Montserrat";
    font-size: 10px;
    margin-top: 10px;
`
const FooterSubText = styled.Text`
    text-decoration-line: underline;
    color: #00AADE;
    font-family: "Montserrat";
    font-size: 10px;
`