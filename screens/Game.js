import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import Word from '../components/Word';
import CountDown from 'react-native-countdown-fixed';
import { Gyroscope } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

// let wordSet = new Set();
let correct = new Set();
let incorrect = new Set();
let number = 0;

const Game = ({route, navigation}) => {

  //Grabbing the provided word set and function to produce a new word from it
  const { set, firstWord } = route.params;
  // let currSet = new Set(set);
  const generateWord = () => {
    if(set.size == 0) return "Ran out of words :(";
    let items = Array.from(set);
    let word = items[Math.floor(Math.random() * items.length)];
    set.delete(word);
    return word;
  }

  //states
  const [output, setOutput] = useState(firstWord);
  const [data, setData] = useState({});
  const [flip, setFlip] = useState(false);


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
    let fWord = generateWord() + "";
    console.log("first word on game screen is " + fWord);
    let currSet = new Set(set);
    let tempCorrect = new Set(correct);
    let tempIncorrect = new Set(incorrect);
    let tempNum = number + "";
    //resetting values
    number = 0;
    correct.clear();
    incorrect.clear();
    _unsubscribe();
    navigation.push('Results', {
      right: tempCorrect,
      wrong: tempIncorrect,
      num: tempNum,
      currSet: currSet,
      fWord: fWord
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
    if(gamma > -0.8 && !flip) {
      //Yess
      correct.add(output);
      number +=1;
      setFlip(true);
      setOutput(generateWord());
    } else if (gamma < -2.2 && !flip) {
      //NOOO
      incorrect.add(output);
      setFlip(true);
      setOutput(generateWord());
    }else if( gamma < -1.1 && gamma > -1.9 && flip) {
      setFlip(false);
    } 
  }, [data]);
  
  
  return (
      <View style={styles.container}>
          <CountDown 
          onFinish={handleFinish}
          timeToShow = {['S']}
          until = {10}
          size = {30}/>
          <Text style = {styles.text}>{output}</Text>
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
  }
});

export default Game;