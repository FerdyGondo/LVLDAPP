import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import {Dimensions, FlatList, View, ActivityIndicator} from 'react-native'
import ProfileComponent from '../shared/components/Profile'
import Loading from '../shared/components/Loading'
import SizeModal from '../shared/components/SizeModal'
import {getData} from '../shared/utils'
import { useQuery, GET_ALL_CONTESTS } from '../graphql/query'
import { variantEntries } from '../shared/data'

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-left" size={30} color="#fff" />;
import { LVLD_Header } from '../../Navigation';
const SIZE = '@saved_size';
const SHOWSIZE = '@show_size';

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
    const {loading, error, data} = useQuery(GET_ALL_CONTESTS)
    const [modalVisible, setModalVisible] = useState(false)
    const [sizeText, setSizeText] = useState()
    const [item, setItem] = useState()
    const [buttonState, setButtonState] = useState({ color: "#000000", background: "#ffffff"})

    useEffect(() => {
      (async () => {
        const showSize = await getData(SIZE)
        setSizeText(showSize)
        if (showSize && !loading) {
          const mappedData = favouredData()
          const newData = mappedData.find((data, index) => data.variant === showSize)
          navigation.navigate("Context", { items: newData})
        }
      })()
    },[data, loading])

    const [selected, setSelected] = useState<number>()
    const [gender, setGender] = useState<string>('male')

    const sizeModal = () => {

      navigation.navigate("Context", { items: item })
    }

    const selectTile = async (item: object): void => {
        setSelected(selected => selected = item.variant);
        setItem(item)
        const result = await getData(SHOWSIZE)
        if(result) {
          navigation.navigate("Context", { items: item})
        } else {
          setModalVisible(true)
        }
    }

    const genderSwitch = (data: string): void => {
        setGender(data)
    }

    function compare(a, b) {
      const variantA = parseFloat(a.variant);
      const variantB = parseFloat(b.variant);

      let comparison = 0;
      if (variantA > variantB) {
          comparison = 1;
      } else if (variantA < variantB) {
          comparison = -1
      }
      return comparison;
  }

    const favouredData = () => {
      let output = data.allContest.reduce((accData, data) => {
        const { variant } = data;
        const variantGroup = accData[variant];
        if (!variantGroup) { return accData };
        return {
          ...accData,
          [variant]: {
            data: accData[variant].data.concat(data)
          }
        };
      }, variantEntries);
      return Object.entries(output).map(([variant, { data }]) => ({ variant, data })).sort(compare);
    }


    const renderList = ({ item, index }: List) => {
        return (
            <TileContainer key={index} tile={item.variant} onPress={() => selectTile(item)} selected={selected} available={item.data.length !== 0} disabled={item.data.length === 0}>
                <Tile tile={item.variant} selected={selected} available={item.data.length !== 0}>
                    {item.variant}
                </Tile>
            </TileContainer>
           )
    }

    if (loading) return <Loading />

    const buttonPress = () => {
      setButtonState({ color: "#ffffff", background: "#000000"})
    }

    return (
        <Container>
            <SizeModal modalVisible={modalVisible} setModalVisible={setModalVisible} selected={selected} sizeModal={sizeModal} />
            <ProfileComponent />
            <GenderContainer>
                <GenderMaleContainer onPress={() => genderSwitch("male")} gender={gender}>
                    <FirstText gender={gender}>{`Men's`}</FirstText>
                </GenderMaleContainer>
                <GenderFemaleContainer onPress={() => genderSwitch("female")} gender={gender}>
                    <SecondText gender={gender}>{`Women's`}</SecondText>
                </GenderFemaleContainer>
            </GenderContainer>
            <SizeContainer>
                <FlatList 
                    data={favouredData()}
                    keyExtractor={(item) => item.variant.toString()}
                    numColumns={numColumns}
                    renderItem={renderList}
                    ListFooterComponent={Height}
                    ListHeaderComponent={VerticalHeight}
                />
            </SizeContainer>

            <ButtonContainer buttonState={buttonState} onPress={() => buttonPress()}>
                <ButtonText buttonState={buttonState}>{gender === 'male' ? "View All Men's Contests" : "View All Women's Contests"}</ButtonText>
              </ButtonContainer>
        </Container>
    )
})

export default Sneaker;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  height: ${height}px;
`
const Height = styled.View`
  height: 70px;
  width: 100%;
  margin-top: auto;
`
const GenderContainer = styled.View`
  background-color: #fff;
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
  border-color: #3f3f3f;
  border-top-width: 1px;
  border-bottom-width: 1px;
  position: absolute;
  top: 46px;
  z-Index: 1;
  opacity: 0.9;
`
const GenderMaleContainer = styled.TouchableOpacity`
  background-color: ${props => props.gender === "male" ? "#000" : "#fff"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-width: 1px;
  border-color: #3f3f3f;
  width: ${width/2.4}px;
  margin-right: 20px;
`
const GenderFemaleContainer = styled(GenderMaleContainer)`
  background-color: ${props => props.gender === "male" ? "#fff" : "#000"};
`
const FirstText = styled.Text`
  font-size: 14px;
  color: ${props => props.gender === "male" ? "#fff" : "#000"};
  font-family: "Montserrat-Medium"
`
const SecondText = styled(FirstText)`
  color: ${props => props.gender === "male" ? "#000": "#fff"};
`
const SizeContainer = styled.View`
  margin-left: 20px;
  flex: 1;
`
const VerticalHeight = styled.View`
  height: 10px;
  margin-top: 65px;
`
const TileContainer = styled.TouchableOpacity`
  width: ${width/5.4}px;
  height: ${height/11}px;
  margin-bottom: 12px;
  margin-right: 16px;
  margin-top: 2px;
  margin-left: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => props.tile === props.selected ? "#000" : "#fff" };
  shadow-color: ${props => props.tile === props.selected ? "#fff" : "#000"};
  shadow-opacity: 0.3;
  shadow-offset: 2px 2px;
  elevation: 20;
  ${({ available }) => !available && `
      background-color: #AAAAAA;
  `}
`
const Tile = styled.Text`
  font-size: 24px;
  color: ${props => props.tile === props.selected ? "#fff" : "#000"};
  font-family: "Montserrat-ExtraBold";
  ${({ available }) => !available && `
    color: #ffffff;
  `}
`
const ButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    padding: 14px;
    background-color: ${props => props.buttonState.background};
    border-color: #979797;
    border-width: 2px;
    position: absolute;
    bottom: 0px;
    margin: 15px 25px;
    width: 88%;
`
const ButtonText = styled.Text`
    color: ${props => props.buttonState.color};
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 18px;
    line-height: 21.94px;
`
const LitterContainer = styled.View`
  width: 103%;
  right: 3px;
  flex: 0.1px;
`