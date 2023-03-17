import { Component, React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import CountDown from 'react-native-countdown-fixed';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';


const Description = ({route, navigation}) => {
    const {set, description} = route.params;
    let copySet = new Set(set);
    const [time, setTime] = useState(60); 

    function handlePlus() {
        setTime(time + 5);
    }
    function handleMinus() {
        if(time > 0)  {
            setTime(time - 5);
        }
    }


  return (
    <View style={styles.container}>
        <ScrollView>
            <Text>{description}</Text>
            <PlayButton onPress = {() => navigation.navigate('Selection')} title = 'Exit'/>
            <PlayButton onPress = {handleMinus} title = '-'/>
            <Text>{time}</Text>
            <PlayButton onPress = {handlePlus} title = '+'/>
            <PlayButton onPress = {() => navigation.push('Load', {set: copySet, time: time} )} title = 'GAME TIME'/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#364966",
    borderWidth: 1,
  },
  displayText: {
    color: "white",
    fontSize: 90,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default Description;