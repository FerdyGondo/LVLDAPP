import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Transition, Transitioning } from 'react-native-reanimated'
import { useQuery, GET_ALL_FAQ } from '../../graphql/query'
import BlockContent from '@sanity/block-content-to-react'
import Loading from '../../shared/components/Loading'
import { TouchableWithoutFeedback, Platform } from 'react-native'


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
    const { loading, error, data} = useQuery(GET_ALL_FAQ)
    const [currentIndex, setCurrentIndex] = useState(null)
    const ref = useRef()

    if (loading) return <Loading />
    
    const renderCardItem = ({ item, index }: FlatProps) => {
       return <FlatList 
          data={item.questions}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback  onPress={() => { 
                ref.current.animateNextTransition();
                  setCurrentIndex(item.question === currentIndex ? null : item.question)
              }}>
                <CardContainer>
                <CardText>
                  <LeftText>{item.question}</LeftText>
                  {item.question === currentIndex ? angleDown : myIcon}
                </CardText>
                {item.question === currentIndex && (
                    <AnswerContainer>
                         <AnswerRedText os={Platform.OS}>Answer: </AnswerRedText>

                            { <BlockContent
                  blocks={item.answerRaw}
                  serializers={{marks: {}}}
              /> }
                    </AnswerContainer>
                )}
              </CardContainer>
              </TouchableWithoutFeedback>
             )
          }}
       />
      }


    return (
       <Container>
            <Transitioning.View
                ref={ref}
                transition={transition}
                style={{ flex: 1 }}
            >
                <FlatList 
                    data={data.allFaq}
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
const FlatList = styled.FlatList``

const CardContainer = styled.View`
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
    flex-direction: row;
`
const AnswerRedText = styled.Text`
    font-size: 13px;
    font-family: "Montserrat";
    line-height: 15px;
    font-weight: bold;
    color: #C29A41;
    top: ${props => props.os === 'android' ? '3px' : '1px'};
`

