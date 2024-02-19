import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveDeck(key, cardData) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(cardData));
    } catch (error) {
        console.error("Error saving card:", error);
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
        const cardPromises = keys.map(async (key) => {
            const cardData = await AsyncStorage.getItem(key);
            return JSON.parse(cardData);
        });
        const cards = await Promise.all(cardPromises);
        return cards.filter((card) => card !== null);
    } catch (error) {
        console.error("Error retrieving cards:", error);
        return [];
    }
}
