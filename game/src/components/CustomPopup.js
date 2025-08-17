import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomPopup = ({ visible, message, onClose, onRestart }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.message}>{message}</Text>

          {/* Close Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>

          {/* Play Again Button (only if onRestart is passed) */}
          {onRestart && (
            <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={onRestart}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  popup: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  restartButton: {
    backgroundColor: "#4CAF50", // green for restart
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
