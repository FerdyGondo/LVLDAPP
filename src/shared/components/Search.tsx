import React from 'react'
import styled from 'styled-components'

import AntDesign from 'react-native-vector-icons/AntDesign';
const myIcon = <AntDesign name="search1" size={17} color="#fff" />;

export default function Search() {
    return (
        <Container>
            <SearchContainer>
                <SearchInput placeholder={"Search"} placeholderTextColor={"#000"} />
                <IconContainer>
                    {myIcon}
                </IconContainer>
            </SearchContainer>
        </Container>
    )
}

const Container = styled.View`
    background-color: #D6D6D6;
    height: 50px;
    width: 100%
`
const SearchContainer = styled.View`
    flex-direction: row;
    margin: 10px 15px;
`
const SearchInput = styled.TextInput`
    border-radius: 20px;
    background-color: #fff;
    flex: 1;
    height: 32px;
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
    right: 0;
    border-radius: 16px;
`