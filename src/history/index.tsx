import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileComponent from '../shared/components/Profile'
import SearchDate from '../shared/components/SearchDate'

const data = [{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"},{name: "Yeezy 350 ZEB", date: "9/25/20", place: '11th', cost: "3.00"}]

export default function index() {
    const [transaction, setTransaction] = useState('')

    const renderItem = ({ item }) => {
        return (
            <RenderItem>
                <LeftText>
                    <LeftUpperText>{item.name}</LeftUpperText>
                    <LeftLowerText>{item.date}</LeftLowerText>
                </LeftText>
                <RightText>
                    <RightUpperText>{`Place: ${item.place}`}</RightUpperText>
                    <RightLowerText>{`Entry Cost: ${item.cost}`}</RightLowerText>
                </RightText>
            </RenderItem>
        )
    }

    return (
        <Container>
            <ProfileComponent />
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
    background-color: #fff;
`
const List = styled.FlatList`
`
const RenderItem = styled.View`
    border-color: #979797;
    border-bottom-width: 1px;
    background-color: #ffffff;
    padding: 12px 50px 12px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end
`
const LeftText = styled.View`
`
const LeftLowerText = styled.Text`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 12px;
`
const LeftUpperText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 12px;
`
const RightText = styled.View`
`
const RightLowerText = styled.Text`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 10px;
`
const RightUpperText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 10px;
`