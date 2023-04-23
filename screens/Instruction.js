import { Component, React, useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
// import Header from './components/Header';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
import correct from '../assets/images/CorrectInstruction.png';
import ExitButton from '../components/ExitButton';
import pass from '../assets/images/PassInstruction.png';


const Instruction = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    'Valorant': require('../assets/fonts/Valorant-Font.ttf'),
  });
  if(!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style = {styles.exit}>
        <View style = {styles.exitBox}>
          <ExitButton onPress = {() => navigation.navigate('Selection')}/>
        </View>
      </View>
      <View style = {styles.header}>
          <Text style = {styles.headerText}>HOW TO PLAY</Text>
      </View>
      <View style={[styles.horiLine, {marginTop: "5%"}]}/>
      <View>
          <Text style = {styles.descriptionText}>SELECT A DECK, ROTATE AND HOLD YOUR PHONE UP TO YOUR FOREHEAD AND HAVE YOUR FRIENDS GIVE HINTS TO GUESS THE WORD THAT APPEARS</Text>
      </View>
      <View>
          <Text style = {styles.descriptionText}>IF YOU GET IT RIGHT TILT THE PHONE DOWNARDS AND THE NEXT WORD WILL APPEAR</Text>
          {/* <Image source = {correct}></Image> */}
      </View>
      <View>
          <Text style = {styles.descriptionText}>IF YOU CAN'T FIGURE OUT THE ANSWER, TILT THE PHONE UPWARDS AND IT WILL MOVE ON TO THE NEXT WORD</Text>
          {/* <Image source = {pass}></Image> */}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1f2326',
    // backgroundColor: "#364966"
  },
  header: {
    // borderWidth: 1,
    height: "12%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: 'center',
  }, 
  descriptionText: {
    textAlign: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 20
  },
  exit: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 50
    // backgroundColor: "purple"
  },
  exitBox: {
    width: "15%",
    height: "50%",
    alightItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 37,
    fontWeight: "bold",
    color: "#ff4656",
    fontFamily: 'Valorant'
  },

});

export default Instruction;