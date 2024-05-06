import {React, useState, useEffect} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import CountDown from "react-native-countdown-fixed";
import {DeviceMotion} from "expo-sensors";
import * as Haptics from "expo-haptics";
import {Audio} from "expo-av";
import ExitButton from "../components/ExitButton";

let number = 0;
let result = [];
let initialized = false;
let set;


const skip = (gamma, flip, output) => {
    return ((gamma > -0.75 && gamma < -0.01) || (gamma < 0.75 && gamma > 0.01)) && !flip && output !== "Ran out of words :(";
};

const correct = (gamma, flip, output) => {
    return ((gamma < -2.25 && gamma > -2.99) || (gamma > 2.25 && gamma < 2.99)) && !flip  && output !== "Ran out of words :(";
};

const neutral = (gamma, flip) => {
    return ((gamma < -1.0 && gamma > -2.0) || (gamma > 1.0 && gamma < 2.0)) && flip;
};

const Game = ({route, navigation}) => {
    const [sound, setSound] = useState();

    async function playSuccessSound(path) {
        const {sound} = await Audio.Sound.createAsync(path);
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    //Grabbing the provided word set and function to produce a new word from it
    const {gameSet, time, id} = route.params;
    if(!initialized) {
        set = new Set(gameSet);
        initialized = true;
    }
    const [min, setMin] = useState(Math.floor(time / 60));
    const [totalSec, setTS] = useState(time);
    const [running, setRunning] = useState(true); 
    const generateWord = () => {
        if (set.size == 0) {
            return "Ran out of words :(";
        }
        let items = Array.from(set);
        let word = items[Math.floor(Math.random() * items.length)];
        set.delete(word);
        return word;
    };

    //states
    const [output, setOutput] = useState();
    const [data, setData] = useState({});
    const [flip, setFlip] = useState(false);
    const [color, setColor] = useState("#1f2326");

    useEffect(() => {
        _subscribe();
        return () => {
            _unsubscribe();
        };
    }, []);

    //Handles when the timer runs out of time
    const handleFinish = () => {
        setRunning(false);
        if (output !== "Passed" && output !== "Correct" && output !== "Ran out of words :(") {
            let input = [output, 0];
            result.push(input);
        }
        let tempResult = [...result];
        let tempNum = number + "";
        //resetting values
        result = [];
        number = 0;
        initialized = false;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        _unsubscribe();
        navigation.push("Results", {
            result: tempResult,
            num: tempNum,
            currSet: gameSet,
            time: time,
            id: id,
        });
    };

    //Slows down how often we are reading the motion so it isn't so sensitive
    const _setInterval = () => {
        DeviceMotion.setUpdateInterval(77);
    };

    //Subscription listeners
    const _subscribe = () => {
        DeviceMotion.addListener((devicemotionData) => {
            setData(devicemotionData.rotation);
        });
        _setInterval();
    };

    const _unsubscribe = () => {
        DeviceMotion.removeAllListeners();
    };

    // Functions to handle getting a new word when motion is detected
    useEffect(() => {
        let {gamma} = data;
        if (skip(gamma, flip, output)) {
            result.push([output, 0]);
            setFlip(true);
            setOutput("Passed");
            setColor("#E14749");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            playSuccessSound(require("../assets/sounds/failure.mp3"));
        } else if (correct(gamma, flip, output)) {
            result.push([output, 1]);
            number += 1;
            setFlip(true);
            setOutput("Correct");
            setColor("#3CAE75");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            playSuccessSound(require("../assets/sounds/success.mp3"));
        } else if (neutral(gamma, flip) || output == null) {
            setFlip(false);
            const newWord = generateWord();

            setOutput(newWord);
            setColor("#1f2326");
        }
    }, [data]);

    const timeChange = () => {
        let nTime = totalSec - 1;
        setTS(totalSec - 1);
        setMin(Math.floor(nTime / 60));
    };

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            {/* {renderCounter} */}
            {
                <>
                    <View style={{position: "absolute", top: 14, right: 30, width: 100}}>
                        <CountDown
                            onFinish={handleFinish}
                            timeToShow={["S"]}
                            until={time}
                            size={30}
                            timeLabels={{s: ""}}
                            showSeperator={true}
                            digitStyle={{backgroundColor: "#ff4656", width: "100%", height: 60}}
                            digitTxtStyle={{left: 20, color: "black"}}
                            onChange={timeChange}
                            running={running}
                        />
                    </View>
                    <Text style={{position: "absolute", top: 23, right: 85, color: "black", fontSize: 30, fontWeight: "bold"}}>:</Text>
                    <Text style={{position: "absolute", top: 26, right: 99, color: "black", fontSize: 30, fontWeight: "bold"}}>{min}</Text>
                </>
            }

            <View style={[styles.horiLine, {margin: 10}]} />
            <Text style={styles.text}>{output}</Text>
            <View style={[styles.horiLine, {margin: 10}]} />
            <View style={{position: "absolute", top: 28, left: 30, width: 100}}>
                <ExitButton onPress={handleFinish} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
    },
    horiLine: {
        borderBottomWidth: 1,
        borderColor: "#ff4656",
        width: "15%",
    },
});

export default Game;
