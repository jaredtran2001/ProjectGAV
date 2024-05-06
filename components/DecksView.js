import React from "react";
import {View, StyleSheet} from "react-native";
import {getImage} from "../services/imageService.js";
import PlayButton from "./PlayButton";

// Component renders the decks in a formated way
const DecksView = ({decks, filter, handleDelete, navigation}) => {
    return (
        <View style={styles.form}>
            {decks.map(
                (deckData, index) =>
                    filter(deckData.key) && (
                        <PlayButton
                            key={index}
                            img={getImage(deckData.title)}
                            onPress={() => {
                                first = true;
                                navigation.push("Description", {
                                    set: Array.from(deckData.set),
                                    description: deckData.description,
                                    category: deckData.title,
                                    id: deckData.key,
                                    pr: deckData.pr
                                });
                            }}
                            title={deckData.title}
                            onDelete={handleDelete}
                            uniqueKey={deckData.key}
                        />
                    ),
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
    },
});

export default DecksView;
