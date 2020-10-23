import React from 'react';
import styled from 'styled-components'
import {Dimensions,Platform} from 'react-native'

const {width,height} = Dimensions.get("window")

import FontAwesome from 'react-native-vector-icons/FontAwesome';
const myIcon = <FontAwesome name="play" size={40} color="#fff" />;

const data = [{image: "https://lvld-content.s3-us-west-1.amazonaws.com/content-screen/Jordan-BG.png", name: "JORDAN 1 REVIEW", playButton: true, playBackground: "#3f3f3f"}, {image: "https://lvld-content.s3-us-west-1.amazonaws.com/content-screen/Week-2-BG.png", name: "WEEK 2 UPDATE", playButton: true, playBackground: "#fff"},{image: "https://lvld-content.s3-us-west-1.amazonaws.com/content-screen/NMD-BG.png", name: "Pharrell x Adidas Afro NMD `UNBOXING"}]

type Props = {
  navigation: () => {};
}

export default ({ navigation }: Props) => {
  const renderItem = ({ item }) => {
    return (
      <RenderContainer source={{ uri: item.image }} os={Platform.OS}>
        <NameContainer>
          <NameText>{item.name}</NameText>
        </NameContainer>
        {item.playButton && (
          <>
          <MiddleContainer>

          </MiddleContainer>
          <IconContainer onPress={() => navigation.navigate("Video")}>
          {myIcon}
        </IconContainer>
          </>
        )}
      </RenderContainer>
    )
  }
  
  return (
    <Container>
      <List 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`
const List = styled.FlatList`
`
const RenderContainer = styled.ImageBackground`
  width: ${width}px;
  height: ${props => props.os === "ios" ? `${height/4}px` :  `${height/3}px`};
  margin-top: 5px;
`
const NameContainer = styled.View`
  position: absolute;
  top: 10px;
  left: 30px;
  width: 70%;
`
const NameText = styled.Text`
   font-family: "Montserrat-ExtraBold";
   font-size: 22px;
   color: #fff;
`
const MiddleContainer = styled.View`
  width: 64px;
  height: 64px;
  background-color: #ffffff;
  position: absolute;
  left: 42%;
  top: 36%;
  opacity: 0.5;
  border-radius: 32px
`
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  left: 47%;
  top: 41%;
`