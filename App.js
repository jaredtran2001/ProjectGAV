import {StatusBar} from "expo-status-bar";

import {StyleSheet, Text, View} from "react-native";
import {Component, React} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "./screens/Home";
import SelectionScreen from "./screens/Selection";
import GameScreen from "./screens/Game";
import LoadScreen from "./screens/Load";
import ResultsScreen from "./screens/Results";
import DescriptionScreen from "./screens/Description";
import InstructionScreen from "./screens/Instruction";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        Valorant: require("./assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "Home"}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Instruction" component={InstructionScreen} options={{gestureEnabled: false}} />
                <Stack.Screen name="Selection" component={SelectionScreen} options={{gestureEnabled: false}} />
                <Stack.Screen name="Game" component={GameScreen} options={{gestureEnabled: false}} />
                <Stack.Screen name="Load" component={LoadScreen} options={{gestureEnabled: false}} />
                <Stack.Screen name="Results" component={ResultsScreen} options={{gestureEnabled: false}} />
                <Stack.Screen name="Description" component={DescriptionScreen} options={{gestureEnabled: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
