import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIZE = '@saved_size';
const SHOWSIZE = '@show_size';


export function useTimer(data) {
    const formatData = () => {
        let year = new Date().getFullYear();
        let date = data.startDate[0].split("/")
        let time = data.endTime[0].split(":")
        let hour = time[0]
        let minute = time[1].slice(0,2)
        let timeZone = time[1].slice(-2)

        if (timeZone === "pm") {
            hour = parseInt(hour)
            hour+=12
        }

        const mappedData = date.map((data) => parseInt(data))

        return {
            date: mappedData,
            hour: hour,
            minute: parseInt(minute),
            year: year
        }
    }

    const tommorrowDate = () => {
      var ms = new Date().getTime() + 106400000;
      var tomorrow = new Date(ms);
      var year = tomorrow.getFullYear();
      var day = tomorrow.getDate();
      var month = tomorrow.getMonth() + 1;
      var hour = tomorrow.getHours();
      var minute = tomorrow.getMinutes();

      return {
        year: year,
        day: day,
        month: month,
        hour: hour,
        minute: minute < 10 ? `0${minute}` : minute
      }
    }

    const calculateTime = () => {
        const result = tommorrowDate();
        const difference = +new Date(`${result.year}-${result.month}-${result.day}T${result.hour}:${result.minute}`) - +new Date();
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
  


export default function index() {
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
