import {StatusBar} from "expo-status-bar";
import {React} from "react";
import {StyleSheet, Text, View} from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Welcome!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: 500,
        padding: 15,
        backgroundColor: "darkslateblue",
    },
    text: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },
});

export default Header;
