import React from 'react'
import styled from 'styled-components'

export default function RedContainer() {
    return (
        <Container />
    )
}

const Container = styled.View`
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #D20000;
    position: absolute;
    top: -5px;
    right: 0px;
`