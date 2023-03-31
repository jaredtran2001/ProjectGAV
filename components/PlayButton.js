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
    height: 240,
    width: "45%",
    borderRadius: 10,
    margin:5,
    backgroundColor: '#505155',
    // backgroundColor: '#526174',
    justifyContent: 'center',
  },
  text: {
    // color: '#ff4656',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default PlayButton;