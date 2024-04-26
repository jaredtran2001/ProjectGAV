import {React, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Button, Modal} from "react-native";
import {useFonts} from "expo-font";

const PlayButton = ({img, onPress, title, onDelete, uniqueKey, record}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const defaultKeys = new Set(["deck_01", "deck_02", "deck_03", "deck_04", "deck_05", "deck_06", "deck_07", "deck_00"]);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    const handleOnLongPress = () => {
        if (!defaultKeys.has(uniqueKey)) {
            setModalVisible(true);
        }
    };
    const handleDelete = () => {
        onDelete(uniqueKey);
        setModalVisible(false);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    const PassedImg = img;
    const titleShortened = title.length > 22 ? title.substring(0, 20) + "..." : title;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.underlyingButton} onPress={onPress} onLongPress={handleOnLongPress}>
                <View style={styles.imgctr}>
                    <PassedImg width={"100%"} height={"100%"} />
                </View>
                <Text style={styles.text}>{titleShortened}</Text>
            </TouchableOpacity>
            <Text style={styles.recordView}>{record}</Text>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 18}}>Do you want to delete {title}?</Text>
                        <Button title="Delete" onPress={handleDelete} color="#ff4656" />
                        <Button title="Cancel" onPress={handleCloseModal} color="#ff4656" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 240,
        width: "45%",
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#505155",
    },
    underlyingButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
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
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#505155",
    },
    recordView: {
        zIndex: 5,
        position: "absolute",
        right: 5,
        top: 5,
        color: "white",
        fontFamily: "Valorant"
    }
});

export default PlayButton;
