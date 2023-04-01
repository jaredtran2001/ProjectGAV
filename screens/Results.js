import { Component, React } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ResultButton from '../components/ResultButton';
import * as ScreenOrientation from 'expo-screen-orientation';

const Results = ({route, navigation}) => {
    const { result, num, currSet, time} = route.params;
    let copySet = new Set(currSet);
    //lock portrait
    async function lockScreen() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    lockScreen();

    const handlePlayAgainFinish = ()=> {
      ScreenOrientation.unlockAsync();
      navigation.push('Load',{set: copySet, time: time});
    }
    const handleAllDecksFinish = ()=> {
      ScreenOrientation.unlockAsync();
      navigation.navigate('Selection');
    }
    // console.log(result);
    // let test = [["test", 0], ["test", 1], ["test", 1], ["test", 0], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1]]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>YOU GOT {num} WORDS!</Text>
            </View>
            <View style={[styles.horiLine, {marginTop: "5%"}]}/>
            <View style={styles.body}>
              <View style={[styles.vertLine, {marginLeft: "3%"}]}/>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {result.map((word, index) => {
                  if (word[1] == 0 && index == 0) {
                    return (
                      <Text key={word} style={[styles.resultText, {marginTop: 30, color: "gray"}]}>{word[0]}</Text>
                    )
                  } else if (word[1] == 1 && index == 0) {
                    return (
                      <Text key={word} style={[styles.resultText, {marginTop: 30}]}>{word[0]}</Text>
                    )
                  } else if (word[1] == 0) {
                    return (
                      <Text key={word} style={[styles.resultText, {color: "gray"}]}>{word[0]}</Text>
                    )
                  } else {
                    return (
                      <Text key={word} style={styles.resultText}>{word[0]}</Text>
                    )
                  }
                  
                })}
              </ScrollView>
              <View style={[styles.vertLine, {marginRight: "3%"}]}/>
            </View>
            <View style={[styles.horiLine, {marginBottom: "5%"}]}/>
            <View style={[styles.header, {justifyContent: "flex-start"}]}>
              <ResultButton
                title= "PLAY AGAIN"
                onPress={handlePlayAgainFinish}
                color="#ff4656"
              />
              <ResultButton
                onPress = {handleAllDecksFinish}
                title="EXIT"
                color="#e03e4d"
              />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1f2326"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%"
  },
  horiLine: {
    borderBottomWidth: 1,
    borderColor: "#ff4656",
    width: "60%",
  },
  vertLine: {
    borderLeftWidth: 1,
    borderColor: "#ff4656",
    height: "80%",
  },
  header: {
    // borderWidth: 1,
    height: "12%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  body: {
    height: "67%",
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#042e27"
  },
  headerText: {
    fontSize: 37,
    fontWeight: "bold",
    color: "white",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    color: "white",
    textTransform: 'uppercase'
  }
});

export default Results;