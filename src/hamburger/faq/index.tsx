import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ProfileComponent from '../../shared/components/Profile'
import { Transition, Transitioning } from 'react-native-reanimated'

const data = [{name: "Question 1", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 2", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 3", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 4", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 5", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 6", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."},{name: "Question 7", answer: "Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5.Answer to question number 5."}]

type FlatProps = {
    item: any;
    index: number;
  }

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
)

import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={25} color={"#252525"} />;
const angleDown = <Icons name="angle-down" size={25} color={"#252525"} />;

export default function index({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(null)
    const ref = useRef()
    
    const renderCardItem = ({ item, index }: FlatProps) => {
        return (
          <CardContainer onPress={() => { 
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index)
          }}>
            <CardText>
              <LeftText>{item.name}</LeftText>
              {index === currentIndex ? angleDown : myIcon}
            </CardText>
            {index === currentIndex && (
                <AnswerContainer>
                    <AnswerText>
                        <AnswerRedText>Answer: </AnswerRedText>
                        {item.answer}
                    </AnswerText>
                </AnswerContainer>
            )}
          </CardContainer>
        )
      }

    return (
       <Container>
           <Profile>
                <ProfileComponent />
            </Profile>
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={{ flex: 1 }}
            >
                <FlatList 
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCardItem}
                />
            </Transitioning.View>
       </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const Profile = styled.View`
   border-bottom-width: 1px;
   border-color: #979797; 
`
const FlatList = styled.FlatList``

const CardContainer = styled.TouchableOpacity`
  margin: 0px 10px;
`

const CardText = styled.View`
  border-bottom-width: 1px;
  border-color: #979797;
  flex-direction: row;
  padding: 12px 12px;
  justify-content: space-between;
  align-items: center;
`

const LeftText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  font-family: "Montserrat";
  line-height: 17.07px;
  color: #000000
`
const AnswerContainer = styled.View`
    padding: 12px 12px;
    border-bottom-width: 1px;
    border-color: #979797;
`
const AnswerText = styled.Text`
    font-size: 12px;
    font-family: "Montserrat";
    line-height: 15px;
    font-weight: 400;
    color: #000000;
`
const AnswerRedText = styled.Text`
    font-size: 12px;
    font-family: "Montserrat";
    line-height: 15px;
    font-weight: bold;
    color: #C29A41;
`