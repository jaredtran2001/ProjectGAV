import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import CountDown from 'react-native-countdown-component';

const Load = ({navigation}) => {

    return (
        <View style={styles.container}>
            <CountDown 
            onFinish = {() => navigation.navigate('Game')}
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