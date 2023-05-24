import { Component, React, useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Animated, Image} from 'react-native';
// import Header from './components/Header';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
import ExitButton from '../components/ExitButton';
import Turn from '../assets/images/coolturn.svg'
import Correct from '../assets/images/coolcorrect.svg'
import Pass from '../assets/images/coolpass.svg'


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
        {/* <View style = {styles.exitBox}> */}
          <ExitButton onPress = {() => navigation.navigate('Selection')}/>
        {/* </View> */}
      </View>
      <View style = {styles.header}>
          <Text style = {styles.headerText}>HOW TO PLAY</Text>
      </View>
      <View style={[styles.horiLine, {marginTop: "5%"}]}/>
      <View style={styles.description_ctnr}>
        <View style={styles.description_box}>
          <View style={styles.icon}>
            <Turn width = {"100%"} height={'100%'}/>
          </View>
          <Text style = {styles.descriptionText}>PLACE ON FOREHEAD</Text>
        </View>
        <View style = {styles.description_box}>
          <View style={styles.icon}>
            <Correct width = {"80%"} height={'60%'}/>
          </View>
          <Text style = {styles.descriptionText}>TILT DOWN == CORRECT</Text>
          {/* <Image source = {correct}></Image> */}
        </View>
        <View style = {styles.description_box}>
          <View style={styles.icon}>
            <Pass width = {"100%"} height={'60%'}/>
          </View>
          <Text style = {styles.descriptionText}>TILT UP == PASS</Text>

        </View>
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
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
    // backgroundColor: 'green',
    flex: 1
  }, 
  description_ctnr: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    flex: 4,
    justifyContent: 'space-evenly',
    marginTop: 30,
    marginBottom: 50
  },
  description_box: {
    flex: 1,
    // backgroundColor: 'orange'
  },
  descriptionText: {
    textAlign: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  icon: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '60%',
  },
  exit: {
    position: 'absolute',
    // backgroundColor: 'purple',
    right: '6%',
    top: '8%',
    zIndex: 10000,
  },
  // exitBox: {
  //   width: "15%",
  //   height: "50%",
  //   alightItems: 'center',
  //   justifyContent: 'center',
  // },
  headerText: {
    fontSize: 37,
    fontWeight: "bold",
    color: "#ff4656",
    fontFamily: 'Valorant'
  },

});

export default Instruction;