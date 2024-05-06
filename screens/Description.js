import {React, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import PlusButton from "../components/PlusButton";
import MinusButton from "../components/MinusButton";
import GameTimeButton from "../components/GameTimeButton";
import ExitButton from "../components/ExitButton";
import {getImage} from "../services/imageService.js";

const Description = ({route, navigation}) => {
    const {set, description, category, id, pr} = route.params;
    const Display = getImage(category);
    const [time, setTime] = useState(60);
    const [displayTime, setdisplayTime] = useState("1:00");
    useEffect(() => {
        let min = "" + Math.floor(time / 60);
        let sec = time % 60;
        if (sec < 10) {
            sec = "0" + sec;
        } else {
            sec = "" + sec;
        }
        setdisplayTime(min + ":" + sec);
    }, [time]);

    function handlePlus() {
        if (time < 120) {
            setTime(time + 30);
        }
    }
    function handleMinus() {
        if (time > 30) {
            setTime(time - 30);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.recordView}>{pr}</Text>
            <View style={styles.exit}>
                <ExitButton onPress={() => navigation.navigate("Selection")} />
            </View>
            <View style={styles.description}>
                <View style={styles.imgctr}>
                    <Display width={"100%"} height={"100%"} />
                </View>
                <View style={styles.textctr}>
                    <Text style={styles.displayText}>{category}</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            </View>
            <View style={styles.timerCtr}>
                <View style={styles.timer}>
                    <MinusButton onPress={handleMinus} />
                    <View style={styles.timeTextBox}>
                        <Text style={styles.timeText}>{displayTime}</Text>
                    </View>
                    <PlusButton onPress={handlePlus} />
                </View>

                <View style={styles.caption}>
                    <Text style={styles.descriptionText}>ADJUST DURATION</Text>
                </View>
                <View style={styles.start}>
                    <GameTimeButton onPress={() => navigation.push("Load", {set: set, time: time, id: id})} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#1f2326",
    },
    exit: {
        position: "absolute",
        right: "6%",
        top: "8%",
        zIndex: 10000,
    },
    description: {
        flex: 2,
        height: "50%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "10%",
    },
    imgctr: {
        width: "50%",
        height: "40%",
    },
    textCtr: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    displayText: {
        color: "#ff4656",
        fontSize: 50,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "Valorant",
        textAlign: "center",
    },
    descriptionText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 30,
        marginRight: 30,
    },
    timer: {
        height: "25%",
        flexDirection: "row",
        justifyContent: "center",
    },
    timerCtr: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: "10%",
    },
    timeText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    timeTextBox: {
        backgroundColor: "#ff4656",
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    caption: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    start: {
        height: "25%",
        width: "90%",
        flexDirection: "row",
    },
    recordView: {
        zIndex: 5,
        position: "absolute",
        left: "6%",
        top: "8%",
        color: "white",
        fontFamily: "Valorant",
        fontSize: 30
    }
});

export default Description;
