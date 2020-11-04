import React, { ReactElement } from 'react';

import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={30} color={"#000"} />;
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { useNavigation } from '@react-navigation/native'

const data = [{ id: 0, name: "Add Fund", screen: "AddFund"}, { id: 1, name: "Transaction History", screen: ""}, { id: 2, name: "Invite Friends: Get Rewards", screen: ""}, { id: 3, name: "Account Settings", screen: "Settings"}, { id: 4, name: "Notification Settings", screen: ""}, { id: 5, name: "Sign Out", screen: ""},{id: 6, name: "Cash Out", screen: ""}]
import { Icon } from 'react-native-elements';

type FlatProps = {
  item: any;
}

const Account = React.memo((): ReactElement => {
  const navigation = useNavigation()
  const renderCardItem = ({ item, index }: FlatProps) => {
    return (
      <CardContainer onPress={() => navigation.navigate(item.screen)}>
        <CardText>
          <LeftText>{item.name}</LeftText>
          {index === 0 ? (
            <IconContainer>
              <Icon name="plus" type={"antdesign"} size={10} />
            </IconContainer>
          ) : (
            myIcon
          )}
        </CardText>
      </CardContainer>
    )
  }
  return (
    <Container>
    
      <ShadowContainer>
        <MainContainer>
          <TopContainer>
            <BoldText>17,000</BoldText>
            <Bottom>LVLD POINTS</Bottom>
          </TopContainer>
          <ProfileContainer>
            <ProfileIcon width={70} />
            <MainText>Peter{" "}<SubText>Cho</SubText></MainText>
          </ProfileContainer>
          <BottomContainer>
            <BoldText>$1,000</BoldText>
            <Bottom>BALANCE</Bottom>
          </BottomContainer>
        </MainContainer>
        </ShadowContainer>
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCardItem}
        />
    </Container>
  )
})

export default Account

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
const ShadowContainer = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: 1px 4px;
  elevation: 20;
  padding: 1px;
  margin-bottom: 10px;
`

const MainContainer = styled.View`
  flex-direction: row;
  margin: 8px 15px;
  justify-content: space-between;
`

const TopContainer = styled.View`
`
const BottomContainer = styled.View`
  align-items: flex-end;
`

const BoldText = styled.Text`
  font-size: 11px;
  font-weight: bold;
`

const Bottom = styled.Text`
  font-weight: 400;
  font-size: 11px;
`

const ProfileContainer = styled.View`
`


const MainText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`

const SubText = styled.Text`
  font-weight: 200;
`

const FlatList = styled.FlatList``

const CardContainer = styled.TouchableOpacity`
  margin: 0px 10px;
`

const CardText = styled.View`
  border-bottom-width: 0.5px;
  border-color: #3f3f3f;
  flex-direction: row;
  padding: 12px 12px;
  justify-content: space-between;
  align-items: center;
`

const LeftText = styled.Text`
  font-size: 16px;
  font-weight: 300;
`

const IconContainer = styled.View`
  background-color: #d2a747;
  margin-left: 7px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`