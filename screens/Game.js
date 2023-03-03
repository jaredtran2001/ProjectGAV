import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import Word from '../components/Word';
import CountDown from 'react-native-countdown-fixed';
import { Gyroscope } from 'expo-sensors';

let wordSet = new Set();
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
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [output, setOutput] = useState(firstWord);
  const handleOnPress = () => {
    setOutput(generateWord());
  }
  
  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);
  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  function rotation(a, b, c) {
    console.log(c);
    if(c > 8) {
      setOutput(generateWord());
    }
  }
  return (
      <View style={styles.container}>
          <CountDown 
          onFinish={() => navigation.navigate('Results')}
          timeToShow = {['S']}
          until = {30}
          size = {30}/>
          <Button
            title= {output}
            onPress={handleOnPress}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Game;