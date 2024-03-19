import {React} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useFonts} from "expo-font";

const ExitButton = (props) => {
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>X</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100000,
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Valorant",
    },
});

export default ExitButton;
