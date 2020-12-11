import React from 'react'
import { Animated, Dimensions, Platform } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import ProfileComponent from '../../../shared/components/Profile'
import Loading from '../../../shared/components/Loading'
import BlockContent from '@sanity/block-content-to-react'
import Icons from 'react-native-vector-icons/FontAwesome';
<Icons name="angle-right" size={25} color={"#252525"} />;

const { width, height } = Dimensions.get('window')

const GET_CAROUSEL = gql`
    query {
    allCarousel (where: {name: {eq: "How it works"}}) {
        name
        carouselItems {
        titleRaw
        subTitleRaw
        backgroundColor {
            hex
        }
        image {
            asset {
            url
            }
        }
        }
    }
    }
`

export default function index() {
    const { loading, error, data } = useQuery(GET_CAROUSEL)
    const [completed, setCompleted] = React.useState(false);
    const [scrollValue, setScrollValue] = React.useState(0)
    const scroll = React.useRef()

    const scrollX = new Animated.Value(0);
    const dotPosition = Animated.divide(scrollX, width);

    const getPlatformValue = (value) => {
        return Platform.OS === 'android' ? value + 100 : value
    }


    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(getPlatformValue(value) / width) === data.allCarousel[0].carouselItems.length - 1) {
                setCompleted(true);
            } else {
                setCompleted(false)
            }
            setScrollValue(Math.floor(getPlatformValue(value) / width))
        });

        return () => scrollX.removeListener();
    }, [scrollValue, scrollX]);

    if (loading) return <Loading />
    const getColor = () => {
        if (scrollValue === 0 || scrollValue === 3 || scrollValue === 6) return "#ffffff"
        return "#000000"
    }

    const mainColor = props => {
        return (
            <TitleText colors={props.mark.hex}>
                {props.children}
            </TitleText>
        )
    }

    const subMainColor = props => {
        return (
            <SubText colors={props.mark.hex}>
                {props.children}
            </SubText>
        )
    }

    const color = props => {
        return (
            <PrimaryText colors={props.mark.hex}>
                {props.children}
            </PrimaryText>
        )
    }

    const subColor = props => {
        return (
            <SecondaryText colors={props.mark.hex}>
                {props.children}
            </SecondaryText>
        )
    }

    const prev = (scroll, index) => {
        scroll.current.scrollTo({ x: width * (index - 1 ), animating: true })
    }

    const next = (scroll, index) => {
        scroll.current.scrollTo({ x: width * (index + 1 ), animating: true })
    }

    

    return (
        <Container>
            <Profile>
                <ProfileComponent />
            </Profile>
            <Animated.ScrollView
                horizontal
                ref={scroll}
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {data.allCarousel[0].carouselItems.map((item, index) => (
                    <RenderContainer background={item.backgroundColor.hex} key={index}>
                        {index === 0 ? <BlockContent
                            blocks={item.titleRaw}
                            serializers={{marks: {color: mainColor}}}
                        /> : <BlockContent
                        blocks={item.titleRaw}
                        serializers={{marks: {color}}}
                    />}
                            {index === 0 ? <PrimaryTextContainer>
                                <BlockContent
                                blocks={item.subTitleRaw}
                                serializers={{marks: {color: subMainColor}}}
                            />
                            </PrimaryTextContainer> : <SecondaryTextContainer><BlockContent
                            blocks={item.subTitleRaw}
                            serializers={{marks: {color: subColor}}}
                        /></SecondaryTextContainer>}
                        <InviteImageContainer>
                            <InviteImage resizeMode="contain"  source={{ uri: item.image.asset.url }} />
                            {!completed && <IconRightContainer onPress={() => next(scroll, index)}><Icons name="angle-right" size={40} color={getColor()} /></IconRightContainer>}
                            {index !== 0 && <IconLeftContainer onPress={() => prev(scroll, index)}><Icons name="angle-left" size={40} color={getColor()} /></IconLeftContainer>}
                        </InviteImageContainer>
                    </RenderContainer>
                ))}
            </Animated.ScrollView>
            <DotsFileContainer>
                <DotsContainer color={getColor()}>
                    {data.allCarousel[0].carouselItems.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [getColor(), 'transparent', getColor()],
                            extrapolate: "clamp"
                        });

                        return (
                            <AnimatedDotContainer 
                                key={index}
                                style={{ backgroundColor: opacity }}
                                border={getColor()}
                            />
                        )
                    })}
                </DotsContainer>
            </DotsFileContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`
const RenderContainer = styled.View`
    background-color: ${props => props.background};
    align-items: center;
    padding: 15px 0px;
    width: ${width}px;
`
const InviteImageContainer = styled.View`
    width: 100%;
    margin-top: ${height < 800 ? '-7%' : '0%'}
`
const IconRightContainer = styled.TouchableOpacity`
    position: absolute;
    right: 25px;
    top: 40%;
`
const IconLeftContainer = styled.TouchableOpacity`
    position: absolute;
    left: 25px;
    top: 40%;
`
const InviteImage = styled.Image`
    width: ${width}px;
    height: ${height < 800 ? width : width * 1.2}px;
    align-self: center;
`
const PrimaryText = styled.Text`
    font-family: "Montserrat";
    color: ${props => props.colors};
    text-align: center;
    font-weight: 700;
    font-size: 25px;
`
const TitleText = styled(PrimaryText)`
    font-weight: 600;
    font-size: 20px;
`
const SubText = styled(PrimaryText)`
    font-weight: 800;
    font-size: 25px;
`
const SecondaryText = styled.Text`
    font-family: "Montserrat";
    color: ${props => props.colors};
    text-align: center;
    font-weight: 600;
    font-size: 15px;
`
const Profile = styled.View`
   border-bottom-width: 1px;
   border-color: #979797; 
   background-color: #fff;
`
const DotsFileContainer = styled.View`
    position: absolute;
    bottom: 10px;
    width: 100%;
`
const DotsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const SecondaryTextContainer = styled.View`
    width: 70%;
    margin-top: -10px;
`
const PrimaryTextContainer = styled.View`
    margin-top: -30px;
`
const DotContainer = styled.View`
    border-radius: 5px;
    width: 10px;
    height: 10px;
    border-color: ${props => props.border};
    border-width: 2px;
    margin: 0px 10px 10px;
`
const AnimatedDotContainer = Animated.createAnimatedComponent(DotContainer)