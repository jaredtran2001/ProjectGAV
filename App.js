import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import { Component, React } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import SelectionScreen from'./screens/Selection';
import GameScreen from './screens/Game';
import LoadScreen from './screens/Load';
import ResultsScreen from './screens/Results';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>    
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Selection" 
          component={SelectionScreen} 
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
        />
        <Stack.Screen 
          name="Load" 
          component={LoadScreen} 
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// export default function App() {
//   return (
//     <NavigationContainer>
//       <View style={styles.container}>
//         <Header/>
//         <PlayButton/>
//       </View>
//     </NavigationContainer>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     alignItems: 'center',
//   },
//   container2: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });