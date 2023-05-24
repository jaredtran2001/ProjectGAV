import { React } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground} from 'react-native';


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
  // const img = require('../assets/images/pokemon.png');
  let PassedImg = props.img;
  return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style = {styles.imgctr}>
          <PassedImg width = {"100%"} height={'100%'}/>
        </View>
        {/* <ImageBackground source = {props.img} style={styles.image}> */}
        <Text style = {styles.text}>{props.title}</Text>
        {/* </ImageBackground>  */}
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
    alignItems: 'center'
  },
  text: {
    // color: '#ff4656',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imgctr: {
    flex: 1,
    width: '60%',
  }
});

export default PlayButton;