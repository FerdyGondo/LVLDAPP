import React, { useState } from 'react'
import ProfileComponent from '../shared/components/Profile'
import styled from 'styled-components'
import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={22} color={"#000"} />;
import { Switch } from 'react-native'

const data = [{name: "Two Step Verification", screen: "Verification"},{name: "Personal Info", screen: ""},{name: "Update Password", screen: ""},{name: "Update Email", screen: ""}]

export default function index({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const renderItem = ({ item }) => {
        return (
            <RenderContainer onPress={() => navigation.navigate(item.screen)}>
                <LeftText>{item.name}</LeftText>
                <IconContainer>
                    {myIcon}
                </IconContainer>
            </RenderContainer>
        )
    }

    return (
        <Container>
            <Profile>
                <ProfileComponent />
            </Profile>
            <ListContainer>
                <List 
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </ListContainer>
            <SwitchContainer>
                <LeftText>{isEnabled ? "Disable Face ID" : "Enable Face ID"}</LeftText>
                <Switch
                    trackColor={{ false: "#767577", true: "#D2A747" }}
                    thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </SwitchContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Profile = styled.View`
   border-bottom-width: 1px;
   border-color: #979797; 
`
const List = styled.FlatList`
`
const ListContainer = styled.View`
`
const RenderContainer = styled.TouchableOpacity`
    border-bottom-width: 1px;
    border-color: #979797;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    margin: 0px 10px;
`
const LeftText = styled.Text`
  font-family: "Montserrat";
`

const IconContainer = styled.View`
  margin-left: 7px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
const SwitchContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 0px 10px;
`
