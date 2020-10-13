import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import {Dimensions, FlatList, View, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Actions from '../../actions'
import ProfileComponent from '../shared/components/Profile'

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-left" size={30} color="#fff" />;
import { LVLD_Header } from '../../Navigation';


const {width,height} = Dimensions.get("window")


type Prop = {
    navigation: () => {}
}

type List = {
    item: any;
    index: number;
}

const numColumns: number = 4;

const Sneaker = React.memo(({ navigation }: Prop): ReactElement => {
    const dispatch = useDispatch()
    const sneakers = useSelector(state => state.sneakers.sneaker)
    const sneaker = sneakers[0]

    useEffect(() => {
        dispatch(Actions.sneakers.fetchSneakers.trigger())
    },[])

    const [selected, setSelected] = useState<number>()
    const [gender, setGender] = useState<string>('male')

    const selectTile = (index: number): void => {
        setSelected(selected => selected = index);
        setTimeout(() => navigation.navigate("Context"), 2000)
    }

    const genderSwitch = (data: string): void => {
        setGender(data)
    }

    const renderList = ({ item, index }: List) => {
        return (
            <TileContainer key={index} tile={item.key} onPress={() => selectTile(item.key)} selected={selected} available={item.data.length !== 0} disabled={item.data.length === 0}>
                <Tile tile={item.key} selected={selected}>
                    {item.key}
                </Tile>
            </TileContainer>
           )
    }

    if (!sneaker) return <ActivityIndicator size={30} color={'#000'} />

    return (
        <Container>
            <ProfileComponent />
            <GenderContainer>
                <GenderMaleContainer onPress={() => genderSwitch("male")} gender={gender}>
                    <FirstText gender={gender}>{`Men's`}</FirstText>
                </GenderMaleContainer>
                <GenderFemaleContainer onPress={() => genderSwitch("female")} gender={gender}>
                    <SecondText gender={gender}>{`Woman's`}</SecondText>
                </GenderFemaleContainer>
            </GenderContainer>
            <SizeContainer>
                <FlatList 
                    data={sneaker.sizes}
                    keyExtractor={(item) => item.key.toString()}
                    numColumns={numColumns}
                    renderItem={renderList}
                />
            </SizeContainer>
        </Container>
    )
})

export default Sneaker;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  height: ${height}px;
`
const GenderContainer = styled.View`
  background-color: #fff;
  padding: 18px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-color: #3f3f3f;
  border-top-width: 1px;
  border-bottom-width: 1px;
`
const GenderMaleContainer = styled.TouchableOpacity`
  background-color: ${props => props.gender === "male" ? "#fff" : "#000"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-width: 1px;
  border-color: #3f3f3f;
  width: ${width/2.3}px;
`
const GenderFemaleContainer = styled(GenderMaleContainer)`
  background-color: ${props => props.gender === "male" ? "#000" : "#fff"};
`
const FirstText = styled.Text`
  font-size: 16px;
  color: ${props => props.gender === "male" ? "#000" : "#fff"};
  font-family: "Montserrat-Medium"
`
const SecondText = styled(FirstText)`
  color: ${props => props.gender === "male" ? "#fff": "#000"};
`
const SizeContainer = styled.View`
  margin: 10px 0px;
  margin-left: 20px;
`
const TileContainer = styled.TouchableOpacity`
  width: ${width/5.4}px;
  height: ${height/11}px;
  margin-bottom: 18px;
  margin-right: 16px;
  margin-top: 2px;
  margin-left: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  opacity: ${props => props.available ? 1 : 0.5};
  background-color: ${props => props.tile === props.selected ? "#fff" : "#000" };
  shadow-color: ${props => props.tile === props.selected ? "#000" : "#fff"};
  shadow-opacity: 0.3;
  shadow-offset: 2px 2px;
  elevation: 20;
`
const Tile = styled.Text`
  font-size: 24px;
  color: ${props => props.tile === props.selected ? "#000" : "#fff"};
  font-family: "Montserrat-ExtraBold";
`
