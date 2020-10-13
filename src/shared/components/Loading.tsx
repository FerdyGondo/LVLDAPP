import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'

export default function Loading() {
    return (
        <Container>
            <ActivityIndicator size={30} color={"#000"} />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`