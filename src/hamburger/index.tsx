import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {signOutAction} from '../store/authActions'
import { geolocation } from '../shared/geolocation'
import LocationModal from './location/components/LocationModal';
import { getAuthData } from '../shared/utils'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements';
import {Alert} from 'react-native'

export default function index() {
    const signOutDispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [token, updateToken] = useState('');
    const [stateregion, setStateregion] = useState(null);

    useEffect(  () => {
          (async () => {
              const token = await getAuthData('token')
              updateToken(token);
              if(token) {
                await geolocation(setStateregion);
                setStateregion(stateregion);
              }
            })()
        }, []);

    return (
        <Container>
            <LocationModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TopContainer>
                { token ? 
                    <TouchableOpacity  onPress={ () => { navigation.navigate('Support')}} >
                        <DrawerItemStyle><DrawerTextStyle>Support</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                    </TouchableOpacity>
                :
                    <DrawerItemStyle><DrawerTextStyleDisable>Support</DrawerTextStyleDisable><Icon  name="chevron-right"  size={26} color={'#ccc'}/></DrawerItemStyle>
                }
                <TouchableOpacity  onPress={ () => navigation.navigate("Tutorial")} >
                    <DrawerItemStyle><DrawerTextStyle>Tutorials</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>
                <TouchableOpacity  onPress={ () => { navigation.navigate("Rules")}} >
                    <DrawerItemStyle><DrawerTextStyle>Rules and Gameplay</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>
                <TouchableOpacity  onPress={ () => { navigation.navigate("Faq")}} >
                    <DrawerItemStyle><DrawerTextStyle>FAQ</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>            
                <TouchableOpacity  onPress={ () => { navigation.navigate("Terms_of_Use")}} >
                    <DrawerItemStyle><DrawerTextStyle>Terms of Use</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>        
                <TouchableOpacity  onPress={ () => { navigation.navigate("Privacy")}} >
                    <DrawerItemStyle><DrawerTextStyle>Privacy Policy</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>        
                <DrawerLocationViewStyle>
                    <DrawerItemStyle><GeolocationView><DrawerTextStyle>Current Location </DrawerTextStyle><TooltipBtn onPress = {() => setModalVisible(true) }><TooltipText>?</TooltipText></TooltipBtn></GeolocationView><DrawerLocationTextStyle>{token ? stateregion:''}</DrawerLocationTextStyle></DrawerItemStyle>                
                </DrawerLocationViewStyle>
                { token ? 
                <TouchableOpacity  onPress={ () => Alert.alert(
                                    "LVLD", "Are you sure you want to sign out from LVLD",
                                    [ { text: "Sign Out", onPress: () => {
                                            signOutDispatch(signOutAction());
                                            navigation.navigate("Welcome");
                                        }
                                        },
                                    { text: "Cancel", style: "cancel" } ],
                                    { cancelable: false } ) } >
                    <DrawerItemStyle><DrawerTextStyle>Sign Out</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>
            :
                <TouchableOpacity  onPress={ () => navigation.navigate("SignUp", { confirmation: false }) } >
                    <DrawerItemStyle><DrawerTextStyle>Sign Up</DrawerTextStyle><Icon  name="chevron-right"  size={26} /></DrawerItemStyle>
                </TouchableOpacity>
                }
            </TopContainer>
            <BottomView>
                <DrawerTextStyle>App Version 1.00.22</DrawerTextStyle>
            </BottomView> 
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
`
const TopContainer = styled.View`
    flex: 1;
    margin-top: 10px;
`
const TouchableOpacity = styled.TouchableOpacity`
`
const DrawerItemStyle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-color: #979797;
    border-bottom-width: 1px;
    margin:10px;
    padding-left: 20px;
    padding-bottom: 10px;
`
const DrawerTextStyle = styled.Text`
    font-family: "Montserrat";
`
const GeolocationView = styled.View` 
        flex-direction: row;
`
const TooltipBtn = styled.TouchableOpacity`
    width:18px;
    height:18px;
    justify-content: center;
    align-items: center;
    background-color:#bbb;
    border-radius: 10px;
`
const TooltipText = styled.Text`
    font-family: "Montserrat";
    color : #fff;
`
const DrawerTextStyleDisable = styled(DrawerTextStyle)`
    color: #ccc;
`
const DrawerLocationTextStyle = styled.Text`
font-family: Montserrat;
font-weight: bold;
color: #d2a747;
margin-bottom:8px;
`
const DrawerLocationViewStyle = styled.View`
margin-top:3px;
`
const BottomView = styled.View`
align-items: center;
margin-bottom: ${props => props.os === 'android' ? 10 + 'px' : 10 + 'px'};
`