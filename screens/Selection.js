import {React, useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Modal, TouchableWithoutFeedback} from "react-native";
import Toast from "react-native-toast-message";
import {useFonts} from "expo-font";
import {generateDeck} from "../services/api.js";
import {portraitUp} from "../services/orientationService.js";
import {getSavedDecks, deleteDeck, saveDeck, jsonToSet, generateUniqueKey} from "../services/storageService.js";
import Instruction from "../assets/images/instructionIcon.svg";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import ColorButton from "../components/ColorButton.js";
import ModalContent from "../components/ModalContent.js";
import DecksView from "../components/DecksView.js";

const Selection = ({navigation}) => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        portraitUp();
        const retrieveDecks = async () => {
            try {
                const response = await getSavedDecks();
                setDecks(response);
            } catch (error) {
                showToast("NO DECKS?!", "Could not fetch decks");
            }
        };
        retrieveDecks();
    }, []);

    const defaultKeys = new Set(["deck_01", "deck_02", "deck_03", "deck_04", "deck_05", "deck_06", "deck_07", "deck_00"]);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: "first", title: "Default"},
        {key: "second", title: "Custom"},
    ]);

    const FirstRoute = () => (
        <ScrollView style={styles.defaultView} howsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, minWidth: "100%"}}>
            <DecksView decks={decks} filter={isDefaultDeck} handleDelete={handleDelete} navigation={navigation}></DecksView>
            <View style={{height: 250}}></View>
        </ScrollView>
    );
    const SecondRoute = () => (
        <ScrollView style={styles.defaultView} howsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, minWidth: "100%"}}>
            <View style={styles.generateDeckView}>
                <ColorButton
                    text="CREATE DECK"
                    backgroundColor="#ff4656"
                    borderColor="white"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                ></ColorButton>
            </View>
            <DecksView decks={decks} filter={isNotDefaultDeck} handleDelete={handleDelete} navigation={navigation}></DecksView>
            <View style={{height: 250}}></View>
        </ScrollView>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const renderTabBar = (props) => (
        <TabBar {...props} indicatorStyle={{backgroundColor: "white"}} style={{backgroundColor: "#1f2326"}} labelStyle={{fontFamily: "Valorant"}} />
    );

    const showToast = (header, text) => {
        Toast.show({
            type: "error",
            text1: header,
            text2: text,
            position: "top",
            visibilityTime: 5000,
        });
    };

    const handleInputChange = (inputText) => {
        setText(inputText);
    };

    const handleAddDeck = async () => {
        setLoading(true);
        try {
            const deckJSON = Array.from(await generateDeck(text));
            if (!deckJSON || !deckJSON.length || deckJSON.length < 5) {
                showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
                resetInputText();
                return;
            }
            const newSet = jsonToSet(deckJSON);
            const newDeckDetails = {
                set: Array.from(newSet),
                description: "Your own custom deck. Let's give it a whirl",
                title: text,
                key: generateUniqueKey(),
            };
            saveDeck(newDeckDetails.key, newDeckDetails);
            setDecks([newDeckDetails, ...decks]);
            resetInputText();
        } catch (error) {
            resetInputText();
        }
    };

    const resetInputText = () => {
        setLoading(false);
        setText("");
        setModalVisible(false);
    };

    const handleDelete = (key) => {
        deleteDeck(key);
        const updatedDecks = decks.filter((deck) => deck.key !== key);
        setDecks(updatedDecks);
    };

    const isDefaultDeck = (key) => {
        if (defaultKeys.has(key)) {
            return true;
        }
        return false;
    };
    const isNotDefaultDeck = (key) => {
        if (defaultKeys.has(key)) {
            return false;
        }
        return true;
    };

    return (
        <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Subtle Asian Charades</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Instruction")} style={styles.instructionButton}>
                        <Instruction width={"100%"} height={"100%"} />
                    </TouchableOpacity>
                </View>
                <View style={{flexGrow: 1}}>
                    <TabView
                        navigationState={{index, routes}}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{width: "100%"}}
                        style={{flex: 1}}
                        sceneContainerStyle={{height: "130%"}}
                        renderTabBar={renderTabBar}
                    />
                </View>
                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log("Closing modal");
                            resetInputText();
                        }}
                    >
                        <View style={styles.modalContainer}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <ModalContent text={text} handleInputChange={handleInputChange} handleAddDeck={handleAddDeck}></ModalContent>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Toast />
                <View style={{height: 50}} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f2326",
    },
    header: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
    },
    headerText: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#ff4656",
        fontFamily: "Valorant",
        textAlign: "center",
    },
    generateDeckView: {
        width: "90%",
        marginBottom: 16,
        alignSelf: "center",
    },
    instructionButton: {
        width: 50,
        height: 50,
        padding: 10,
        zIndex: 3,
    },
    settingsContainer: {
        position: "absolute",
        right: 0,
        top: 100,
    },
    defaultView: {
        paddingTop: 20,
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifySelf: "center",
        zIndex: 1,
    },
});

export default Selection;
