import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Keyboard = ({ onKeyPress, keyColors }) => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const getKeyStyle = (key) => {
    if (keyColors && keyColors[key]) {
      return {
        backgroundColor:
          keyColors[key] === "green"
            ? "#6aaa64" // correct
            : keyColors[key] === "yellow"
            ? "#6aaa64" // present
            : "#dd1010ff", // absent
      };
    }
    return { backgroundColor: "#444" }; // default
  };

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {rowIndex === 2 && (
            <TouchableOpacity
              style={[styles.key, styles.specialKey]}
              onPress={() => onKeyPress("ENTER")}
            >
              <Text style={styles.keyText}>⏎</Text>
            </TouchableOpacity>
          )}

          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.key, getKeyStyle(key)]}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}

          {rowIndex === 2 && (
            <TouchableOpacity
              style={[styles.key, styles.specialKey, styles.backspaceKey]}
              onPress={() => onKeyPress("BACKSPACE")}
            >
              <Text style={styles.keyText}>⌫</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  key: {
    padding: 11,
    margin: 3,
    borderRadius: 6,
    minWidth: 30,
    alignItems: "center",
  },
  specialKey: {
    minWidth: 45,
    backgroundColor: "#666",
  },
  keyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Keyboard;
