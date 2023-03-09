import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Results = ({route, navigation}) => {
    const { right, wrong } = route.params;
    const rightStr = [...right].join(', ');
    const wrongStr =  [...wrong].join(', ');
    return (
        <View style={styles.container}>
            <Text> The words you got correct: {rightStr}</Text>
            <Text> The words you got wrong: {wrongStr}</Text>
            <Button
              title= "Play Again!"
              onPress={() => navigation.push('Load')}
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