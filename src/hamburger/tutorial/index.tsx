import React from 'react'
import styled from 'styled-components'
import Icons from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icons name="angle-right" size={25} color={"#252525"} />;
const myIconDisable = <Icons name="angle-right" size={25} color={"#ccc"} />;

const data = [{name: "Contest Tutorial", screen: "ContestTutorial"}, {name: "Second Chance Contest", screen: ""}, {name: "Member Referrals", screen: ""}]
import { Icon } from 'react-native-elements';
import { getAuthData } from '../../shared/utils';

type FlatProps = {
    item: any;
    index: number;
  }
  
export default function index({ navigation }) {
  const [token, updateToken] = React.useState('');
    React.useEffect(  () => {
        (async () => {
            const token = await getAuthData('token')
            updateToken(token);
        })()
    });

    const renderCardItem = ({ item, index }: FlatProps) => {
        return (
          <Container>
              { !token && index == 2 ?
                <CardContainerDisable>
                      <CardText>
                        <LeftTextDisable>{item.name}</LeftTextDisable>
                        {myIconDisable}
                      </CardText>
                  </CardContainerDisable>
              :
                <CardContainer onPress={() => navigation.navigate(item.screen)}>
                    <CardText>
                      <LeftText>{item.name}</LeftText>
                      {myIcon}
                    </CardText>
                </CardContainer>
              }
          </Container>
        )
      }

    return (
        <Container>
            <FlatList 
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCardItem}
            />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`
const FlatList = styled.FlatList``

const CardContainer = styled.TouchableOpacity`
  margin: 0px 10px;
`
const CardContainerDisable = styled.View`
  margin: 0px 10px;
`

const CardText = styled.View`
  border-bottom-width: 0.5px;
  border-color: #3f3f3f;
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
  color: #000;
`
const LeftTextDisable = styled(LeftText)`
  color: #ccc;
`
const IconContainer = styled.View`
  background-color: #d2a747;
  margin-left: 7px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`