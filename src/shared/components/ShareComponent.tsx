import React from 'react';
import styled from 'styled-components';
import Button from './Button'
import { Share , Alert} from 'react-native'

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('shared with', result.activityType)
        } else {
          // shared
          Alert.alert('did not share')
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        Alert.alert('dismmissed')
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container>
        <Button text="Share" onPress={() => onShare()} />
    </Container>
  );
};

export default ShareExample;

const Container = styled.View`
    margin-top: 50px;
`