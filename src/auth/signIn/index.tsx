import React, 
{
    useState,
    useContext,
    useEffect
} from 'react';
import { 
    connect, 
    useSelector,
    useDispatch
 } from 'react-redux';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    SafeAreaView,
    Platform
} from 'react-native';
import {
    Text,
    Input,
    Icon
} from 'react-native-elements';
import styled from 'styled-components';
import Spacer from '../../shared/components/Spacer';
import { Auth } from 'aws-amplify';

import auth from '../../store/auth';
import {signInAction} from '../../store/authActions';
import Button from '../../shared/components/ButtonComp';
import { getGeoPermission } from '../../shared/geolocation';

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const signInDispatch = useDispatch();

    const googleIcon    = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Google-Circle_Auth.png'} ;
    const facebookIcon  = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Facebook-Circle_Auth.png'} ;
    const amazonIcon    = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Amazon-Circle_Auth.png'} ;
    const appleIcon     = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Apple-Circle_Auth.png'} ;
    
    useEffect( () => {
        if(auth.loggedIn) {
            getGeoPermission();
            navigation.navigate('Home');
        }
    });
    
    return (
    <SafeAreaViewContainer statusBarProps = { Platform.OS === "android" ? StatusBar.currentHeight+'px' : 0 } >
        <ImageBg >
            <TitleView>
                <Icon onPress={() => navigation.goBack()}  name='chevron-left' type='font-awesome' size={20} color={'#fff'} />
            </TitleView>
                <LoginText>Login</LoginText>
            <WelcomeText>Welcome Back</WelcomeText>
            <Spacer />
            <Spacer />
            <TxtInput 
                placeholder="Username" 
                value={username} 
                onChangeText= {setUsername}
                placeholderTextColor={'#ccc'} 
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer />
            <TxtInput
                secureTextEntry
                placeholder="Password" 
                value={password} 
                onChangeText= {setPassword}
                placeholderTextColor={'#ccc'} 
                autoCapitalize="none"
                autoCorrect={false}
            />

            <ErrorInput multiline={true} textAlign={'center'}>
                {auth.errorMsgIn ? <ErrorText>{auth.errorMsgIn}</ErrorText> : null }
            </ErrorInput>
            <ForgotPwdView onPress={ () => {}}>
                <ForgotPwdText>Forgot password?</ForgotPwdText>
            </ForgotPwdView>
            <Spacer />
            <Button buttonProps ={styles.loginButton} 
                    onPress={ () =>  signInDispatch(signInAction(username, password)) }>
                Login
            </Button>
            <Spacer />
            <SeparatorView>
                <Line />
                <SeparationText>   OR   </SeparationText>
                <Line />
            </SeparatorView>
            <Spacer />
            <IconView>
                <TouchableOpacity  onPress={ () => Auth.federatedSignIn({provider: 'Google'}) }  >
                    <IconFed source = {googleIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => Auth.federatedSignIn({provider: 'Facebook'}) }  >
                    <IconFed source = {facebookIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => Auth.federatedSignIn({provider: 'Amazon'}) }  >
                    <IconFed source = {amazonIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => Auth.federatedSignIn({provider: 'Apple'}) }  >
                    <IconFed source = {appleIcon}/>
                </TouchableOpacity>
            </IconView>
            <Spacer />
            <Button buttonProps ={styles.browseButton}  onPress={ () => navigation.navigate('Home')} >
                Browse the App
            </Button>
            <Spacer />
        </ImageBg>
    </SafeAreaViewContainer>
    );
}

const SafeAreaViewContainer= styled.SafeAreaView`
    flex: 1;
    background-color: #252525;
    padding-top: ${props => props.statusBarProps};
`
const ImageBg = styled.ImageBackground`
    flex: 1;
    resize-mode : cover;
    justify-content:space-around;
    align-items: center;
    background-color:#252525;
`
const TitleView = styled.View`
    align-self : flex-start;
    margin-left: 20px;
`
const LoginText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  font-family: Montserrat-Medium;
`
const WelcomeText = styled.Text`
  font-size: 32px;
  color: #d2a747;
  font-family: Montserrat-Medium;
`
const ForgotPwdView = styled.TouchableOpacity`
    align-self: center;
    margin-right: 40px;
`
const ForgotPwdText = styled.Text`
    font-size: 13px;
    color: #fff;
    font-family: Montserrat;
`
const ErrorInput = styled.View`
    width: 350px;
    height: 80px;
`
const ErrorText = styled.Text`
        font-size: 16px;
        font-weight: bold;
        color: red;
        margin : 10px;
        font-family: Montserrat;
        text-align: center;
`
const SeparatorView = styled.View`
    flex-direction: row;
    width: 350px;
    align-items: center;
`
const Line = styled.View `
    flex : 1;
    height: 1px;
    background-color: #fff;
`
const SeparationText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-family: Montserrat;
`
const TxtInput = styled.TextInput`
    border-radius: 30px;
    background-color: #fff;
    width: 350px;
    height: 45px;
    padding-left:20px;
`  
const IconView = styled.View`
    flex-direction: row;
`
const IconFed = styled.Image`
    width: 43px;
    height:43px;
`
const styles = ({
    loginButton:{
        borderWidth: 0,
        backgroundColor: '#d2a747', 
    },
    browseButton:{
        borderWidth: 0,
        backgroundColor: '#979797',
    },
    link:{
        color: 'white'
    }
})

export default SignInScreen;
