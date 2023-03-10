import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import CountDown from 'react-native-countdown-fixed';


const Load = ({route, navigation}) => {
  const {set, firstWord} = route.params;
  let copySet = new Set(set);
  let fWord = firstWord;

    return (
        <View style={styles.container}>
            <CountDown 
            onFinish = {() => navigation.push('Game', {set: copySet, firstWord: fWord})}
            timeToShow = {['S']}
            until = {3}
            size = {30}/>
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

export default Load;