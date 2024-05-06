import {React} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const GameTimeButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>START</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 30,
        backgroundColor: "#ff4656",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Valorant",
    },
});

export default GameTimeButton;
