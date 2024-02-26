import {React, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Button, Modal} from "react-native";

const PlayButton = ({img, onPress, title, onDelete, uniqueKey}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const defaultKeys = new Set(["deck1", "deck2", "deck3", "deck4", "deck5", "deck6", "deck7", "deck8"]);
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
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.underlyingButton} onPress={onPress} onLongPress={handleOnLongPress}>
                <View style={styles.imgctr}>
                    <PassedImg width={"100%"} height={"100%"} />
                </View>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
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
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#505155",
    },
});

export default PlayButton;
