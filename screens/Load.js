import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import CountDown from 'react-native-countdown-fixed';


const Load = ({route, navigation}) => {
  const {set} = route.params;
  let copySet = new Set(set);

    return (
        <View style={styles.container}>
            <CountDown 
            onFinish = {() => navigation.push('Game', {set: copySet})}
            timeToShow = {['S']}
            until = {3}
            size = {30}/>
            <Text>Place on your forehead</Text>
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