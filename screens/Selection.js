import {React, useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator} from "react-native";
import Toast from "react-native-toast-message";
import PlayButton from "../components/PlayButton";
import {useFonts} from "expo-font";
import {generateDeck} from "../services/api.js";
import {portraitUp} from "../services/orientationService.js";
import {getSavedDecks, deleteDeck, saveDeck, jsonToSet} from "../services/storageService.js";
import {getImage} from "../services/imageService.js";

const Selection = ({navigation}) => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        portraitUp();
        const retrieveDecks = async () => {
            try {
                const response = await getSavedDecks();
                setDecks(response);
            } catch (error) {
                console.error("Error fetching data:", error);
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
        const deckJSON = await generateDeck(text);
        console.log("handling deck");

        if (!deckJSON) {
            console.log("entered");
            showToast("Could not generate deck", "Try to be simple but concise i.e. soccer players");
            setLoading(false);
            setText("");
            return;
        }
        const newSet = jsonToSet(deckJSON);
        const newDeckDetails = {
            set: newSet,
            description: "Your own custom deck. Let's give it a whirl",
            title: text,
        };
        setDecks([...decks, newDeckDetails]);
        setText("");
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Subtle Asian Charades</Text>
                </View>
                <View style={[styles.horiLine, {marginBottom: 20}]} />
                <View style={styles.form}>
                    {/* Render the list of decks dynamically */}
                    {decks.length > 0 ? (
                        decks.map((deckData, index) => (
                            <PlayButton
                                key={index}
                                img={getImage(deckData.title)}
                                onPress={() => {
                                    first = true;
                                    navigation.push("Description", {
                                        set: Array.from(deckData.set),
                                        description: deckData.description,
                                        category: deckData.title,
                                        // img: imageMapping[deckData.title],
                                    });
                                }}
                                title={deckData.title}
                            />
                        ))
                    ) : (
                        <Text>No decks available.</Text>
                    )}
                </View>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <TextInput
                        style={styles.textInput}
                        type="text"
                        placeholder="Create Deck"
                        placeholderTextColor="#ff4656"
                        value={text}
                        onChangeText={handleInputChange}
                        onSubmitEditing={handleAddDeck}
                        textAlign={"center"}
                    />
                )}
                <Toast />

                <View style={[styles.horiLine, {marginTop: 20}]} />
                <View style={styles.footer} />
            </ScrollView>
        </View>
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
        height: 50,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        margin: 16,
        paddingHorizontal: 10,
        color: "#ff4656",
        width: "80%", // Set the width of the input
        borderColor: "#ccc", // Add a border color for visual separation
        borderWidth: 1, // Add a border width
        borderRadius: 5, // Add border radius for rounded corners
    },
});

export default Selection;
