import { Component, React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import PlusButton from '../components/PlusButton';
import MinusButton from '../components/MinusButton';
import GameTimeButton from '../components/GameTimeButton';
import ExitButton from '../components/ExitButton';


const Description = ({route, navigation}) => {
    const {set, description, category} = route.params;
    let copySet = new Set(set);
    const [time, setTime] = useState(30); 
    const [displayTime, setdisplayTime] = useState("30");

    function handlePlus() {
        setTime(time + 5);
    }
    function handleMinus() {
        if(time > 0)  {
            setTime(time - 5);
        }
    } 
    useEffect(() => {
      if(time >= 60) {
        let min = "" + Math.floor((time / 60));
        let sec =  (time % 60);
        if(sec < 10 ) {
          sec = "0" + sec;
        } else {
          sec = "" + sec;
        }
        setdisplayTime(min + ":" + sec);
      } else {
        setdisplayTime(time + "");
      }
    }, [time]);


  return (
    <View style={styles.container}>
        <View style = {styles.exit}>
          <View style = {styles.exitBox}>
            <ExitButton onPress = {() => navigation.navigate('Selection')}/>
          </View>
        </View>
        <View style = {styles.description}>
          <Text style = {styles.displayText}>{category}</Text>
          <Text style = {styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.timerBox}>
          <View style = {styles.timer}>
            <MinusButton onPress = {handleMinus}/>
            <View style={styles.timeTextBox}>
              <Text style = {styles.timeText}>{displayTime}</Text>
            </View>
            <PlusButton onPress = {handlePlus}/>
          </View>
        </View>
        
        <View style = {styles.caption}>
          <Text style = {styles.descriptionText}>Adjust Duration</Text>
        </View>
        <View style = {styles.start}>
          <View style = {styles.startBox}>
            <GameTimeButton onPress = {() => navigation.push('Load', {set: copySet, time: time} )}/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#364966",
  },
  displayText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  description: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    // backgroundColor: "blue"
  },
  timer: {
    height: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alightItems: 'center',
  },
  timerBox: {
    height: "10%",
    width: "100%",
    // backgroundColor: "green",
    justifyContent: 'center',
    alightItems: 'center',
  },
  caption: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    // backgroundColor: "black"
  },
  start: {
    height: "10%",
    width: "100%",
    // backgroundColor: "red",
    justifyContent: "center",
    alightItems: "center"
  }, 
  startBox: {
    height: "100%",
    flexDirection: "row",
    alightItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  exit: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: "purple"
  },
  exitBox: {
    width: "15%",
    height: "50%",
    alightItems: 'center',
    justifyContent: 'center',
  },
  changeTime:  {
    // backgroundColor: "red",
    width: "10%"
  },
  timeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  timeTextBox: {
    backgroundColor: "#86C5D8",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  }


});

export default Description;