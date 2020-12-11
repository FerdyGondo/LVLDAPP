import React from 'react'
import styled from 'styled-components'
import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={25} color={"#252525"} />;

export default function index({ navigation }) {

    const renderComponent = (title) => {
        return (
            <MainContainer>
                <TextContainer>
                    <MainText>{title}</MainText>
                </TextContainer>
                <CardContainer onPress={() => navigation.navigate('')}>
                    <CardText>
                    <LeftText>{'Title 1'}</LeftText>
                    {myIcon}
                    </CardText>
                </CardContainer>
                <CardContainer onPress={() => navigation.navigate('')}>
                    <CardText>
                    <LeftText>{'Title 2'}</LeftText>
                    {myIcon}
                    </CardText>
                </CardContainer>
            </MainContainer>
        )
    }

    return (
        <Container>
            <Scroll>
                {renderComponent('Rules')}
                {renderComponent("Gameplay")}
            </Scroll>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Scroll = styled.ScrollView`
  flex: 1;
`
const TextContainer = styled.View`
    border-bottom-width: 1px;
    border-color: #979797; 
    padding-bottom: 10px;
    margin: 0px 10px;
`
const MainText = styled.Text`
    margin-top: 18.5px;
    left: 10px;
    font-family: "Montserrat-Bold";
    font-size: 20px;
    line-height: 24px;
    color: #000000;
`
const MainContainer = styled.View`
    margin-bottom: 10px;
`
const CardContainer = styled.TouchableOpacity`
  margin: 0px 10px;
`

const CardText = styled.View`
  border-bottom-width: 0.5px;
  border-color: #3f3f3f;
  flex-direction: row;
  padding: 15px 12px;
  justify-content: space-between;
  align-items: center;
`

const LeftText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  font-family: "Montserrat";
  line-height: 17px;
  color: #000000
`