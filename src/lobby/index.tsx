import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import { useSelector, useDispatch } from 'react-redux'
import Actions from '../../actions'
import Loading from '../shared/components/Loading'

const {width,height} = Dimensions.get("window")


type Props = {
    route: () => {};
}

export default function index({ route }: Props) {
    const [lobby, setLobby] = useState("lobby")
    const { entry, item } = route?.params
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.list)

    useEffect(() => {
        dispatch(Actions.users.fetchUsers.trigger())
    },[])

    const lobbySwitch = (data: string): void => {
        setLobby(data)
    }

    const renderList = ({ item }) => {
        return (
            <RenderContainer>
                <ProfileIcon width={30} />
                <LvdContainer>
                    <NameText>{item.userName}</NameText>
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

    return (
        <Container>
            <ProfileHeader>
                <ProfileContainer>
                    <ImageContainer>
                        <Image source={require('../../assets/images/shoes/sneakers.png')} />
                    </ImageContainer>
                    <NameContainer>
                        <NameText>{item.name}</NameText>
                        <SubListContainer>
                            <ProfileContainer>
                                <ProfileIcon width={14}/>
                            </ProfileContainer>
                            <ListText>{item.requiredParticipants}</ListText>
                        </SubListContainer>
                    </NameContainer>
                </ProfileContainer>
                <ProfileContainer>
                    <EntryContainer>
                        <EntryRow>
                            <EntryText>{`Entry:`}</EntryText>
                            <EntryText>{`$${entry}.00`}</EntryText>
                        </EntryRow>
                        <EntryRow>
                            <StartText>{`Start:`}</StartText>
                            <StartText>{item.startTime[0]}</StartText>
                        </EntryRow>
                    </EntryContainer>
                </ProfileContainer>
            </ProfileHeader>
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
                <List 
                    data={mappedData()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderList}
                />
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
`
const EntryContainer = styled.View`
    justify-content: center;
    width: 90px
`
const EntryRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
`
const EntryText = styled.Text`
    font-family: "Montserrat";
    font-size: 12px;
    align-items: center;
`
const StartText = styled.Text`
    font-family: "Montserrat-Bold"
    font-size: 12px;
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
`
const ListText = styled.Text`
    font-family: "Montserrat";
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
  background-color: ${props => props.lobby === "lobby" ? "#fff" : "#000"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-width: 0.5px;
  border-color: #3f3f3f;
  width: ${width/2.3}px;
`
const ChatMainContainer = styled(LobbyMainContainer)`
  background-color: ${props => props.lobby === "lobby" ? "#000" : "#fff"};
`
const FirstText = styled.Text`
  font-size: 16px;
  color: ${props => props.lobby === "lobby" ? "#000" : "#fff"};
  font-family: "Montserrat-Medium"
`
const SecondText = styled(FirstText)`
  color: ${props => props.lobby === "lobby" ? "#fff": "#000"};
`
const List = styled.FlatList`
`
const RenderContainer = styled.View`
    flex-direction: row;
    align-items: flex-start;
    border-bottom-width: 0.7px;
    border-color: #3f3f3f;
    padding: 12px 25px;
`
const LvdContainer = styled.View`
    margin-left: 10px;
`