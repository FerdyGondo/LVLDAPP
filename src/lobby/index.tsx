import React, { useState, useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { useSelector, useDispatch } from 'react-redux'
import Actions from '../sagas/actions'
import Loading from '../shared/components/Loading'
import MessageComponent from '../shared/components/MessageComponent'
import RedContainer from '../shared/components/RedContainer'
import { getAuthData, convertDate, useTimer }   from '../shared/utils';

const {width,height} = Dimensions.get("window")

const userId = "eumeh";
type Props = {
    route: () => {};
}

export default function index({ route, navigation }: Props) {
    const [lobby, setLobby] = useState("lobby")
    const { entry, lobbyItem } = route?.params
    const data = lobbyItem;
    const [contestUsers, setContestUsers] = useState([])
    const dispatch = useDispatch()
    const users = useSelector(state => state.contest.user)
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [focusInput, setFocusInput] = useState(false)
    useEffect(  () => {
        (async () => {
            const firstname = await getAuthData('firstname')
            setFirstname(firstname);
            const lastname = await getAuthData('lastname')
            setLastname(lastname);
        })()
    },[]);

    console.log('users', users)

    useEffect(() => {
        dispatch(Actions.contests.fetchContestUsers.trigger({ _id: data._id }))
    },[])

    const lobbySwitch = (data: string): void => {
        setLobby(data)
    }
    
    const result = useTimer(data)

    const formatTime = (data, apendder) => {
        let result 
        const newData = data.find((item, index) => item.interval === apendder);
        if (!newData) {
            return result = "00"
        } else if(newData.timeLeft  < 10) {
            result = `0${newData.timeLeft }`
        } else {
            result = newData.timeLeft 
        }
        return result
    }


    const renderList = ({ item }) => {
        return (
            <RenderContainer>
                <ProfileIcon width={30} />
                <LvdContainer>
                    <PlayerName>{item.userName}</PlayerName>
                </LvdContainer>
            </RenderContainer>
        )
    }

    const mappedData = () => {
        return users.reduce((acc, curr) => {
            return acc.concat(curr.account)
        },[])
    }

    if (!users) return <Loading />

    const renderItem = () => {
        if (lobby === "lobby") {
            return <List 
            data={contestUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
        />
        }
        return <MessageComponent setFocusInput={setFocusInput} />
    }

    const lobbySwitchFunction = (data) => {
        lobbySwitch(data)
        setFocusInput(false)
    }

    const headContainer = () => {
        if (focusInput && height < 700) return null
        return (
            <>
             <ProfileHeader>
                <ProfileContainer>
                    <ImageContainer>
                        <Image source={{ uri: lobbyItem.product.mainImage.asset.url }} />
                    </ImageContainer>
                    <NameContainer>
                        <NameText>{lobbyItem.product.name}</NameText>
                        <SubListContainer>
                            <ProfileContainer>
                                <ProfileIcon width={14}/>
                            </ProfileContainer>
                            <ListText>{`25/40`}</ListText>
                        </SubListContainer>
                    </NameContainer>
                </ProfileContainer>
                <ProfileContainer>
                    <EntryContainer>
                        <EntryRow>
                            <EntryText>{`Entry: $${entry}.00`}</EntryText>
                        </EntryRow>
                        <EntryRow>
                            <StartText>{`End: ${convertDate(lobbyItem.finishDateTime)}`}</StartText>
                        </EntryRow>
                    </EntryContainer>
                </ProfileContainer>
            </ProfileHeader>
                <ContestContainer>
                    <ContestText>Contest Ends In:</ContestText>
                </ContestContainer>
                <LowerContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, 'hours')}</BigUpperText>
                        <BigLowerText>HOURS</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, 'minutes')}</BigUpperText>
                        <BigLowerText>MINUTES</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>{formatTime(result, 'seconds')}</BigUpperText>
                        <BigLowerText>SECONDS</BigLowerText>
                    </BigSizeContainer>
                </LowerContainer>
            </>
        )
    }

    return (
        <Container>
                {headContainer()}
                <LobbyContainer>
                    <TouchableWithoutFeedback onPress={() => lobbySwitchFunction("lobby")} >
                        <LobbyMainContainer lobby={lobby}>
                            <FirstText lobby={lobby}>{`Lobby`}</FirstText>
                        </LobbyMainContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => lobbySwitchFunction("chat")} >
                        <ChatMainContainer lobby={lobby}>
                            <SecondText lobby={lobby}>{`Chat`}</SecondText>
                            {
                                lobby === 'lobby' && <RedContainer />
                            }
                        </ChatMainContainer>
                    </TouchableWithoutFeedback>
                </LobbyContainer>
                {renderItem()}
                <BottomContainer>
                    <OwnerContainer>
                        <Profile>
                            <ProfileIcon width={30} />
                        </Profile>
                        <LvdContainer>
                    <ProfileName>{firstname+" "+lastname}</ProfileName>
                        </LvdContainer>
                    </OwnerContainer>
                    <Practice>
                        <NameText>Practice</NameText>
                    </Practice>
                    <Play onPress={() => navigation.navigate("Placeholder", { lobbyItem: lobbyItem, entry: entry, users: contestUsers})}>
                        <NameText play={true}>{`${entry}/3`}</NameText>
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
    border-bottom-width: 0.4px;
    border-bottom-color: #000;
    flex-direction: row;
    padding: 10px 20px;
    justify-content: space-between;
`
const NameContainer = styled.View`
    margin: 0px 20px;
    margin-top: 3px;
`
const EntryContainer = styled.View`
    justify-content: center;
`
const EntryRow = styled.View`
    
`
const ContestContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`
const ContestText = styled.Text`
    height: 24px;
    font-size: 20px;
    font-family: "Montserrat"
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 10px;
    ${({ play }) => play && `
        color: #ffffff;
    `}
`
const PlayerName = styled(NameText)`
    font-size: 12px;
`
const ProfileName = styled(PlayerName)`
    color: #ffffff;
`
const EntryText = styled.Text`
    font-family: "Montserrat";
    font-size: 10px;
    align-items: center;
    line-height: 15px;
`
const StartText = styled.Text`
    font-family: "Montserrat-Bold"
    font-size: 10px;
    color: #ff0000;
`

const SizeContainer = styled.View`
    width: 50px;
    height: 50px;
    background-color: #000;
    border-radius: 10px;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
`
const SizeTextLower = styled.Text`
    color: #fff;
    font-family: "Montserrat-ExtraBold"
    font-size: 16px;
    top: -2px;
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
    margin-top: 3px;
`
const ListText = styled.Text`
    font-family: "Montserrat";
    font-size: 12px;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    margin-right: 5px;
`
const LowerContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 30px 12px;
`
const BigSizeContainer = styled(SizeContainer)`
    width: 90px;
    height: 85px;
    border-radius: 15px;
`
const BigUpperText = styled(SizeTextLower)`
    font-size: 55px;
    font-family: "Montserrat"
`
const BigLowerText = styled(BigUpperText)`
    font-size: 12px;
    top: -7px;
    font-family: "Montserrat-Medium";
    opacity: 0.8;
`
const LobbyContainer = styled.View`
  background-color: #fff;
  padding: 14px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-color: #3f3f3f;
  border-top-width: 0.7px;
  border-bottom-width: 0.7px;
`
const LobbyMainContainer = styled.View`
  background-color: ${props => props.lobby === "lobby" ? "#000" : "#fff"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-width: 0.5px;
  border-color: #3f3f3f;
  width: ${width/2.3}px;
`
const ChatMainContainer = styled(LobbyMainContainer)`
  background-color: ${props => props.lobby === "lobby" ? "#fff" : "#000"};
`
const FirstText = styled.Text`
  font-size: 16px;
  color: ${props => props.lobby === "lobby" ? "#fff" : "#000"};
  font-family: "Montserrat-Medium"
`
const SecondText = styled(FirstText)`
  color: ${props => props.lobby === "lobby" ? "#000": "#fff"};
`
const List = styled.FlatList`
`
const RenderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 0.7px;
    border-color: #3f3f3f;
    padding: 12px 25px;
`
const LvdContainer = styled.View`
    margin-left: 10px;
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
    left: 20px;
`
const BottomContainer = styled.View`
    flex-direction: row;
    background-color: #252525;
    padding: 10px 20px 10px 25px;
    justify-content: space-between;
    align-items: center;

`
const OwnerContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const Profile = styled.View`
    background-color: #fff;
    border-radius: 20px;
`
