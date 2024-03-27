import React, {useState} from "react";
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";
import {useFonts} from "expo-font";

// Component takes two colors: border and background. Upon click the backgound will become ther same color as border and text will take on different color
const ColorButton = ({text, borderColor, backgroundColor, onPress}) => {
    const [pressed, setPressed] = useState(false);
    const [textColor, setTextColor] = useState(borderColor);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableHighlight
            style={[styles.button, {backgroundColor: backgroundColor, borderColor: borderColor}]}
            onPressIn={() => setTextColor(backgroundColor)}
            onPress={onPress}
            onPressOut={() => setTextColor(borderColor)} // Revert to red after press ends
            underlayColor={borderColor} // No color change on touch
        >
            <View style={styles.buttonContent}>
                <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonContent: {
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "Valorant",
        fontSize: 16,
    },
});

export default ColorButton;
