import { Component, React, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Header from './components/Header';
import PlayButton from '../components/PlayButton';
import CountDown from 'react-native-countdown-fixed';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';

let RSG = ["Ready", "Set", "Go!!"]

const Load = ({route, navigation}) => {
  const {set, time} = route.params;

  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(RSG[0]);

  async function lockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  lockScreen();

  const handleFinish = () => {
    ScreenOrientation.unlockAsync();
    // Vibration.vibrate(10)
    let copySet = new Set(set);
    let copyTime = time;
    navigation.push('Game', {set: copySet, time: copyTime});
  }
  const handleChange = () => {
    setDisplay(RSG[index + 1])
    setIndex(index + 1)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  return (
    <View style={styles.container}>
        <CountDown 
        onFinish = {handleFinish}
        timeToShow = {['M','S']}
        until = {3}
        size = {0}
        timeLabels={{s: ''}}
        onChange={handleChange}
        />
        <Text style={styles.displayText}>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#364966",
    borderWidth: 1,
  },
  displayText: {
    color: "white",
    fontSize: 90,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default Load;