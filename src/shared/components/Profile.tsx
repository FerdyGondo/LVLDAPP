import React, 
{
    useState,
    useEffect
} from 'react'
import styled from 'styled-components'
import { Icon } from 'react-native-elements';
import ProfileIcon from '../../../assets/svg/ProfileIcon'
import { useNavigation } from '@react-navigation/native'
import { getAuthData }   from '../utils';

export default function ProfileComponent() {
    const navigation = useNavigation()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    useEffect(  () => {
        (async () => {
            const firstname = await getAuthData('firstname')
            setFirstname(firstname);
            const lastname = await getAuthData('lastname')
            setLastname(lastname);
        })()
    },[]);

    const [token, updateToken] = useState('');
    useEffect(  () => {
        (async () => {
            const token = await getAuthData('token')
            updateToken(token);
        })()
    });

    return (
        <MainContainer>
          {token ? 
            <ProfileContainer onPress={() => navigation.navigate("Account")}>
                <Profile>
                    <ProfileIcon width={30} />
                </Profile>
                <ProfileText>{firstname+" "}</ProfileText><SubText>{lastname}</SubText>
            </ProfileContainer>
            :
            <ProfileContainerSignUp>
                <Profile>
                    <ProfileIcon width={30} />
                </Profile>
            </ProfileContainerSignUp>
          }
            <Money>
            {token ? <CreditText>Credits:</CreditText> : null}
              <MoneyContainer onPress={() => token ? 
                                              navigation.navigate("BuyCredit")
                                              :
                                              navigation.navigate("SignUp", { confirmation: true })
                                            }>
                <MoneyText>{token ? ' 1000' : '   Sign Up  '}</MoneyText>
                {token ?
                    <IconContainer>
                        <Icon name="plus" type={"antdesign"} size={10} />
                    </IconContainer>
                    : null
                }
            </MoneyContainer>
            </Money>
        </MainContainer>
    )
}


const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 15px;
`
const ProfileText = styled.Text`
  font-size: 12px;
  font-family: "Montserrat-Bold";
`
const SubText = styled.Text`
  font-family: "Montserrat"
`
const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
`
const ProfileContainerSignUp = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`
const Profile = styled.View`
  margin-right: 7px;
`
const Money = styled.View`
  flex-direction: row;
  align-items: center;
`
const CreditText = styled.Text`
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  right: 5px;
`
const MoneyContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 6px 10px;
  border-radius: 20px;
`
const MoneyText = styled.Text`
  color: #ffffff;
  font-size: 9.5px;
  font-weight: 700;
  font-family: "Montserrat"
`
const IconContainer = styled.View`
  background-color: #d2a747;
  margin-left: 7px;
  width: 15px;
  height: 15px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`
