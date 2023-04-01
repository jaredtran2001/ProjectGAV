import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import Word from '../components/Word';
import CountDown from 'react-native-countdown-fixed';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
// import {Audio} from 'expo-av';

let number = 0;
let result = [];

const Game = ({route, navigation}) => {
  
  const [sound, setSound] = useState();
  // const [sound2, setSound2] = useState();

  async function playSuccessSound(path) {
    console.log('Loading SUCCESS Sound');
    const { sound } = await Audio.Sound.createAsync(path);
    setSound(sound);

    console.log('Playing Success Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //Grabbing the provided word set and function to produce a new word from it
  const { set, time } = route.params;
  const generateWord = () => {
    if(set.size == 0) return "Ran out of words :(";
    let items = Array.from(set);
    let word = items[Math.floor(Math.random() * items.length)];
    set.delete(word);
    return word;
  }

  //states
  const [output, setOutput] = useState();
  const [data, setData] = useState({});
  const [flip, setFlip] = useState(false);
  const [color, setColor] = useState("#1f2326");

  if(output == null) {
    setOutput(generateWord());
  }

  //Immediate function that rotates the screen
  async function lockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  lockScreen();

  // Required to start listener
  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  //Handles when the timer runs out of time
  const handleFinish = ()=> {
    if(output !== "Incorrect" && output !== "Correct") {
      let input = [output, 0];
      result.push(input);
    }
    let currSet = new Set(set);
    let tempResult = [...result];
    let tempNum = number + "";
    //resetting values
    result = [];
    number = 0;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    _unsubscribe();
    ScreenOrientation.unlockAsync();
    navigation.push('Results', {
      result: tempResult,
      num: tempNum,
      currSet: currSet,
      time: time
    });
  }

  //Slows down how often we are reading the motion so it isn't so sensitive
  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(77);
  };

  //Subscription listeners
  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.rotation);
    });
    _setInterval();
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  // Functions to handle getting a new word when motion is detected
  useEffect(() => {
    let { gamma } = data;
    if(gamma > -0.75 && !flip) {
      //NOOO
      let input = [output, 0];
      result.push(input);
      setFlip(true);
      setOutput("Passed");
      setColor("#E14749");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      playSuccessSound(require('../assets/failure.mp3'));
    } else if (gamma < -2.25 && !flip) {
      //Yess
      let input = [output, 1];
      result.push(input);
      number +=1;
      setFlip(true);
      setOutput("Correct");
      setColor("#3CAE75");
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      playSuccessSound(require('../assets/success.mp3'));
    } else if( gamma < -1.1 && gamma > -1.9 && flip) {
      setFlip(false);
      setOutput(generateWord());
      setColor("#1f2326");
    } 
  }, [data]);
  
  
  return (
      <View style={[styles.container, { backgroundColor: color}]}>
        <View style={{position: "absolute", top: 10, right: 30, width: 100}}>
          <CountDown 
            onFinish={handleFinish}
            timeToShow = {['S']}
            until = {time}
            size = {20}
            timeLabels={{s: ''}}
            showSeperator = {true}
            digitStyle={{backgroundColor: "#ff4656", width:"100%", height: 60, }}
          />
        </View>
        
        <View style={[styles.horiLine, {margin: 10}]}/>
        <Text style = {styles.text}>{output}</Text>
        <View style={[styles.horiLine, {margin: 10}]}/>     
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  horiLine: {
    borderBottomWidth: 1,
    borderColor: "#ff4656",
    width: "15%",
  },
});

export default Game;