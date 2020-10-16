import React from 'react'
import { View, Text, Button } from 'react-native'

type Props = {
    route: () => {};
    navigation: () => {};
}
export default function index({ route, navigation }: Props) {
    const {entry, lobbyItem, users } = route?.params
    return (
        <View>
            <Text>LeaderBoard</Text>
            <Button onPress={() => navigation.navigate("LeaderBoard", { entry: entry, lobbyItem: lobbyItem, users: users })} title="Click" />
        </View>
    )
}
