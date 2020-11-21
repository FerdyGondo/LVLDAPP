import React, { Component } from 'react'
import { Text, View, Modal, TouchableWithoutFeedback, Dimensions, FlatList, Platform } from 'react-native'
import {Picker} from '@react-native-community/picker';
import styled from 'styled-components'
import AntDesign from 'react-native-vector-icons/AntDesign';
const myIcon = <AntDesign name="caretdown" size={10} color="#979797" />;

const deviceHeight = Dimensions.get("window").height

export default class PickerModal extends Component {
    constructor(props) {
      super(props) 
      this.state = {
          show: false,
          entry: 1,
          showAmount: false
      }  
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
        this.props.finishEntry(this.state.entry)
        this.setState({entry: 1})
    }

    renderOutsideTouchable(onTouch) {
        const view = <TouchableScreen />
        if (!onTouch) return view

        return (
            <Touchable onPress={onTouch}>
                {view}
            </Touchable>
        )
    }

    renderTitle = () => {
       const {title} = this.props 
       return (
            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>
       )
    }

    renderIOS = () => {
        return (
            <Picker
            selectedValue={this.state.entry}
            style={{flex: 1, height: 50, width: 200, bottom: Platform.OS === 'android' ? 0 : 70 }}
            itemStyle={{ fontFamily: "Montserrat-Medium", fontSize: 30 }}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({entry: itemValue})
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            </Picker> 
        )
    }

    submitAndroid = (item) => {
        this.setState({ entry: item })
        this.setState({ showAmount: false })
    }

    renderAndroid = () => {
        if (this.state.showAmount) {
            return (
                <PopContainer>
                    <UpperContainer>
                        <PopupText>Entry Amount</PopupText>
                    </UpperContainer>
                    <SubNumber onPress={() => this.submitAndroid(1)}>
                        <NumberText>1</NumberText>
                    </SubNumber>
                    <SubNumber onPress={() => this.submitAndroid(2)}>
                        <NumberText>2</NumberText>
                    </SubNumber>
                    <SubNumber onPress={() => this.submitAndroid(3)}>
                        <NumberText>3</NumberText>
                    </SubNumber>
                    <SubNumber onPress={() => this.submitAndroid(4)}>
                        <NumberText>4</NumberText>
                    </SubNumber>
                    <SubNumber onPress={() => this.submitAndroid(5)}>
                        <NumberText>5</NumberText>
                    </SubNumber>
                </PopContainer>
            )
        }
        return (
            <NumberComponent onPress={() => this.setState({ showAmount: true })}>
                <TextNumber>{this.state.entry}</TextNumber>
                <IconContainer>{myIcon}</IconContainer>
            </NumberComponent>
        )
    }

    renderContent = () => {
        return (
            <Cover>
                <RenderContainer>
                {Platform.OS === 'android' ? this.renderAndroid() : this.renderIOS()}
                </RenderContainer>
                <QuantityContainer onPress={this.close} os={Platform.OS} showAmount={this.state.showAmount}>
                    <PopupText>{`${this.state.entry} ${this.state.entry === 1 ? 'Entry' : 'Entries'}`}</PopupText>
                </QuantityContainer>
            </Cover>
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props
        return (
            <Modal
                animated
                animationType="fade"
                visible={show}
                transparent
                onRequestClose={this.close}>
                    <Container>
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <MainContainer os={Platform.OS}>
                           {!this.state.showAmount && this.renderTitle()}
                           {this.renderContent()}
                        </MainContainer>
                    </Container>
            </Modal>

        )
    }
}
const Touchable = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`
const TouchableScreen = styled.View`
    flex: 1;
    width: 100%;
`

const TitleContainer = styled.View`
    align-items: center;
`
const Title = styled.Text`
    font-size: 26px;
    margin: 20px 0px 40px;
    font-family: "Montserrat-ExtraBold"
`
const Cover = styled.View`
    margin-bottom: 50px;
    padding-bottom: 30px;
`

const Container = styled.View`
    flex: 1;
    background-color: #000000AA;
    justify-content: flex-end;
`
const MainContainer = styled.View`
    background-color: #ffffff;
    width: 100%;
    padding: 0px 10px;
    max-height: ${props => props.os === 'android' ? `${deviceHeight*0.32}px` : `${deviceHeight*0.4}px`};
`
const RenderContainer = styled.View`
    height: 80px;
    align-items: center;
`
const QuantityContainer = styled.TouchableOpacity`
    background-color: #d2a747;
    border-radius: 20px;
    padding: 10px 20px;;
    align-items: center;
    justify-content: center;
    margin: 0px 25px;
    top: ${props => props.os === 'android' ? '-10px' : '50px'};
    ${({ showAmount }) => showAmount && `
        top: 70px;
    `}
`
const PopupText = styled.Text`
    font-family: "Montserrat-Bold";
    color: #fff;
    font-size: 17px;
`
const NumberComponent = styled.TouchableOpacity`
    border-color: #979797;
    border-width: 1px;
    padding: 10px;
    flex-direction: row;
    width: 200px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`
const TextNumber = styled.Text`
`
const IconContainer = styled.View`
    position: absolute;
    top: 70%;
    right: 10%;
`
const PopContainer = styled.View`
    background-color: #ffffff;
    border-color: #97979797;
    border-width: 1px;
    border-radius: 20px;
    top: -100px;
`
const UpperContainer = styled.View`
    background-color: #000000;
    justify-content: center;
    align-items: center;
    padding: 10px 50px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`
const SubNumber = styled.TouchableOpacity`
    border-top-width: 1px;
    border-color: #979797;
    justify-content: center;
    align-items: center;
    padding: 7px;
`
const NumberText = styled.Text`
    font-family: "Montserrat";
    color: #000000;
    font-size: 17px;
`