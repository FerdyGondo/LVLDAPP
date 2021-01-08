import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window')

const CarouselItem = ({ item, navigation }) => {
    return (
        <>
        {item.id === 2 ?  
        <CardView onPress={() => navigation.navigate("Sneaker")}>
            <TextView>
                <ItemDescGold>{item.description}</ItemDescGold>
                <ItemTitleYeezy>{item.title}</ItemTitleYeezy>
                <PlayTextBGPurple>
                  <PlayText>{"PLAY NOW"}</PlayText>
                </PlayTextBGPurple>
            </TextView>
            <SneakerImageView>
                <SneakerImage source={{ uri: item.url }} />
            </SneakerImageView>
        </CardView>
        : 
        <CardView onPress={() => navigation.navigate("Sneaker")}>
            <SneakerImageView>
                <SneakerImage source={{ uri: item.url }} />
            </SneakerImageView>
            <TextView>
                <ItemDescription>{item.description}</ItemDescription>
                {item.id === 3 ?  <ItemTitleGray> {item.title}</ItemTitleGray> : <ItemTitleBlack> {item.title}</ItemTitleBlack> }
                {item.id === 3 ? 
                    <PlayTextBGBlack>
                        <PlayText>{"PLAY NOW"}</PlayText>
                    </PlayTextBGBlack>
                :
                    <PlayTextBGRed>
                        <PlayText>{"PLAY NOW"}</PlayText>
                    </PlayTextBGRed>
                }
            </TextView>
        </CardView>
        }
        </>
    )
}

const CardView = styled.TouchableOpacity`
    flex : 1;
    flex-direction : row;
    justify-content : space-around;
    width : ${width - 20}px;
    height : 60px;
    background-color : white;
    margin-left : 10px;
    margin-right : 10px;
    border-radius : 10px;
`
const TextView = styled.View`
    justify-content: center;
    align-self: center;
    margin-left:-10px;
`
const ItemDescription = styled.Text`
    color : black;
    font-size : 10px;
    font-family: "Montserrat";
    font-weight : bold;
    margin-left : 5px;
`
const ItemDescGold = styled(ItemDescription)`
    color : #B68E79;
`

const ItemTitle = styled.Text`
    font-size : 18px;
    font-family: "Montserrat";
    font-weight : 900;
`
const ItemTitleBlack = styled(ItemTitle)`
    color : black;
`
const ItemTitleGray = styled(ItemTitle)`
    color : gray;
`
const ItemTitleYeezy = styled(ItemTitle)`
    color : #59576E;
    margin-left : 5px;
`
const SneakerImageView = styled.View`
    width: ${width*0.4}px;
    height: 70px;   
    justify-content: center;
    align-items: center;
    margin-left:-10px;
`
const SneakerImage = styled.Image`
  width: 90%;
  height: 100%;
`

const MainText = styled.View`
  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
  width: 80px;
  border-radius: 30px;
  align-items: center;
`
const PlayTextBGRed = styled(MainText)`
  background-color: #950D27;
`
const PlayTextBGPurple = styled(MainText)`
  background-color: #A87195;
`
const PlayTextBGBlack = styled(MainText)`
  background-color: black;
`
const PlayText = styled.Text`
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 10px;
  color: #fff;
`
export default CarouselItem
