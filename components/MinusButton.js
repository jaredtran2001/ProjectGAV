import {React} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const PlusButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>-</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "15%",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: "#dd3c4b",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default PlusButton;
