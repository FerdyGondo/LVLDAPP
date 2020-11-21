import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import MessageComponent from '../shared/components/MessageComponent'

const {width,height} = Dimensions.get("window")

  const userId = "jjimmy";
    type Props = {
        route: () => {};
    }

export default function index({ route }: Props) {
    const [leaderboard, setLeaderboard] = useState("leaderboard")
    const {entry, lobbyItem, users} = route?.params
    const [currentIndex, setCurrentIndex] = useState(0)

    const leaderboardSwitch = (data: string): void => {
        setLeaderboard(data)
    }

    useEffect(() => {
        getUserIndex()
    },[])
    const getUserIndex = () => {
        return users.find((data, index) => {
            if (data.userId === userId) {
                setCurrentIndex(index+1)
            }
        } )
    }

    const abbreviateData = (name) => {
        let names = name.split(" ")
        const firstName = names[0]
        const lastName = names[1].split("")[0]
        return `${firstName} ${lastName}.`
    }

    const renderList = ({ item, index }) => {
        return (
            <RenderContainer userId={item.userId} index={index}>
                <LvdContainer>
                    <NameTextContainer>
                        <NameText userId={item.userId} index={index}>{++index}</NameText>
                    </NameTextContainer>
                    <Profile>
                        <ProfileIcon width={32} />
                    </Profile>
                    <EbukaText userId={item.userId} index={index}>{abbreviateData(item.userName)}</EbukaText>
                </LvdContainer>
                <ScorePoint>
                    <ScoreText userId={item.userId} index={index}>{`${item.userFunds} pts`}</ScoreText>
                </ScorePoint>
            </RenderContainer>
        )
    }

    function compare(a, b) {
        const priceA = parseFloat(a.userFunds.toUpperCase());
        const priceB = parseFloat(b.userFunds.toUpperCase());

        let comparison = 0;
        if (priceA > priceB) {
            comparison = -1;
        } else if (priceA < priceB) {
            comparison = 1
        }
        return comparison;
    }

    const renderRequest = () => {
        if (leaderboard === "leaderboard") {
            return <List 
            data={users.sort(compare)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
        />
        } else {
            return <MessageComponent />
        }
    }

    return (
        <Container>
            <ProfileHeader>
                <ProfileContainer>
                    <ImageContainer>
                        <Image source={require('../../assets/images/shoes/sneakers.png')} />
                    </ImageContainer>
                    <NameContainer>
                        <NameText>{lobbyItem.name}</NameText>
                        <SubListContainer>
                            <ProfileContainer>
                                <ProfileIcon width={12}/>
                            </ProfileContainer>
                            <ListText>{lobbyItem.requiredParticipants}</ListText>
                        </SubListContainer>
                    </NameContainer>
                </ProfileContainer>
                <ProfileContainer>
                    <EntryContainer>
                        <EntryRow>
                            <EntryText>{`Entry: $${entry}.00`}</EntryText>
                        </EntryRow>
                        <EntryRow>
                            <StartText>{`End: ${lobbyItem.endTime[0]} 12/04`}</StartText>
                        </EntryRow>
                    </EntryContainer>
                </ProfileContainer>
            </ProfileHeader>
                <LeaderBoardContainer>
                    <LeaderBoardMainContainer onPress={() => leaderboardSwitch("leaderboard")} leaderboard={leaderboard}>
                        <FirstText leaderboard={leaderboard}>{`Leaderboard`}</FirstText>
                    </LeaderBoardMainContainer>
                    <ChatMainContainer onPress={() => leaderboardSwitch("chat")} leaderboard={leaderboard}>
                        <SecondText leaderboard={leaderboard}>{`Chat`}</SecondText>
                    </ChatMainContainer>
                </LeaderBoardContainer>
                {renderRequest()}
                <BottomContainer>
                    <IndexContainer>
                        <CurrentName>{currentIndex}</CurrentName>
                    </IndexContainer>
                    <OwnerContainer>
                        <Profile>
                            <ProfileIcon width={30} />
                        </Profile>
                        <LvdContainer>
                            <ProfileName>Peter C.</ProfileName>
                        </LvdContainer>
                    </OwnerContainer>
                    <Practice>
                        <BottomText>Practice</BottomText>
                    </Practice>
                    <Play>
                        <BottomText play={true}>{`${entry}/3`}</BottomText>
                    </Play>
                </BottomContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const ProfileHeader = styled.View`
    flex-direction: row;
    padding: 10px 20px;
    justify-content: space-between;
`
const NameContainer = styled.View`
    margin: 0px 20px;
`
const EntryContainer = styled.View`
    justify-content: center;
`
const EntryRow = styled.View`
`
const NameText = styled.Text`
    font-family: "Montserrat-ExtraBold";
    font-size: 12px;
    color: ${props => props.userId === userId || props.index === 0 ? "#fff" : "#000"};
`
const EntryText = styled.Text`
    font-family: "Montserrat";
    font-size: 12px;
    align-items: center;
`
const StartText = styled.Text`
    font-family: "Montserrat-Bold"
    font-size: 10px;
    color: #ff0000;
`
const ImageContainer = styled.View`
    width: ${width * 0.16}px;
    height: 36px;
`
const Image = styled.Image`
    align-self: center;
    width: 100%;
    height: 100%;
`
const SubListContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 1px;
`
const ListText = styled.Text`
    font-family: "Montserrat-Medium";
    opacity: 0.8;
    font-size: 12px;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    margin-right: 5px;
`
const LeaderBoardContainer = styled.View`
  background-color: #fff;
  padding: 14px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-color: #3f3f3f;
  border-top-width: 0.7px;
  border-bottom-width: 0.7px;
`
const LeaderBoardMainContainer = styled.TouchableOpacity`
  background-color: ${props => props.leaderboard === "leaderboard" ? "#000" : "#fff"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-width: 0.5px;
  border-color: #3f3f3f;
  width: ${width/2.3}px;
`
const ChatMainContainer = styled(LeaderBoardMainContainer)`
  background-color: ${props => props.leaderboard === "leaderboard" ? "#fff" : "#000"};
`
const FirstText = styled.Text`
  font-size: 16px;
  color: ${props => props.leaderboard === "leaderboard" ? "#fff" : "#000"};
  font-family: "Montserrat-Medium"
`
const SecondText = styled(FirstText)`
  color: ${props => props.leaderboard === "leaderboard" ? "#000": "#fff"};
`
const List = styled.FlatList`
`
const RenderContainer = styled.View`
    flex-direction: row;
    border-bottom-width: 0.7px;
    border-color: #3f3f3f;
    padding: 10px 27px;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.index === 0 ? "#d2a747" : props.userId === userId ? "#00AADE" : "#fff"}
`
const LvdContainer = styled.View`
   flex-direction: row;
   align-items: center;
`
const Profile = styled.View`
    margin: 0px 10px 0px 5px;
    background-color: #fff;
    border-radius: 20px;
`
const NameTextContainer = styled.View`
    width: 25px;
`
const ScorePoint = styled.View`
`
const EbukaText = styled.Text`
    font-family: "Montserrat-Bold";
    color: ${props => props.userId === userId || props.index === 1 ? "#fff" : "#000"};
`
const ScoreText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 12px;
    color: ${props => props.userId === userId || props.index === 1 ? "#fff": "#000"};
`
const BottomContainer = styled.View`
    flex-direction: row;
    background-color: #252525;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;

`
const OwnerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 34px;
`
const Play = styled.TouchableOpacity`
    background-color: #D2A747;
    justify-content: center;
    align-items: center;
    width: 90px;
    border-radius: 30px;
    height: 25px;
`
const Practice = styled(Play)`
    background-color: #D6D6D6;
    left: 10%;
`
const ProfileName = styled(NameText)`
    color: #ffffff;
`
const BottomText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 10px;
    ${({ play }) => play && `
        color: #ffffff;
    `}
`
const IndexContainer = styled.View`
    position: absolute;
    left: 26px;
`
const CurrentName = styled.Text`
    font-family: "Montserrat-ExtraBold";
    font-size: 12px;
    color: #fff;
`