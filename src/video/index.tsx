import React, { useState } from 'react'
import { Platform, ActivityIndicator, Dimensions } from 'react-native'
import styled from 'styled-components'
import { WebView } from 'react-native-webview';
const {width,height} = Dimensions.get('window')

export default function index() {
    const [loading, setLoading] = useState(true)

    const hideSpinner = () => {
        setLoading(false)
    }

    return (
        <Container>
            <WebView
                onLoad={() => hideSpinner()}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: 'https://youtu.be/FBI2mruYhgU' }}
            />
            {loading && <ActivityIndicator
          style={{ position: "absolute", top: height / 3, left: width / 2 }}
          size="large"
        />}
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`
