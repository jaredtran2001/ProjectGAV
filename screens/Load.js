import {React, useEffect, useState} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import CountDown from "react-native-countdown-fixed";
import * as Haptics from "expo-haptics";
import {useFonts} from "expo-font";
import {landscape} from "../services/orientationService";

const RSG = ["READY", "SET", "GO!!"];

const Load = ({route, navigation}) => {
    useEffect(() => {
        landscape();
    }, []);

    const {set, time, id} = route.params;

    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(RSG[0]);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    const handleFinish = () => {
        let copyTime = time;
        navigation.push("Game", {gameSet: set, time: copyTime, id: id});
    };
    const handleChange = () => {
        setDisplay(RSG[index + 1]);
        setIndex(index + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <View style={styles.container}>
            <CountDown onFinish={handleFinish} timeToShow={["M", "S"]} until={3} size={0} timeLabels={{s: ""}} onChange={handleChange} />
            <Text style={styles.displayText}>{display}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f2326",
        borderWidth: 1,
    },
    displayText: {
        color: "white",
        fontSize: 90,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "Valorant",
    },
});

export default Load;
