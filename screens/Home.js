import { Component, React, useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';


const Home = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hidden, setHidden] = useState(false);
  const [output, setOutput] = useState("GAV");
  const [fontsLoaded] = useFonts({
    'Valorant': require('../assets/fonts/Valorant-Font.ttf'),
  });
  
  useEffect(() => {
    fadeIn();
    // setTimeout(()=> setOutput("GAV"), 1500);
    setTimeout(() => navigation.navigate('Selection'), 3500);
  });
   if(!fontsLoaded) {
    return null;
  }
  function fadeIn(){
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
        <Animated.View
          style={[{opacity: fadeAnim,}]}>
          <Text style = {[styles.text, {color: "#efefef"}]}>PROJECT</Text>
          <Text style = {[styles.text, {color: "#ff4656"}]}>{output}</Text>
        </Animated.View>
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