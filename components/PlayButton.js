import {React} from "react";
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image} from "react-native";

const PlayButton = ({img, onPress, title}) => {
    const PassedImg = img;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.imgctr}>
                <PassedImg width={"100%"} height={"100%"} />
            </View>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 240,
        width: "45%",
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#505155",
        // backgroundColor: '#526174',
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        // color: '#ff4656',
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
    imgctr: {
        flex: 1,
        width: "60%",
    },
});

export default PlayButton;
