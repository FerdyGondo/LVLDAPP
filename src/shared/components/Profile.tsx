import React from 'react'
import styled from 'styled-components'
import { Icon } from 'react-native-elements';
import ProfileIcon from '../../../assets/svg/ProfileIcon'
import { useNavigation } from '@react-navigation/native'

export default function ProfileComponent() {
    const navigation = useNavigation()
    return (
        <MainContainer>
            <ProfileContainer onPress={() => navigation.navigate("Account")}>
                <Profile>
                    <ProfileIcon width={30} />
                </Profile>
                <ProfileText>Peter{" "}</ProfileText><SubText>Cho</SubText>
            </ProfileContainer>
            <MoneyContainer onPress={() => navigation.navigate("AddFund")}>
                <MoneyText>$1000</MoneyText>
                    <IconContainer>
                        <Icon name="plus" type={"antdesign"} size={10} />
                    </IconContainer>
            </MoneyContainer>
        </MainContainer>
    )
}


const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 20px;
`
const ProfileText = styled.Text`
  font-size: 13px;
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
const Profile = styled.View`
  margin-right: 7px;
`
const MoneyContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 8px;
  border-radius: 20px;
`
const MoneyText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
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
