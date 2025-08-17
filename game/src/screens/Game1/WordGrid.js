import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordGrid = ({ guesses, currentWord, targetWord, solved }) => {
  const renderRow = (word, isCurrent = false) => {
    const letters = word.split("");

    return (
      <View style={styles.row}>
        {Array.from({ length: 5 }).map((_, i) => {
          const letter = letters[i] || "";
          let backgroundColor = "black";
          let borderColor = "#555";

          if (!isCurrent && letter) {
            if (targetWord[i] === letter) {
              backgroundColor = "green";
              borderColor = "green";
            } else if (targetWord.includes(letter)) {
              backgroundColor = "gold";
              borderColor = "gold";
            } else {
              backgroundColor = "red";
              borderColor = "red";
            }
          } else if (isCurrent && letter) {
            backgroundColor = "#333";
            borderColor = "#777";
          }

          return (
            <View
              key={i}
              style={[
                styles.cell,
                { backgroundColor: backgroundColor, borderColor: borderColor },
              ]}
            >
              <Text style={styles.letter}>{letter}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      {/* Finished guesses */}
      {guesses.map((word, idx) => (
        <View key={idx}>{renderRow(word)}</View>
      ))}

      {/* Current row → hidden if solved */}
      {!solved && guesses.length < 6 && renderRow(currentWord, true)}

      {/* Empty rows → hidden if solved */}
      {!solved &&
        Array.from({ length: 6 - guesses.length - 1 }).map((_, i) => (
          <View key={i}>{renderRow("")}</View>
        ))}
    </View>
  );
};

export default WordGrid;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  cell: {
    width: 45,
    height: 45,
    borderWidth: 2,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
