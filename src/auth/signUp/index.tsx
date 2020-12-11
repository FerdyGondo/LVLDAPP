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
import {signUpAction} from '../../store/authActions';
import auth from '../../store/auth';
import Button from '../../shared/components/ButtonComp';

const SignUpScreen = ({navigation}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname]   = useState('');
    const [username, setUsername]   = useState('');
    const [email,    setEmail]      = useState('');
    const [password, setPassword]   = useState('');
    const auth = useSelector(state => state.auth);
    const signUpDispatch = useDispatch();

    const googleIcon    = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Google-Circle_Auth.png'} ;
    const facebookIcon  = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Facebook-Circle_Auth.png'} ;
    const amazonIcon    = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Amazon-Circle_Auth.png'} ;
    const appleIcon     = { uri: 'https://lvld-content.s3-us-west-1.amazonaws.com/login-screen/Apple-Circle_Auth.png'} ;

    useEffect( () => {
        if(auth.loggedIn) navigation.navigate('drawer');
    });

    return (
        <SafeAreaViewContainer statusBarProps = { Platform.OS === "android" ? StatusBar.currentHeight+'px' : 0 } >
        <ImageBg >
            <TitleView>
                <Icon onPress={() => navigation.goBack()}  name='chevron-left' type='font-awesome' size={20} color={'#fff'} />
            </TitleView>
                <LoginText>Sign Up</LoginText>
            <WelcomeText>Welcome</WelcomeText>
            <Spacer />
            <Spacer />
            <TopInputView>
                <TopTxtInput 
                    placeholder="First Name" 
                    value={firstname} 
                    onChangeText= {setFirstname}
                    autoCorrect={false} />
                <Spacer />
                <TopTxtInput 
                    placeholder="Last Name" 
                    value={lastname} 
                    onChangeText= {setLastname}
                    autoCorrect={false} />
            </TopInputView>
            <Spacer />
            <TxtInput 
                placeholder="Username" 
                value={username} 
                onChangeText= {setUsername}
                autoCapitalize="none"
                autoCorrect={false} />
            <Spacer />
            <TxtInput
                placeholder="Email" 
                value={email} 
                onChangeText= {setEmail}
                autoCapitalize="none"
                autoCorrect={false} />
            <Spacer />
            <TxtInput
                secureTextEntry
                placeholder="Password" 
                value={password} 
                onChangeText= {setPassword}
                autoCapitalize="none"
                autoCorrect={false} />
            <Spacer />
            <Spacer />
            <Button buttonProps ={styles.loginButton} 
                    onPress={ () =>  signUpDispatch(signUpAction(firstname, lastname, username, email, password)) }>
                Sign Up
            </Button>
            <ErrorView multiline={true}>
                {auth.errorMsgUp ? <ErrorText>{auth.errorMsgUp}</ErrorText> : null }
            </ErrorView>
            <SeparatorView>
                <Line />
                <SeparationText>   OR   </SeparationText>
                <Line />
            </SeparatorView>
            <Spacer />
            <IconView>
            <IconView>
                <TouchableOpacity  onPress={ () => {} }  >
                    <IconFed source = {googleIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => {} }  >
                    <IconFed source = {facebookIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => {} }  >
                    <IconFed source = {amazonIcon}/>
                </TouchableOpacity>
                <Spacer /><Spacer />
                <TouchableOpacity  onPress={ () => {} }  >
                    <IconFed source = {appleIcon}/>
                </TouchableOpacity>
            </IconView>
            </IconView>
            <Spacer />
            <Button buttonProps ={styles.browseButton}  onPress={ () => navigation.navigate('drawer')} >
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
const TopInputView = styled.View`
    flex-direction : row;
    margin-left: 35px;
    margin-right: 35px;
`
const TopTxtInput = styled.TextInput`
    border-radius: 30px;
    background-color: #fff;
    width: 165px;
    height: 45px;
    padding-left:20px;
`  
const TxtInput = styled.TextInput`
    border-radius: 30px;
    background-color: #fff;
    width: 350px;
    height: 45px;
    padding-left:20px;
`  
const ForgotPwdView = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: 40px;
`
const ForgotPwdText = styled.Text`
    font-size: 13px;
    color: #fff;
    font-family: Montserrat;
`
const ErrorView = styled.TextInput`
    width: 350px;
    height: 50px;
`
const ErrorText = styled.Text`
    font-size: 16px;
    color: red;
    margin : 30px;
    font-family: Montserrat;
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

export default SignUpScreen;