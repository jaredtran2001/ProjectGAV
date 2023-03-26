import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';

const Home = ({navigation}) => {
  const [hidden, setHidden] = useState(false);
  const [output, setOutput] = useState("             ");
  
  useEffect(() => {
    setTimeout(()=> setOutput("VAG"), 1500);
    setTimeout(() => navigation.navigate('Selection'), 3000);
  });

  return (
    <View style={styles.container}>
        <View>
          <Text style = {styles.text}>PROJECT</Text>
          <Text style = {styles.text}>{output}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#364966"
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
  }
});

export default Home;