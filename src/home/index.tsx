import React, { ReactElement } from 'react';

import styled from 'styled-components/native'
import { Icon } from 'react-native-elements';

type Props = {
  navigation: () => {}
}

const Home = React.memo(({ navigation }: Props): ReactElement => {
  return (
    <Container>
      
      <ShadowContainer>
        <MainContainer>
          <ProfileContainer onPress={() => navigation.navigate("Account")}>
            <Profile source={require('../../assets/icons/profile.png')} />
            <MainText>Peter{" "}</MainText><SubText>Cho</SubText>
          </ProfileContainer>
          <MoneyContainer>
            <MoneyText>$1000</MoneyText>
            <IconContainer>
              <Icon name="plus" type={"antdesign"} size={10} />
            </IconContainer>
          </MoneyContainer>
        </MainContainer>
        </ShadowContainer>
    </Container>
  )
})

export default Home

const Text = styled.Text`
`

const Image = styled.Image``

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
const ShadowContainer = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-offset: 1px 2px;
  elevation: 20;
  padding: 1px;
  margin: 1px;
`

const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 20px;
`

const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
`

const Profile = styled.Image`
  margin-right: 10px;
  width: 30px;
  height: 30px;
`

const MoneyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 7px;
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

const MainText = styled.Text`
  font-weight: bold;
`

const SubText = styled.Text`
  font-weight: 200;
`