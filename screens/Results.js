import { Component, React } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Results = ({navigation}) => {

    return (
        <View style={styles.container}>
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