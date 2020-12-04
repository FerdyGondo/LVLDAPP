import React from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import ChevronIcon from '../../assets/svg/ChevronIcon'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const data = [{name: "Jason S.", account: true},{name: "Peter Cho.", account: true},{name: "Brandt L.", account: true},{name: "Reed H.", account: true},{name: "Shane S.", account: false}]

export default function index() {
    const renderItem = ({ item }) => {
        return (
            <RenderItem>
                <NameText>{item.name}</NameText>
                <LeftContainer>
                    {
                        item.account ? (
                            <>
                            <ChevronContainer><ChevronIcon width={18} /></ChevronContainer>
                            <AccountText>Account Confirmed</AccountText>
                            <PriceText>+$10</PriceText>
                            </>
                        ) : (
                            <>
                            <AccountText>Pending</AccountText>
                            <ResetContainer><AccountWhiteText>Resend Link</AccountWhiteText></ResetContainer>
                            </>
                        )
                    }
                </LeftContainer>
            </RenderItem>
        )
    }
    
  return (
    <Container>
      <Profile>
        <ProfileComponent />
      </Profile>
      <MainContainer 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
const Profile = styled.View`
  border-color: #979797;
  border-bottom-width: 1px;
`
const MainContainer = styled.FlatList`
`
const RenderItem = styled.View`
    flex-direction: row;
    padding: 20px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    border-color: #979797;
    border-bottom-width: 1px;
`
const NameText = styled.Text`
    font-family: "Montserrat";
    color: #000000;
    font-weight: 700;
    font-size: 14px;
    line-height: 14.63px;
`
const LeftContainer = styled.View`
    flex-direction: row;
    background-color: #fff;
    align-items: center;
`
const AccountText = styled(NameText)`
    font-size: 10px;
    line-height: 12.19px;
    margin-right: 5px;
`
const PriceText = styled(NameText)`
    color: #00BC13;
    font-size: 10px;
    line-height: 12.19px;
`
const ResetContainer = styled.View`
    background-color: #C29A41;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 5px;
    border-radius: 10px
`
const AccountWhiteText = styled(PriceText)`
    color: #ffffff;
`
const ChevronContainer = styled.View`
    margin-right: 5px;
`