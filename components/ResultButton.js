import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const App = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
        backgroundColor: color,
        width: "100%",
        height: "45%",
        justifyContent: "center",
        // paddingVertical: 18,
        // paddingHorizontal: 30,
    }}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
  }
});

export default App;
