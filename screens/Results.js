import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Results = ({route, navigation}) => {
    const { right, wrong, num, currSet} = route.params;
    const rightStr = [...right].join(', ');
    const wrongStr =  [...wrong].join(', ');
    let copySet = new Set(currSet);

    return (
        <View style={styles.container}>
            <Text>The number you got right is {num}</Text>
            <Text> The ones you got correct: {rightStr}</Text>
            <Text> The ones you got wrong: {wrongStr}</Text>
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