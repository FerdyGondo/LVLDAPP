import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIZE = '@saved_size';
const SHOWSIZE = '@show_size';


export function useTimer(data) {
    const calculateTime = () => {
        const difference = +new Date(data.finishDateTime) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTime())

    useEffect(React.useCallback(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTime())
        }, 1000)
        return () => { clearTimeout(timer)}
    },[]))

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return
        }

        timerComponents.push({
            timeLeft: timeLeft[interval],
            interval: interval
        })
    })

    return timerComponents;


}

export const storeSize = async (value) => {
    try {
      await AsyncStorage.setItem(SIZE, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

export const storeSizeShown = async (value) => {
    try {
      await AsyncStorage.setItem(SHOWSIZE, JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

export  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null;
    } catch(e) {
      // error reading value
    }
  }

  export  const getAuthData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? value : '';
    } catch(err) {
      console.log("getAuthData error " , err);
    }
  }

  export  const storeAuthData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(err) {
      console.log("storeAuthData error " , err);
    }
  }
  
  export  const resetData = async () => {
    try {
      await AsyncStorage.removeItem(SIZE)
    } catch(e) {
      // error reading value
    }
  }

  export const convertDate = (date) => {
      const time = new Date(date)
      const month = time.getMonth() + 1
      const day = time.getDate()
      const hour = time.getHours()
      const minute = time.getMinutes()
      const roundMinute = minute > 9 ? minute : `0${minute}`
      const roundDay = day > 9 ? day : `0${day}`
      let hourZero = hour;
      if (hour === 0) {
        hourZero = 12
      }
      const diff = hourZero > 12 ? `${hourZero - 12}:${roundMinute}pm` : `${hourZero}:${roundMinute}am`
      const roundMonth = month > 9 ? month : `0${month}`

      return `${diff} ${roundMonth}/${roundDay}`
  }
  


export default function index() {
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
