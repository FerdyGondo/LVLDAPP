import React from 'react'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import { useQuery, GET_ALL_TERM } from '../../graphql/query'
import Loading from '../../shared/components/Loading'

export default function index() {
    const { loading, error, data} = useQuery(GET_ALL_TERM)
    if (loading) return <Loading />

    const renderEachItem = ({ item }) => {
        const highlight = props => {
            return (
              <span style={{backgroundColor: props.mark.color}}>
                {props.children}
              </span>
            )
          }
        return (
            <RenderItem>
                <NameText>                            
                    { <BlockContent
                        blocks={item.contentRaw}
                        serializers={{marks: {highlight}}}
                    /> }
              </NameText>
            </RenderItem>
        )
    }

    return (
        <Container>
            <MainContainer>
                <FlatList 
                    data={data.allTerms}
                    keyExtractor={(data, index) => index.toString()}
                    renderItem={renderEachItem}
                />
            </MainContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const FlatList = styled.FlatList`
`
const MainContainer = styled.View`
    margin: 10px 22px;
`
const RenderItem = styled.View`
    margin: 10px 0px;
`
const NameText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 15px;
    color: #C29A41;
    text-transform: uppercase;
`