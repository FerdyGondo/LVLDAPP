import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const Button = ({ onPress, children, buttonProps, textProps }) => {

  return (
    <ButtonStyle onPress={onPress} style={{...buttonProps}}>
      <TextStyle style={{...textProps}}>
        {children}
      </TextStyle>
    </ButtonStyle>
  );
};
const TextStyle = styled.Text`
    align-self: center;
    color: #fff;
    font-size: 22px
    font-family: Montserrat-Bold;
    font-weight: bold;
    padding-top: 13px;
`
const ButtonStyle = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: #888;
  border-color: #fff;
  width:350px;
  height:55px;
`

export default Button;
