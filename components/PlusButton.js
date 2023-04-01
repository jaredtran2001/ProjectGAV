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

const PlusButton = (props) => {
    // console.log(props)
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style = {styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "40%",
    width: "15%",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#dd3c4b',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default PlusButton;