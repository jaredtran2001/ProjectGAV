import { StatusBar } from 'expo-status-bar';
import { React } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const App = () => {
//     const onPress = () => console.log("testtest");
  
//     return (
//         <TouchableOpacity style={styles.button} onPress={onPress}>
//           <Text>testing</Text>
//         </TouchableOpacity>
//     );
// };

const PlayButton = (props) => {
    // console.log(props)
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style = {styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 200,
    borderRadius: 10,
    margin:5,
    backgroundColor: '#b3bed1',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default PlayButton;