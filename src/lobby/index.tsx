import React, { useState, useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { useSelector, useDispatch } from 'react-redux'
import Actions from '../../actions'
import Loading from '../shared/components/Loading'

const {width,height} = Dimensions.get("window")

const messages = [{userId: "rhazen", name: "Reed H.", message: "Who is ready to play?", createdAt: Date.now()},{userId: "jspaits", name: "Jason S.", message: "Been practicing all day", createdAt: Date.now()},{userId: "eumeh", name: "Ebuka U.", message: "Who is ready to play?", createdAt: Date.now()}]

const userId = "eumeh";
type Props = {
    route: () => {};
}

export default function index({ route, navigation }: Props) {
    const [lobby, setLobby] = useState("lobby")
    const { entry, lobbyItem } = route?.params
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.list)
    const [message, setMessage] = useState('')
    const [messaged, setMessaged] = useState(messages)

    useEffect(() => {
        dispatch(Actions.users.fetchUsers.trigger())
    },[])

    const lobbySwitch = (data: string): void => {
        setLobby(data)
    }

    const onSubmit = () => {
        if (!message) return 
        const formData = {
            userId: "eumeh",
            name: "Ebuka U.",
            message: message,
            createdAt: Date.now()
        }
        setMessaged(messaged => ([...messaged,formData, ]))
        setMessage('')
        
    }

    const isUser = (item: {}) => {
        return item.userId === userId;
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

    const renderMessageList = ({ item }) => {
        return (
            <MessageTextContainer>
                {!isUser(item) ? (
                    <>
                    <MessageName>{item.name}</MessageName>
                    <MessageContainer>
                            <ProfileIcon width={38} />
                            <MessageBorderContainer>
                                <MessageText>{item.message}</MessageText>
                            </MessageBorderContainer>
                    </MessageContainer>
                    </>
                ) : (
                    <PetashContainer>
                            <MessageBorderContainer isUser={isUser(item)}>
                                <MessageText isUser={isUser(item)}>{item.message}</MessageText>
                            </MessageBorderContainer>
                    </PetashContainer>
                )}
            </MessageTextContainer>

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
            data={mappedData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
        />
        }
        return (
            <>
            <List 
                    data={messaged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMessageList}
                />
            <BoxContainer>
                <EnterMessage placeholder={'Enter Message'} onChangeText={(text) => setMessage(text)} value={message} />
                <SendContainer onPress={() => onSubmit()}>
                    <MessageText color={'white'}>Send</MessageText>
                </SendContainer>
            </BoxContainer>
            </>
        )
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
                                <ProfileIcon width={14}/>
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
                <ContestContainer>
                    <ContestText>Contest Ends In:</ContestText>
                </ContestContainer>
                <LowerContainer>
                    <BigSizeContainer>
                        <BigUpperText>01</BigUpperText>
                        <BigLowerText>HOURS</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>40</BigUpperText>
                        <BigLowerText>MINUTES</BigLowerText>
                    </BigSizeContainer>
                    <BigSizeContainer>
                        <BigUpperText>32</BigUpperText>
                        <BigLowerText>SECONDS</BigLowerText>
                    </BigSizeContainer>
                </LowerContainer>
                <LobbyContainer>
                    <LobbyMainContainer onPress={() => lobbySwitch("lobby")} lobby={lobby}>
                        <FirstText lobby={lobby}>{`Lobby`}</FirstText>
                    </LobbyMainContainer>
                    <ChatMainContainer onPress={() => lobbySwitch("chat")} lobby={lobby}>
                        <SecondText lobby={lobby}>{`Chat`}</SecondText>
                    </ChatMainContainer>
                </LobbyContainer>
                {renderItem()}
                <BottomContainer>
                    <OwnerContainer>
                        <Profile>
                            <ProfileIcon width={30} />
                        </Profile>
                        <LvdContainer>
                            <ProfileName>Peter C.</ProfileName>
                        </LvdContainer>
                    </OwnerContainer>
                    <Practice>
                        <NameText>Practice</NameText>
                    </Practice>
                    <Play onPress={() => navigation.navigate("Placeholder", { lobbyItem: lobbyItem, entry: entry, users: mappedData()})}>
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
const LobbyMainContainer = styled.TouchableOpacity`
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
const MessageContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const PetashContainer = styled.View`
    align-items: flex-end;
`
const MessageTextContainer = styled.View`
    margin: 15px 25px 0px;
`
const MessageBorderContainer = styled.View`
    background-color: ${props => props.isUser ? "#000" : "#D6D6D6"};
    padding: 10px;
    margin-left: 10px;
    border-radius: 5px;
    
`
const MessageName = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 12px;
    opacity: 0.4;
    margin: 0px 55px 3px;
`
const MessageText = styled.Text`
    font-family: "Montserrat-Medium";
    font-size: 12px;
    color: ${props => props.color === "white" || props.isUser ? "#fff" : "#000"}
`
const BoxContainer = styled.View`
    padding: 10px 20px;
    background-color: #D6D6D6;
    flex-direction: row;
    align-items: center;
`
const EnterMessage = styled.TextInput`
    background-color: #fff;
    flex: 1;
    height: 40px;
    border-radius: 20px;
    padding-left: 10px;
`
const SendContainer = styled.TouchableOpacity`
    margin-left: 15px;
    background-color: #000;
    padding: 10px 15px;
    border-radius: 20px;
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