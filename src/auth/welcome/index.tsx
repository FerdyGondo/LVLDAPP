import React, 
{
    useState,
    useContext,
    useEffect
} from 'react';
import { 
    connect, 
    useDispatch
 } from 'react-redux';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import {
    Text,
    Input,
} from 'react-native-elements';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LvldLogo from '../../../assets/svg/LvldLogo';
import Spacer   from '../../shared/components/Spacer';
import Button   from '../../shared/components/ButtonComp';
import { getAuthData }   from '../../shared/utils';
import { geolocation } from '../../shared/geolocation'

const WelcomeScreen = ({navigation}) => {    
        const image = { uri: "https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/App-Entry-Bg.jpg" };
        
        useEffect(() => {
            geolocation()
        }, []);
        
        const [token, updateToken] = useState('');
        useEffect(  () => {
            (async () => {
                const token = await getAuthData('token')
                updateToken(token);
                if(token) navigation.navigate('Home');
            })()
        });

    return (
          <Container>
            <ImageBg source={image}>
                <LvldLogo width={125} />
                <Spacer />
                <Spacer />
            </ImageBg>
            <LowerContainer>
                <Button buttonProps ={styles.signUpButton} onPress={ () => navigation.navigate('SignUp', { confirmation: false } )}>
                    Sign Up
                </Button>
                <Spacer />
                <Button buttonProps ={styles.loginButton} onPress={ () => navigation.navigate('SignIn')}>
                    Login
                </Button>
                <Spacer />
                <Spacer />
                <Button buttonProps ={styles.browseButton} onPress={ () => navigation.navigate('Home')}>
                    Browse the App
                </Button>
                <Spacer />
            </LowerContainer>
        </Container>
        
    );
}

const Container = styled.View`
    flex: 1;
`
const ImageBg = styled.ImageBackground`
    flex: 2;
    resize-mode : cover;
    justify-content:flex-end;
    align-items: center;
`
const LowerContainer = styled.View`
    flex: 1;
    justify-content:space-around;
    align-items: center;
    background-color:#252525;
`
const styles = ({
    signUpButton:{
        borderWidth: 2,
        backgroundColor: '#252525', 
        marginLeft:0
    },
    loginButton:{
        borderWidth: 0,
        backgroundColor: '#d2a747', 
        marginLeft:0
    },
    browseButton:{
        borderWidth: 0,
        backgroundColor: '#979797',
        marginLeft:0 
    }
})

export default WelcomeScreen;