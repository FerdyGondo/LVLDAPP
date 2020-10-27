import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import {Dimensions, FlatList, View, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Actions from '../../actions'
import ProfileComponent from '../shared/components/Profile'
import Loading from '../shared/components/Loading'
import SizeModal from '../shared/components/SizeModal'
import {getData} from '../shared/utils'

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
    const dispatch = useDispatch()
    const sneakers = useSelector(state => state.sneakers.sneaker)
    const [modalVisible, setModalVisible] = useState(false)
    const [sizeText, setSizeText] = useState()

    useEffect(() => {
        dispatch(Actions.sneakers.fetchSneakers.trigger())
    },[])

    useEffect(() => {
      (async () => {
        const showSize = await getData(SIZE)
        setSizeText(showSize)
        if (showSize && sneakers.length !== 0) {
          const newData = mappedData.find((data, index) => data.key === showSize)
          navigation.navigate("Context", { items: newData})
        }
      })()
    },[sneakers])

    const [selected, setSelected] = useState<number>()
    const [gender, setGender] = useState<string>('male')

    const selectTile = async (item: object): void => {
        setSelected(selected => selected = item.key);
        const result = await getData(SHOWSIZE)
        if(!result) setModalVisible(true)
        setTimeout(() => navigation.navigate("Context", { items: item }), 2000)
    }

    const genderSwitch = (data: string): void => {
        setGender(data)
    }

    const generateId = () => {
      return Math.floor(Math.random() * 1000) + 1
    }

    const mappedData = sneakers.map(({id, sizes, name, image, nickname}) => {
      return sizes.map(({key, data}) => {
        return {key, data: data.map(sizeEntry => ({...sizeEntry, id: generateId(), name, image, nickname}))}
      })
    })
    .reduce((acc, curr)=>{
      return acc.concat(curr)
    }, [])
    .reduce((acc, curr) => {
      const index = acc.findIndex(item => item.key === curr.key)
      if (index > -1) {
        const data = acc[index].data.concat(curr.data)
        acc[index].data = data
        return acc
      }
      return acc.concat(curr)
    },[])


    const renderList = ({ item, index }: List) => {
        return (
            <TileContainer key={index} tile={item.key} onPress={() => selectTile(item)} selected={selected} available={item.data.length !== 0} disabled={item.data.length === 0}>
                <Tile tile={item.key} selected={selected}>
                    {item.key}
                </Tile>
            </TileContainer>
           )
    }

    if (sneakers.length === 0) return <Loading />

    return (
        <Container>
            <SizeModal modalVisible={modalVisible} setModalVisible={setModalVisible} selected={selected} />
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
                    data={mappedData}
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
