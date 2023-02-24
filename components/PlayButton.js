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
    height: 60,
    width: 200,
    borderRadius: 10,
    margin:5,
    backgroundColor: '#c2bad8',
    justifyContent: 'center',
  },
  text: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  }
});

export default PlayButton;