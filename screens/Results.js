import { Component, React } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';


const Results = ({route, navigation}) => {
    const { result, num, currSet} = route.params;
    let copySet = new Set(currSet);
    
    // let test = [["test", 0], ["test", 1], ["test", 1], ["test", 0], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1], ["test", 1]]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>You got {num} words!</Text>
            </View>
            <View style={[styles.line, {marginTop: "2%"}]}/>
            <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.body}>
              {result.map((word, index) => {
                console.log(index);
                if (word[1] == 0 && index == 0) {
                  return (
                    <Text style={[styles.resultText, {marginTop: 30, color: "gray"}]}>{word[0]}</Text>
                  )
                } else if (word[1] == 1 && index == 0) {
                  return (
                    <Text style={[styles.resultText, {marginTop: 30}]}>{word[0]}</Text>
                  )
                } else if (word[1] == 0) {
                  return (
                    <Text style={[styles.resultText, {color: "gray"}]}>{word[0]}</Text>
                  )
                } else {
                  return (
                    <Text style={styles.resultText}>{word[0]}</Text>
                  )
                }
                
              })}
            </ScrollView>
            <View style={[styles.line, {marginBottom: "2%"}]}/>
            <View style={styles.header}>
              <Button
                title= "Play Again!"
                onPress={() => navigation.push('Load',{
                  set: copySet
                })}
              />
              <Button
                title= "New Category!"
                onPress={() => navigation.navigate('Selection')}
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
    backgroundColor: "#2A363B"
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "70%",
  },  
  header: {
    // borderWidth: 1,
    height: "12%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  body: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "white",
    height: "72%",
    width: "100%",
    // backgroundColor: "#69a69e"
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
    color: "white",
  }
});

export default Results;