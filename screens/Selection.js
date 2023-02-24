import { Component, React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayButton from '../components/PlayButton';

const Selection = ({navigation}) => {
  return (
    <View style={styles.container}>
        <PlayButton onPress = {() => navigation.navigate('Load')} title = 'Anime'/>
        <PlayButton onPress = {() => navigation.navigate('Game')} title = 'Animals'/>
        <PlayButton onPress = {() => navigation.navigate('Game')} title = 'Food'/>
        <PlayButton onPress = {() => navigation.navigate('Game')} title = 'Alcohol'/>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Selection;