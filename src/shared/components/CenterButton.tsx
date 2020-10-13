import React from 'react'
import styled from 'styled-components'

type Props = {
    text: string;
}

export default function CenterButton({ text }: Props) {
    return (
        <CenterContainer><CenterText>{text}</CenterText></CenterContainer>
    )
}

const CenterContainer = styled.View`

`
const CenterText = styled.Text`
    text-transform: uppercase;
    font-family: "Montserrat-Bold";
    color: #fff;
    letter-spacing: 3px;
    font-size: 16px;
`
