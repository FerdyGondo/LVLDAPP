import React, { useState } from 'react'
import styled from 'styled-components'

import AntDesign from 'react-native-vector-icons/AntDesign';
const myIcon = <AntDesign name="search1" size={17} color="#fff" />;
const myIcon1 = <AntDesign name="caretdown" size={10} color="#000000" />;

export default function SearchDate({ newSearch }) {
    const [search, setSearch] = useState()

    const onChanging = (text) => {
        setSearch(text)
        newSearch(text)
    }
    
    return (
        <Container>
            <SearchContainer>
                <SearchInput placeholder={"Search"} placeholderTextColor={"#000"} onChangeText={(text) => onChanging(text)} />
                <IconContainer>
                    {myIcon}
                </IconContainer>
            <DateSearch>
                <DateText>09/2020</DateText>
                <IconContainerC>
                    {myIcon1}
                </IconContainerC>
            </DateSearch>
            </SearchContainer>
        </Container>
    )
}

const Container = styled.View`
    background-color: #D6D6D6;
    height: 55px;
    width: 100%;
`
const SearchContainer = styled.View`
    flex-direction: row;
    margin: 10px 20px;
    justify-content: space-between;
    align-items: center;
`
const SearchInput = styled.TextInput`
    border-radius: 20px;
    background-color: #fff;
    flex: 0.95;
    height: 35px;
    font-family: "Montserrat-Medium"
    font-size: 10px
    padding-left: 12px;
`
const IconContainer = styled.View`
    width: 32px;
    height: 32px;
    position: absolute;
    background-color: #979797;
    justify-content: center;
    align-items: center;
    right: 110px;
    border-radius: 16px;
`
const DateSearch = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #ffffff;
    align-items: center;
    padding: 9px 15px;
    justify-content: space-between;
    border-radius: 30px;
`
const DateText = styled.Text`
    font-family: "Montserrat";
    font-size: 500;
    font-size: 12px;
    margin-right: 10px;
`
const IconContainerC = styled.View`
`