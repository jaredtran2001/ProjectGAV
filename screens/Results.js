import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Results = ({route, navigation}) => {
    const { right, wrong, num, currSet, firstWord} = route.params;
    const rightStr = [...right].join(', ');
    const wrongStr =  [...wrong].join(', ');
    let copySet = new Set(currSet);
    let fWord = firstWord;

    return (
        <View style={styles.container}>
            <Text>The number you got right is {num}</Text>
            <Text> The words you got correct: {rightStr}</Text>
            <Text> The words you got wrong: {wrongStr}</Text>
            <Button
              title= "Play Again!"
              onPress={() => navigation.push('Load',{
                set: copySet,
                firstWord: fWord
              })}
            />
            <Button
              title= "New Category!"
              onPress={() => navigation.navigate('Selection')}
            />
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

export default Results;