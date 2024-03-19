import AsyncStorage from "@react-native-async-storage/async-storage";

//sets
import Champions from "../assets/wordSets/lolChampions.json";
import Anime from "../assets/wordSets/anime.json";
import Kpop from "../assets/wordSets/kpop.json";
import Pokemon from "../assets/wordSets/pokemon.json";
import Naruto from "../assets/wordSets/naruto.json";
import Valorant from "../assets/wordSets/valorant.json";
import OnePiece from "../assets/wordSets/onePiece.json";
import MyHero from "../assets/wordSets/myHero.json";

export async function initializeDecks() {
    try {
        // Check if decks are already in AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        const decksExist = keys.some((key) => key.startsWith("deck"));

        // If decks don't exist, add default decks to AsyncStorage
        if (!decksExist) {
            const defaultDecks = generateDefaultDeck();
            await Promise.all(
                Object.keys(defaultDecks).map(async (deckKey) => {
                    const deckData = defaultDecks[deckKey];
                    await AsyncStorage.setItem(deckKey, JSON.stringify(deckData));
                }),
            );
        }
    } catch (error) {
        console.error("Error initializing decks:", error);
    }
}

export function jsonToSet(json) {
    let set = new Set();
    json.map((item) => set.add(item.name));
    return set;
}

function generateDefaultDeck() {
    const animeSet = jsonToSet(Anime);
    const narutoSet = jsonToSet(Naruto);
    const onePieceSet = jsonToSet(OnePiece);
    const kPopSet = jsonToSet(Kpop);
    const pokemonSet = jsonToSet(Pokemon);
    const leagueSet = jsonToSet(Champions);
    const valorantSet = jsonToSet(Valorant);
    const myHeroSet = jsonToSet(MyHero);
    const defaultDecks = {
        deck_00: {
            set: Array.from(animeSet),
            description: "SLICE THROUGH THIS ASSORTMENT OF ANIME'S RANGING FROM ALL SORTS OF POPULARITY!",
            title: "ANIME",
            key: "deck_00",
        },
        deck_01: {
            set: Array.from(narutoSet),
            description: "IT'S MY NINJA WAY TO GUESS MY FAVORITE NARUTO CHARACTERS",
            title: "NARUTO",
            key: "deck_01",
        },
        deck_02: {
            set: Array.from(onePieceSet),
            description: "GUESS THE MOST POPULAR ONE PIECE CHARACTERS TO BECOME THE PIRATE KING!",
            title: "ONE PIECE",
            key: "deck_02",
        },
        deck_03: {
            set: Array.from(kPopSet),
            description: "TEST YOUR KNOWLEDGE ON THE MOST POPULAR KPOP GROUPS 2000 AND UP!",
            title: "KPOP GROUPS",
            key: "deck_03",
        },
        deck_04: {
            set: Array.from(pokemonSet),
            description: "DO YOU KNOW YOUR FIRST GEN POKEMON?? BETTER GO FAST AND MAKE SURE YOU'RE NOT A SLOW-POKE",
            title: "POKEMON",
            key: "deck_04",
        },
        deck_05: {
            set: Array.from(leagueSet),
            description: "HOW MUCH MORE DEGENERATE COULD WE BE IF WE DIDN'T HAVE A LEAGUE OF LEGENDS CATEGORY ON ALMOST ALL CHAMPIONS",
            title: "LOL",
            key: "deck_05",
        },
        deck_06: {
            set: Array.from(valorantSet),
            description: "BLAZE THROUGH YOUR FAVORITE VALORANT CHARACTER'S ABILITIES AND RISE TO THE RANKS OF IMMORTAL",
            title: "VALORANT",
            key: "deck_06",
        },
        deck_07: {
            set: Array.from(myHeroSet),
            description: "PLUS ULTRAAA GUESS THE VILLAINS, HEROES, AND STUDENTS OF MY HERO ACADEMIA",
            title: "MY HERO",
            key: "deck_07",
        },
    };
    return defaultDecks;
}

export async function saveDeck(key, deckData) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(deckData));
    } catch (error) {
        console.error("Error saving deck:", error);
    }
}

export async function deleteDeck(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error deleting card:", error);
    }
}

export async function getSavedDecks() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const deckPromises = keys.map(async (key) => {
            const deckData = await AsyncStorage.getItem(key);
            return JSON.parse(deckData);
        });
        const decks = await Promise.all(deckPromises);
        const sortedDecks = decks.filter((deck) => deck !== null).sort((a, b) => a.key.localeCompare(b.key));
        // console.log(sortedDecks);
        return sortedDecks.filter((deck) => deck !== null);
    } catch (error) {
        console.error("Error retrieving decks:", error);
        return [];
    }
}

export function generateUniqueKey() {
    const timestampKey = new Date().getTime().toString();
    return "deck_" + timestampKey;
}
