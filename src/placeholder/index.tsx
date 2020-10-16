import React from 'react'
import { View, Text, Button } from 'react-native'

export default function index({ navigation }) {
    return (
        <View>
            <Text>LeaderBoard</Text>
            <Button onPress={() => navigation.navigate("LeaderBoard")} title="Click" />
        </View>
    )
}
