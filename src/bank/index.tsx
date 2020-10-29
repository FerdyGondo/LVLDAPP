import React from 'react'
import styled from 'styled-components'
import Search from '../shared/components/Search'
import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={25} color={"#979797"} />;

const data = [{name: "Chase", logo: require('../../assets/images/banks/chase.png')},{name: "Bank of America", logo: require('../../assets/images/banks/america.png')},{name: "Wells Fargo", logo: require("../../assets/images/banks/wells.png")},{name: "PNC", logo: require("../../assets/images/banks/pnc.png")},{name: "TD Bank", logo: require('../../assets/images/banks/td.png')},{name: "U.S Bank", logo: require('../../assets/images/banks/us.png')},{name: "Navy Federal", logo: require('../../assets/images/banks/navy.png')}]

export default function index() {
    const renderList = ({ item }) => {
        return (
            <BankingContainer>
                <LogoContainer>
                    <Logo source={item.logo} />
                    <TextContainer>{item.name}</TextContainer>
                </LogoContainer>
                <ArrowContainer>
                    {myIcon}
                </ArrowContainer>
            </BankingContainer>
        )
    }

    return (
        <Container>
            <Search />
            <List 
                data={data}
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
const List = styled.FlatList`
`
const BankingContainer = styled.View`
    background-color: #fff;
    flex-direction: row;
    padding: 12px 17px;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-color: #979797;
`
const LogoContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const Logo = styled.Image`
    width: 35px;
    height: 35px;
`
const TextContainer = styled.Text`
    font-family: "Montserrat";
    margin-left: 20px;
    font-size: 12px;
`
const ArrowContainer = styled.View`
`

