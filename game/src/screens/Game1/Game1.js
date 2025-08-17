import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import WordGrid from "./WordGrid";
import Keyboard from "./Keyboard";
import wordPairs from "./words";
import Ionicons from "react-native-vector-icons/Ionicons";  

const Game1 = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState([]);

  // 🎯 Dynamic target words from words.js
  const [targetWord1, setTargetWord1] = useState("");
  const [targetWord2, setTargetWord2] = useState("");

  // ✅ Track solved state
  const [solved1, setSolved1] = useState(false);
  const [solved2, setSolved2] = useState(false);

  // 🎨 Keyboard colors
  const [keyColors, setKeyColors] = useState({});

  // 🎉 Game Over Modals
  const [winModal, setWinModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  // 🔄 Pick random word pair
  const pickRandomWords = () => {
    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    setTargetWord1(randomPair[0]);
    setTargetWord2(randomPair[1]);
  };

  // ✅ Run once on mount
  useEffect(() => {
    pickRandomWords();
  }, []);

  // 🔄 Reset Game
  const resetGame = () => {
    setCurrentWord("");
    setGuesses([]);
    setSolved1(false);
    setSolved2(false);
    setKeyColors({});
    setWinModal(false);
    setFailModal(false);
    pickRandomWords(); // ✅ New pair every game
  };

  // 🎨 Update keyboard colors
  const updateKeyColors = (word, target) => {
    const newColors = { ...keyColors };
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (target[i] === letter) {
        newColors[letter] = "green";
      } else if (target.includes(letter)) {
        if (newColors[letter] !== "green") newColors[letter] = "yellow";
      } else {
        if (!newColors[letter]) newColors[letter] = "red";
      }
    }
    setKeyColors(newColors);
  };

  // 🎮 Handle key presses
  const handleKeyPress = (key) => {
    if (solved1 && solved2) return; // Already won
    if (guesses.length >= 6) return; // Max attempts used

    if (key === "ENTER") {
      if (currentWord.length === 5) {
        const newGuesses = [...guesses, currentWord];
        setGuesses(newGuesses);

        updateKeyColors(currentWord, targetWord1);
        updateKeyColors(currentWord, targetWord2);

        if (currentWord === targetWord1 && !solved1) setSolved1(true);
        if (currentWord === targetWord2 && !solved2) setSolved2(true);

        // ✅ Winning condition
        if (
          (currentWord === targetWord1 || solved1) &&
          (currentWord === targetWord2 || solved2)
        ) {
          setWinModal(true);
        }

        // ❌ Losing condition
        if (newGuesses.length >= 6 && (!solved1 || !solved2)) {
          setFailModal(true);
        }

        setCurrentWord("");
      }
    } else if (key === "BACKSPACE") {
      setCurrentWord((prev) => prev.slice(0, -1));
    } else if (currentWord.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentWord((prev) => prev + key);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      
      
{/* 🔙 Back Button */}
<View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Text style={styles.backArrow}>←</Text>
  </TouchableOpacity>
</View>


      {/* Word Grids */}
      <View style={styles.gridWrapper}>
        <WordGrid
          guesses={guesses}
          currentWord={currentWord}
          targetWord={targetWord1}
          solved={solved1}
        />
        <WordGrid
          guesses={guesses}
          currentWord={currentWord}
          targetWord={targetWord2}
          solved={solved2}
        />
      </View>

      {/* Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} keyColors={keyColors} />

      {/* 🎉 Win Popup */}
      <Modal visible={winModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.trophy}>🏆</Text>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalSubtitle}>You solved both words!</Text>

            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#444" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ❌ Fail Popup */}
      <Modal visible={failModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.trophy}>😢</Text>
            <Text style={styles.modalTitle}>Game Over</Text>
            <Text style={styles.modalSubtitle}>
              You couldn’t guess the words!
            </Text>

            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#802e2eff" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Game1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    marginTop: 40,
    marginLeft: 15,
  },
  backButton: {
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 18,
  },
  gridWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  trophy: {
    fontSize: 80,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#28a745",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
 header: {
  padding: 10,
  flexDirection: "row",
  alignItems: "center",
},
backButton: {
  padding: 5,
},
backArrow: {
  fontSize: 35,
  color: "#fff",   // matches dark theme
  fontWeight: "bold",
},

});
