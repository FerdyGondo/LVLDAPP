import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
// import Carousel from 'react-native-looped-carousel'
// import Carousel from 'react-native-looped-carousel-improved';
import Carousel from './lib/Carousel';

import CarouselItem from './components/CarouselItem';

const { width, height } = Dimensions.get('window');

const CarouselLoop = ({ dataInput, navigation }) => {
  const [size, setSize] = React.useState({ width, height })
  const _onLayoutDidChange = event => {
    const layout = event.nativeEvent.layout;
    setSize({ width: layout.width, height:layout.height  });    
  };

    const pages = generatePages(dataInput, navigation);
    return (
      <View style={{ height:120 }} onLayout={_onLayoutDidChange}>
        <Carousel
          style={size}
          delay={3000}
          currentPage={0}
          isLooped
          autoplay
          bullets
          bulletStyle={{backgroundColor: '#595959' , marginBottom: -10}}
          chosenBulletStyle={{ backgroundColor: '#333'  , marginBottom: -10}}
        >
            {pages}
        </Carousel>
      </View>
    );
  }


const generatePages = (dataInput, navigation) => {
    return dataInput.map( (item) => {
        return <CarouselItem key={item.id} item={item} navigation={navigation}/>
    })
}

export default CarouselLoop;
