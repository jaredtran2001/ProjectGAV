import { Component, React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';


const Home = ({navigation}) => {
  const [hidden, setHidden] = useState(false);
  const [output, setOutput] = useState("             ");
  const [fontsLoaded] = useFonts({
    'Valorant': require('../assets/fonts/Valorant-Font.ttf'),
  });
  
  useEffect(() => {
    setTimeout(()=> setOutput("GAV"), 1500);
    setTimeout(() => navigation.navigate('Selection'), 3000);
  });
   if(!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
        <View>
          <Text style = {[styles.text, {color: "#efefef"}]}>PROJECT</Text>
          <Text style = {[styles.text, {color: "#ff4656"}]}>{output}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2326',
    // backgroundColor: "#364966"
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Valorant'
  }
});

export default Home;