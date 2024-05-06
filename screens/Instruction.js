import {React} from "react";
import {StyleSheet, Text, View} from "react-native";
import ExitButton from "../components/ExitButton";
import Turn from "../assets/images/coolturn.svg";
import Correct from "../assets/images/coolcorrect.svg";
import Pass from "../assets/images/coolpass.svg";

const Instruction = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.exit}>
                <ExitButton onPress={() => navigation.navigate("Selection")} />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>HOW TO PLAY</Text>
            </View>
            <View style={[styles.horiLine, {marginTop: "5%"}]} />
            <View style={styles.description_ctnr}>
                <View style={styles.description_box}>
                    <View style={styles.icon}>
                        <Turn width={"100%"} height={"100%"} />
                    </View>
                    <Text style={styles.descriptionText}>PLACE ON FOREHEAD</Text>
                </View>
                <View style={styles.description_box}>
                    <View style={styles.icon}>
                        <Correct width={"80%"} height={"60%"} />
                    </View>
                    <Text style={styles.descriptionText}>TILT DOWN == CORRECT</Text>
                </View>
                <View style={styles.description_box}>
                    <View style={styles.icon}>
                        <Pass width={"100%"} height={"60%"} />
                    </View>
                    <Text style={styles.descriptionText}>TILT UP == PASS</Text>
                </View>
            </View>
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
    header: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
    },
    description_ctnr: {
        flexDirection: "column",
        flex: 4,
        justifyContent: "space-evenly",
        marginTop: 30,
        marginBottom: 50,
    },
    description_box: {
        flex: 1,
    },
    descriptionText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60%",
    },
    exit: {
        position: "absolute",
        right: "6%",
        top: "8%",
        zIndex: 10000,
    },
    headerText: {
        fontSize: 37,
        fontWeight: "bold",
        color: "#ff4656",
        fontFamily: "Valorant",
    },
});

export default Instruction;
