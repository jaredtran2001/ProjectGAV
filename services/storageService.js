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
import Jujutsu from "../assets/wordSets/jujutsukaisen.json"
import Hunter from "../assets/wordSets/hunterxhunter.json"

export async function initializeDecks() {
    try {
        // Check if decks are already in AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
        const decksExist = keys.some((key) => key.startsWith("deck"));

        //Update any decks that don't have PR
        if(decksExist && await beforePRUpdate()) {
            const addPR =  JSON.stringify({
                pr: 0
            });
            for(let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("deck")) {
                    await AsyncStorage.mergeItem(key, addPR);
                }
            }
        }
        
        // If decks don't exist, add default decks to AsyncStorage
        const defaultDecks = generateDefaultDeck();
        for (const key in defaultDecks) {
            if (defaultDecks.hasOwnProperty(key)) { // Ensure the key is an own property
                if (!(key in keys)) {
                    await AsyncStorage.setItem(key, JSON.stringify(defaultDecks[key]));
                }
            }
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

async function beforePRUpdate() {
    const firstDeck = await AsyncStorage.getItem("deck_00");
    const firstDeckObject = JSON.parse(firstDeck);
    return !("pr" in firstDeckObject)
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
    const jjkSet = jsonToSet(Jujutsu);
    const hxhSet = jsonToSet(Hunter);
    const defaultDecks = {
        deck_09: {
            set: Array.from(jjkSet),
            description: "Nah I'd win",
            title: "JJK",
            key: "deck_09",
            pr: 0,
        },
        deck_08: {
            set: Array.from(hxhSet),
            description: "First step of becoming a hunter: guess these characters!!",
            title: "HXH",
            key: "deck_08",
            pr: 0,
        },
        deck_07: {
            set: Array.from(animeSet),
            description: "C-ANYA GUESS ALL THESE POPULAR ANIMES!!!",
            title: "ANIME",
            key: "deck_07",
            pr: 0,
        },
        deck_06: {
            set: Array.from(narutoSet),
            description: "CONTAINS ALL THE BEST CHARACTERS FROM PERVY SAGE TO ITACHI (SAKURA NOT INCLUDED)",
            title: "NARUTO",
            key: "deck_06",
            pr: 0,
        },
        deck_05: {
            set: Array.from(onePieceSet),
            description: "ACE ALL THESE ONE PIECE CHARACTERS OR DIE :(",
            title: "ONE PIECE",
            key: "deck_05",
            pr: 0,
        },
        deck_04: {
            set: Array.from(kPopSet),
            description: "TEST YOUR KNOWLEDGE ON THE MOST POPULAR KPOP GROUPS 2000 AND UP!",
            title: "KPOP GROUPS",
            key: "deck_04",
            pr: 0,

        },
        deck_03: {
            set: Array.from(pokemonSet),
            description: "DO YOU KNOW YOUR FIRST GEN POKEMON?? DON'T BEA SLOW-POKE, TIMES TICKING",
            title: "POKEMON",
            key: "deck_03",
            pr: 0,
        },
        deck_02: {
            set: Array.from(leagueSet),
            description: "CALLING ALL LEAGUE DEGENS. THIS DECK CONTAINS ALL LEAGUE OF LEGENDS CHAMPIONS",
            title: "LOL",
            key: "deck_02",
            pr: 0,
        },
        deck_01: {
            set: Array.from(valorantSet),
            description: "SHOOT THROUGH THIS ASSORTMENT OF VALORANT AGENTS AND WEAPONS",
            title: "VALORANT",
            key: "deck_01",
            pr: 0,
        },
        deck_00: {
            set: Array.from(myHeroSet),
            description: "PLUS ULTRAAA GUESS THE VILLAINS, HEROES, AND STUDENTS OF MY HERO ACADEMIA",
            title: "MY HERO",
            key: "deck_00",
            pr: 0,
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
        let response = await AsyncStorage.getAllKeys();
        const keys = response.filter((item) => item.startsWith("deck"));
        const deckPromises = keys.map(async (key) => {
            const deckData = await AsyncStorage.getItem(key);
            return JSON.parse(deckData);
        });
        const decks = await Promise.all(deckPromises);
        const sortedDecks = decks.filter((deck) => deck !== null).sort((a, b) => b.key.localeCompare(a.key));
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

export async function checkFirstTime() {
    const hasVisitedBefore = await AsyncStorage.getItem("hasVisitedBefore");
    if (hasVisitedBefore === null) {
        await AsyncStorage.setItem("hasVisitedBefore", "true");
        return true;
    } else {
        return false;
    }
}

export async function updatePR(key, pr) {
    try {
        const deckData = await AsyncStorage.getItem(key);
        const parsedData = JSON.parse(deckData);

        if(pr > parsedData.pr) {
            parsedData.pr = pr;
            const updatedData = JSON.stringify(parsedData);
            await AsyncStorage.setItem(key, updatedData);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating PR", error);
        return [];
    }
}