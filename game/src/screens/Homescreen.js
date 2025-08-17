import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameCard from '../components/GameCard';

const games = [
  { id: '1', title: 'Wordle', image: require('../assets/images/game1.png') },
  { id: '2', title: 'Bumble Bloom', image: require('../assets/images/game2.png') },
  { id: '3', title: 'Coming Soon', image: require('../assets/images/game3.png') },
  { id: '4', title: 'Coming Soon', image: require('../assets/images/game4.png') },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              image={item.image}
              onPress={() => navigation.navigate(item.title)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
