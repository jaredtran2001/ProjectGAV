import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';

const Home = ({navigation}) => {

  setTimeout(() => navigation.navigate('Selection'), 3000);

  return (
    <View style={styles.container}>
        <Text>PROJECT GAV</Text>
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