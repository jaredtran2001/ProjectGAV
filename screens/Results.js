import {React, useEffect, useState, useRef} from "react";
import {StyleSheet, Text, View, ScrollView, Vibration, Animated} from "react-native";
import ResultButton from "../components/ResultButton";
import {portraitUp} from "../services/orientationService";
import {updatePR} from "../services/storageService";
import ConfettiCannon from 'react-native-confetti-cannon';

const Results = ({route, navigation}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [newPR, setNewPR] = useState(false);
    const [index, setIndex] = useState(5);
    function fadeInOut() {
        Animated.sequence([
            // Fade in animation
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            // Fade out animation
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 5000, 
                useNativeDriver: true,
            }),
        ]).start();
        setTimeout(() => setIndex(0), 6000);
    }

    useEffect(() => {
        portraitUp();
        Vibration.vibrate();
        setTimeout(() => Vibration.vibrate(), 600);
        const update = async () => {
            try {
                const result = await updatePR(id, num);
                if(result) {
                    fadeInOut();
                    setNewPR(true);
                } else {
                    setIndex(0);
                }
            } catch (error) {
                
            }
        };
        update();
    }, []);

    const {result, num, currSet, time, id} = route.params;

    const handlePlayAgainFinish = () => {
        navigation.push("Load", {set: currSet, time: time, id: id});
    };
    const handleAllDecksFinish = () => {
        navigation.push("Selection");
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.centeredView, {zIndex: index}, {opacity: fadeAnim}]}>
                {newPR && <ConfettiCannon count={200} origin={{x: -10, y: 1000}} explosionSpeed={5000} fallSpeed={2000} colors={["#ff4656", "#fc6872", "#ffffff"]}/>}
                <Text style={[styles.text, {color: "#ff4656"}]}>HIGH</Text>
                <Text style={[styles.text, {color: "#ff4656"}]}>SCORE</Text>
            </Animated.View>
            <View style={styles.header}>
                <Text style={styles.headerText}>YOU GOT {num} WORDS!</Text>
            </View>
            <View style={[styles.horiLine, {marginTop: "5%"}]} />
            <View style={styles.body}>
                <View style={[styles.vertLine, {marginLeft: "3%"}]} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {result.map((word, index) => {
                        if (word[1] == 0 && index == 0) {
                            return (
                                <Text key={word} style={[styles.resultText, {marginTop: 30, color: "gray"}]}>
                                    {word[0]}
                                </Text>
                            );
                        } else if (word[1] == 1 && index == 0) {
                            return (
                                <Text key={word} style={[styles.resultText, {marginTop: 30}]}>
                                    {word[0]}
                                </Text>
                            );
                        } else if (word[1] == 0) {
                            return (
                                <Text key={word} style={[styles.resultText, {color: "gray"}]}>
                                    {word[0]}
                                </Text>
                            );
                        } else {
                            return (
                                <Text key={word} style={styles.resultText}>
                                    {word[0]}
                                </Text>
                            );
                        }
                    })}
                </ScrollView>
                <View style={[styles.vertLine, {marginRight: "3%"}]} />
            </View>
            <View style={[styles.horiLine, {marginBottom: "5%"}]} />
            <View style={[styles.header, {justifyContent: "flex-start"}]}>
                <ResultButton title="PLAY AGAIN" onPress={handlePlayAgainFinish} color="#ff4656" />
                <ResultButton onPress={handleAllDecksFinish} title="EXIT" color="#e03e4d" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f2326",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    horiLine: {
        borderBottomWidth: 1,
        borderColor: "#ff4656",
        width: "60%",
    },
    vertLine: {
        borderLeftWidth: 1,
        borderColor: "#ff4656",
        height: "80%",
    },
    header: {
        height: "12%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    body: {
        height: "67%",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 37,
        fontWeight: "bold",
        color: "white",
    },
    resultText: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 5,
        color: "white",
        textTransform: "uppercase",
    },
    text: {
        fontSize: 70,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Valorant",
    },
    centeredView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 1.0)",
        width: "100%", 
        height: "100%",
    }
});

export default Results;
