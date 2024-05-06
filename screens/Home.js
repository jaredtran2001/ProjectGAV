import {React, useState, useEffect, useRef} from "react";
import {StyleSheet, Text, View, Animated} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {initializeDecks, checkFirstTime} from "../services/storageService";
import {portraitUp} from "../services/orientationService.js";

const Home = ({navigation}) => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 1000);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [output] = useState("GAV");

    useEffect(() => {
        portraitUp();
        fadeIn();
        const fetchData = async () => {
            try {
                initializeDecks();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        setTimeout(async () => {
            const check = await checkFirstTime();
            if (check) {
                navigation.navigate("Instruction");
            } else {
                navigation.navigate("Selection");
            }
        }, 3500);
    }, []);
    function fadeIn() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[{opacity: fadeAnim}]}>
                <Text style={[styles.text, {color: "#efefef"}]}>PROJECT</Text>
                <Text style={[styles.text, {color: "#ff4656"}]}>{output}</Text>
            </Animated.View>
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
    text: {
        fontSize: 70,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Valorant",
    },
});

export default Home;
