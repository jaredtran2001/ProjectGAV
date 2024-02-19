import {React, useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator} from "react-native";
import Toast from "react-native-toast-message";
import PlayButton from "../components/PlayButton";
import Champions from "../assets/wordSets/lolChampions.json";
import Anime from "../assets/wordSets/anime.json";
import Kpop from "../assets/wordSets/kpop.json";
import Pokemon from "../assets/wordSets/pokemon.json";
import {useFonts} from "expo-font";
import Naruto from "../assets/wordSets/naruto.json";
import Valorant from "../assets/wordSets/valorant.json";
import OnePiece from "../assets/wordSets/onePiece.json";
import kPopSong from "../assets/wordSets/kpopSong.json";
import MyHero from "../assets/wordSets/myHero.json";
import * as ScreenOrientation from "expo-screen-orientation";
//imgs
import pokemonImg from "../assets/images/pikachu.svg";
import leagueImg from "../assets/images/league.svg";
import luffyImg from "../assets/images/luffy.svg";
import kDanceImg from "../assets/images/kdance.svg";
import kpopImg from "../assets/images/bts.svg";
import myHeroImg from "../assets/images/midoriya.svg";
import narutoImg from "../assets/images/naruto.svg";
import animeImg from "../assets/images/anya.svg";

const generateDeck = require("../services/api.js");

function jsonToSet(json) {
    let set = new Set();
    json.map((item) => set.add(item.name));
    return set;
}

const Selection = ({navigation}) => {
    async function fixOrientation() {
        await ScreenOrientation.unlockAsync();
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    useEffect(() => {
        fixOrientation();
    }, []);

    const animeSet = jsonToSet(Anime);
    const narutoSet = jsonToSet(Naruto);
    const onePieceSet = jsonToSet(OnePiece);
    const kPopSet = jsonToSet(Kpop);
    const pokemonSet = jsonToSet(Pokemon);
    const leagueSet = jsonToSet(Champions);
    const valorantSet = jsonToSet(Valorant);
    const kpopSongSet = jsonToSet(kPopSong);
    const myHeroSet = jsonToSet(MyHero);

    const defaultDecks = [
        {
            img: animeImg,
            set: animeSet,
            description: "SLICE THROUGH THIS ASSORTMENT OF ANIME'S RANGING FROM ALL SORTS OF POPULARITY!",
            title: "ANIME",
        },
        {
            img: narutoImg,
            set: narutoSet,
            description: "IT'S MY NINJA WAY TO GUESS MY FAVORITE NARUTO CHARACTERS",
            title: "NARUTO",
        },
        {
            img: luffyImg,
            set: onePieceSet,
            description: "GUESS THE MOST POPULAR ONE PIECE CHARACTERS TO BECOME THE PIRATE KING!",
            title: "ONE PIECE",
        },
        {
            img: kpopImg,
            set: kPopSet,
            description: "TEST YOUR KNOWLEDGE ON THE MOST POPULAR KPOP GROUPS 2000 AND UP!",
            title: "KPOP GROUPS",
        },
        {
            img: pokemonImg,
            set: pokemonSet,
            description: "DO YOU KNOW YOUR FIRST GEN POKEMON?? BETTER GO FAST AND MAKE SURE YOU'RE NOT A SLOW-POKE",
            title: "POKEMON",
        },
        {
            img: leagueImg,
            set: leagueSet,
            description: "HOW MUCH MORE DEGENERATE COULD WE BE IF WE DIDN'T HAVE A LEAGUE OF LEGENDS CATEGORY ON ALMOST ALL CHAMPIONS",
            title: "LOL",
        },
        {
            img: leagueImg,
            set: valorantSet,
            description: "BLAZE THROUGH YOUR FAVORITE VALORANT CHARACTER'S ABILITIES AND RISE TO THE RANKS OF IMMORTAL",
            title: "VALORANT",
        },
        {
            img: kDanceImg,
            set: kpopSongSet,
            description: "DANCE YOUR WAY INTO VICTORY! TALKING IS NOT ALLOWED",
            title: "KPOP DANCE",
        },
        {
            img: myHeroImg,
            set: myHeroSet,
            description: "PLUS ULTRAAA GUESS THE VILLAINS, HEROES, AND STUDENTS OF MY HERO ACADEMIA",
            title: "MY HERO",
        },
    ];

    const [text, setText] = useState("");
    const [decks, setDecks] = useState(defaultDecks);
    const [loading, setLoading] = useState(false);
    const [fontsLoaded] = useFonts({
        Valorant: require("../assets/fonts/Valorant-Font.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: "Could not generate deck",
            text2: "Try to be simple but concise i.e. soccer players",
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
        // const deckJSON = null;
        console.log(" handling deck");

        if (!deckJSON) {
            console.log("entered");
            showToast();
            setLoading(false);
            setText("");
            return;
        }
        const newSet = jsonToSet(deckJSON);
        const newDeckDetails = {
            img: kpopImg,
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
                    {decks.map((deckData, index) => (
                        <PlayButton
                            key={index}
                            img={deckData.img}
                            onPress={() => {
                                first = true;
                                navigation.push("Description", {
                                    set: deckData.set,
                                    description: deckData.description,
                                    category: deckData.title,
                                    img: deckData.img,
                                });
                            }}
                            title={deckData.title}
                        />
                    ))}
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
