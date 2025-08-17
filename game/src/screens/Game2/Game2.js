import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Game2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Welcome to Game 2 - Memory Match!</Text>
      {/* Your game 2 logic/components will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
