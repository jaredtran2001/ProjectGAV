import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import Word from '../components/Word';
import CountDown from 'react-native-countdown-fixed';
import { Gyroscope } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

let wordSet = new Set();
let correct = new Set();
let incorrect = new Set();
let number = 0;
wordSet.add("one piece").add("naruto").add("blue lock").add("hunterxhunter").add("AOT").add("Dragon Ball Z").add("SpyxFamily").add("Haikyu").add("My Hero Academia").add("JoJo's Bizarre Adventure");
const generateWord = () => {
  let items = Array.from(wordSet);
  let word = items[Math.floor(Math.random() * items.length)];
  wordSet.delete(word);
  console.log(word);
  return word;
}
let firstWord = generateWord();
const Game = ({navigation}) => {
  //States 
  // const [subscription, setSubscription] = useState(null);
  const [output, setOutput] = useState(firstWord);
  const [data, setData] = useState({});
  const [flip, setFlip] = useState(false);

  //Immediate function 
  async function lockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  lockScreen();
  const handleOnPress = () => {
    setOutput(generateWord());
  }
  
  useEffect(() => {
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);
  

  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(77);
  };

  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.rotation);
    });
    _setInterval();
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  useEffect(() => {
    let { gamma } = data;
    console.log(gamma);
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
          onFinish={() => navigation.navigate('Results', {
            right: correct,
            wrong: incorrect
          })}
          timeToShow = {['S']}
          until = {30}
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