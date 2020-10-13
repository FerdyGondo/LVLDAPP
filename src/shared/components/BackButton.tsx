import React from 'react'
import { TouchableOpacity } from 'react-native'

import Fontisto from 'react-native-vector-icons/Fontisto';
const myIcon = <Fontisto name="angle-left" size={20} color="#fff" />;

type Props = {
    onPress: () => {};
}

export default function BackButton({ onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            {myIcon}
        </TouchableOpacity>
    )
}
