import { Component, React, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import Word from '../components/Word';
import CountDown from 'react-native-countdown-component';
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
    const [output, setOutput] = useState(firstWord);
    const handleOnPress = () => {
      setOutput(generateWord());
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