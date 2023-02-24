import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
        <PlayButton onPress = {() => navigation.navigate('Selection')} title = 'Game Time'/>
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

export default Home;