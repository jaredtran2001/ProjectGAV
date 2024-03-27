import React from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import ColorButton from "./ColorButton";

const ModalContent = ({textValue, handleInputChange, handleAddDeck}) => {
    return (
        <View style={styles.modalContent}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>DESCRIBE YOUR NEW DECK</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    type="text"
                    placeholder="e.g. NBA TEAMS"
                    placeholderTextColor="#ff4656"
                    value={textValue}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleAddDeck}
                    textAlign={"center"}
                    maxLength={20}
                    autoCapitalize={"characters"}
                />
                <ColorButton text="SUBMIT" backgroundColor="#ff4656" borderColor="white" onPress={handleAddDeck}></ColorButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "black",
        padding: 20,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: "white",
        alignItems: "center",
        gap: 10,
        width: "80%",
    },

    textInputContainer: {
        flexDirection: "row", // Arrange children horizontally
        alignItems: "center", // Align items vertically in the center
        justifyContent: "center",
        width: "100%",
        gap: 10,
    },
    textInput: {
        height: "100%",
        borderWidth: 1,
        width: "60%",
        paddingHorizontal: 10,
        color: "#ff4656",
        borderColor: "#ccc", // Add a border color for visual separation
        borderWidth: 1,
    },
});

export default ModalContent;
