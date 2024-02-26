import {React, useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import Toast from "react-native-toast-message";
import PlayButton from "../components/PlayButton";
import {useFonts} from "expo-font";
import {generateDeck} from "../services/api.js";
import {portraitUp} from "../services/orientationService.js";
import {getSavedDecks, deleteDeck, saveDeck, jsonToSet, generateUniqueKey} from "../services/storageService.js";
import {getImage} from "../services/imageService.js";

const Selection = ({navigation}) => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        portraitUp();
        const retrieveDecks = async () => {
            try {
                const response = await getSavedDecks();
                setDecks(response);
                // console.log(decks)
            } catch (error) {
                showToast("NO DECKS?!", "Could not fetch decks");
            }
        };
        retrieveDecks();
    }, []);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    const showToast = (header, text) => {
        Toast.show({
            type: "error",
            text1: header,
            text2: text,
            position: "bottom",
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
            if (!deckJSON) {
                showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
                setLoading(false);
                setText("");
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
            setDecks([...decks, newDeckDetails]);
            setText("");
            setLoading(false);
        } catch (error) {
            showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
            setLoading(false);
            setText("");
            throw error;
        }
    };

    const handleDelete = (key) => {
        deleteDeck(key);
        const updatedDecks = decks.filter((deck) => deck.key !== key);
        setDecks(updatedDecks);
    };

    return (
        <KeyboardAvoidingView behavior={"padding"} style={styles.keyboardContainer}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Subtle Asian Charades</Text>
                    </View>
                    <View style={[styles.horiLine, {marginBottom: 20}]} />

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    ) : (
                        // <ActivityIndicator size="small" color="#fff" />
                        <TextInput
                            style={styles.textInput}
                            type="text"
                            placeholder="Create Deck (NBA Teams)"
                            placeholderTextColor="#ff4656"
                            value={text}
                            onChangeText={handleInputChange}
                            onSubmitEditing={handleAddDeck}
                            textAlign={"center"}
                            maxLength={20}
                        />
                    )}
                    {decks.length > 0 ? (
                        <View style={styles.form}>
                            {decks.map((deckData, index) => (
                                <PlayButton
                                    key={index}
                                    img={getImage(deckData.title)}
                                    onPress={() => {
                                        first = true;
                                        navigation.push("Description", {
                                            set: Array.from(deckData.set),
                                            description: deckData.description,
                                            category: deckData.title,
                                        });
                                    }}
                                    title={deckData.title}
                                    onDelete={handleDelete}
                                    uniqueKey={deckData.key}
                                />
                            ))}
                        </View>
                    ) : (
                        <View>
                            <ActivityIndicator size="small" color="#fff" />
                            <Text>Loading Decks</Text>
                        </View>
                    )}
                    <Toast />
                    <View style={[styles.horiLine, {marginTop: 20}]} />
                    <View style={styles.footer} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#1f2326",
    },
    scrollContainer: {
        alignItems: "center",
    },
    horiLine: {
        borderBottomWidth: 1,
        borderColor: "#ff4656",
        width: "60%",
    },
    header: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "12%",
    },
    headerText: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#ff4656",
        fontFamily: "Valorant",
        textAlign: "center",
    },
    form: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
    },
    footer: {
        width: "100%",
        height: 100,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        margin: 16,
        paddingHorizontal: 10,
        color: "#ff4656",
        width: "90%", // Set the width of the input
        borderColor: "#ccc", // Add a border color for visual separation
        borderWidth: 1, // Add a border width
        borderRadius: 5, // Add border radius for rounded corners
        marginTop: 0,
    },
    keyboardContainer: {
        flex: 1,
        // justifyContent: "center",
        // padding: 16,
    },

    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
    },
});

export default Selection;
