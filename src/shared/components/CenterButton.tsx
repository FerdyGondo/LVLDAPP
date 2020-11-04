import React from 'react'
import styled from 'styled-components'

type Props = {
    text: string;
    size: number;
}

export default function CenterButton({ text, size=16 }: Props) {
    return (
        <CenterContainer><CenterText size={`${size}px`}>{text}</CenterText></CenterContainer>
    )
}

const CenterContainer = styled.View`

`
const CenterText = styled.Text`
    text-transform: uppercase;
    font-family: "Montserrat-Bold";
    color: #fff;
    letter-spacing: 3px;
    font-size: ${props => props.size};
`
